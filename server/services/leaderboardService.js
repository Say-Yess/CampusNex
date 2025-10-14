const { User, UserStats, Activity, Event } = require('../models');
const { Op } = require('sequelize');
const { sequelize } = require('../config/database');

// Points system configuration
const POINT_VALUES = {
    CREATE_EVENT: 10,
    ATTEND_EVENT: 5,
    EARLY_REGISTRATION: 3,
    EVENT_REVIEW: 2,
    PROFILE_COMPLETE: 5,
    DAILY_LOGIN: 1,
    SHARE_EVENT: 2
};

const ACTIVITY_TYPES = {
    CREATE_EVENT: 'create_event',
    ATTEND_EVENT: 'attend_event',
    EARLY_REGISTRATION: 'early_registration',
    EVENT_REVIEW: 'event_review',
    PROFILE_COMPLETE: 'profile_complete',
    DAILY_LOGIN: 'daily_login',
    SHARE_EVENT: 'share_event'
};

class LeaderboardService {
    /**
     * Initialize user stats when they register
     */
    static async initializeUserStats(userId, transaction = null) {
        try {
            const [userStats, created] = await UserStats.findOrCreate({
                where: { userId },
                defaults: {
                    userId,
                    totalPoints: 0,
                    eventsCreated: 0,
                    eventsAttended: 0,
                    currentStreak: 0,
                    longestStreak: 0,
                    lastActivity: new Date()
                },
                transaction
            });

            // Award points for profile completion if this is a new user
            if (created) {
                await this.addPoints(
                    userId,
                    POINT_VALUES.PROFILE_COMPLETE,
                    ACTIVITY_TYPES.PROFILE_COMPLETE,
                    null,
                    { action: 'Account created and profile completed' },
                    transaction
                );
            }

            return userStats;
        } catch (error) {
            console.error('Error initializing user stats:', error);
            throw error;
        }
    }

    /**
     * Add points to a user and log the activity
     */
    static async addPoints(userId, points, activityType, eventId = null, metadata = {}, transaction = null) {
        try {
            const t = transaction || await sequelize.transaction();

            try {
                // Get or create user stats
                const [userStats] = await UserStats.findOrCreate({
                    where: { userId },
                    defaults: {
                        userId,
                        totalPoints: 0,
                        eventsCreated: 0,
                        eventsAttended: 0,
                        currentStreak: 0,
                        longestStreak: 0
                    },
                    transaction: t
                });

                // Update user stats
                await userStats.increment('totalPoints', { by: points, transaction: t });

                // Update activity-specific counters
                if (activityType === ACTIVITY_TYPES.CREATE_EVENT) {
                    await userStats.increment('eventsCreated', { by: 1, transaction: t });
                } else if (activityType === ACTIVITY_TYPES.ATTEND_EVENT) {
                    await userStats.increment('eventsAttended', { by: 1, transaction: t });
                }

                await userStats.update({
                    lastActivity: new Date()
                }, { transaction: t });

                // Log the activity
                await Activity.create({
                    userId,
                    activityType,
                    points,
                    eventId,
                    metadata,
                    timestamp: new Date()
                }, { transaction: t });

                // Update ranks for all users
                await this.updateRanks(t);

                if (!transaction) await t.commit();

                console.log(`Added ${points} points to user ${userId} for ${activityType}`);
                return true;
            } catch (error) {
                if (!transaction) await t.rollback();
                throw error;
            }
        } catch (error) {
            console.error('Error adding points:', error);
            throw error;
        }
    }

    /**
     * Update ranks for all users
     */
    static async updateRanks(transaction = null) {
        try {
            const t = transaction || await sequelize.transaction();

            try {
                // Get all users ordered by total points
                const users = await UserStats.findAll({
                    order: [['totalPoints', 'DESC']],
                    transaction: t
                });

                // Update ranks
                const updatePromises = users.map((user, index) => {
                    return user.update({ rank: index + 1 }, { transaction: t });
                });

                await Promise.all(updatePromises);

                if (!transaction) await t.commit();
            } catch (error) {
                if (!transaction) await t.rollback();
                throw error;
            }
        } catch (error) {
            console.error('Error updating ranks:', error);
            throw error;
        }
    }

    /**
     * Get leaderboard
     */
    static async getLeaderboard(limit = 50, offset = 0) {
        try {
            const leaderboard = await UserStats.findAll({
                include: [
                    {
                        model: User,
                        as: 'user',
                        attributes: ['id', 'firstName', 'lastName', 'email', 'profilePicture', 'major']
                    }
                ],
                order: [['totalPoints', 'DESC']],
                limit,
                offset
            });

            return leaderboard.map((entry, index) => ({
                rank: offset + index + 1,
                userId: entry.userId,
                totalPoints: entry.totalPoints,
                eventsCreated: entry.eventsCreated,
                eventsAttended: entry.eventsAttended,
                displayName: `${entry.user.firstName} ${entry.user.lastName}`,
                email: entry.user.email,
                profilePicture: entry.user.profilePicture,
                major: entry.user.major,
                lastActivity: entry.lastActivity
            }));
        } catch (error) {
            console.error('Error getting leaderboard:', error);
            throw error;
        }
    }

    /**
     * Get user stats and rank
     */
    static async getUserStats(userId) {
        try {
            const userStats = await UserStats.findOne({
                where: { userId },
                include: [
                    {
                        model: User,
                        as: 'user',
                        attributes: ['firstName', 'lastName', 'email', 'profilePicture']
                    }
                ]
            });

            if (!userStats) {
                return {
                    totalPoints: 0,
                    rank: 0,
                    eventsCreated: 0,
                    eventsAttended: 0
                };
            }

            return {
                totalPoints: userStats.totalPoints,
                rank: userStats.rank || 0,
                eventsCreated: userStats.eventsCreated,
                eventsAttended: userStats.eventsAttended,
                displayName: `${userStats.user.firstName} ${userStats.user.lastName}`,
                lastActivity: userStats.lastActivity
            };
        } catch (error) {
            console.error('Error getting user stats:', error);
            throw error;
        }
    }

    /**
     * Get user's recent activities
     */
    static async getUserActivities(userId, limit = 10) {
        try {
            const activities = await Activity.findAll({
                where: { userId },
                include: [
                    {
                        model: Event,
                        as: 'event',
                        attributes: ['id', 'title', 'startDate'],
                        required: false
                    }
                ],
                order: [['timestamp', 'DESC']],
                limit
            });

            return activities.map(activity => ({
                id: activity.id,
                activityType: activity.activityType,
                points: activity.points,
                metadata: activity.metadata,
                timestamp: activity.timestamp,
                event: activity.event ? {
                    id: activity.event.id,
                    title: activity.event.title,
                    startDate: activity.event.startDate
                } : null
            }));
        } catch (error) {
            console.error('Error getting user activities:', error);
            throw error;
        }
    }

    /**
     * Award points for creating an event
     */
    static async awardEventCreationPoints(userId, eventId, eventTitle) {
        return this.addPoints(
            userId,
            POINT_VALUES.CREATE_EVENT,
            ACTIVITY_TYPES.CREATE_EVENT,
            eventId,
            { eventTitle, action: 'Created event' }
        );
    }

    /**
     * Award points for attending an event
     */
    static async awardEventAttendancePoints(userId, eventId, eventTitle, isEarlyRegistration = false) {
        let points = POINT_VALUES.ATTEND_EVENT;
        const metadata = { eventTitle, action: 'Registered for event' };

        if (isEarlyRegistration) {
            points += POINT_VALUES.EARLY_REGISTRATION;
            metadata.earlyRegistration = true;
            metadata.action = 'Early registration for event';
        }

        return this.addPoints(
            userId,
            points,
            ACTIVITY_TYPES.ATTEND_EVENT,
            eventId,
            metadata
        );
    }
}

module.exports = {
    LeaderboardService,
    POINT_VALUES,
    ACTIVITY_TYPES
};