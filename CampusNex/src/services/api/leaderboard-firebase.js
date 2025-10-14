// src/services/api/leaderboard-firebase.js
// Leaderboard API service for CampusNex using Firebase

import { auth, db } from '../firebase';
import {
    collection,
    doc,
    getDoc,
    getDocs,
    setDoc,
    updateDoc,
    increment,
    query,
    where,
    orderBy,
    limit,
    addDoc,
    serverTimestamp
} from 'firebase/firestore';

// Points system configuration
export const POINT_VALUES = {
    CREATE_EVENT: 10,
    ATTEND_EVENT: 5,
    EARLY_REGISTRATION: 3,
    EVENT_REVIEW: 2,
    PROFILE_COMPLETE: 5,
    DAILY_LOGIN: 1,
    SHARE_EVENT: 2
};

// Activity types for tracking
export const ACTIVITY_TYPES = {
    CREATE_EVENT: 'create_event',
    ATTEND_EVENT: 'attend_event',
    EARLY_REGISTRATION: 'early_registration',
    EVENT_REVIEW: 'event_review',
    PROFILE_COMPLETE: 'profile_complete',
    DAILY_LOGIN: 'daily_login',
    SHARE_EVENT: 'share_event'
};

// Add points to user
export const addPoints = async (userId, points, activityType, metadata = {}) => {
    try {
        const userStatsRef = doc(db, 'userStats', userId);
        const activityRef = collection(db, 'activities');

        // Update user stats
        await setDoc(userStatsRef, {
            totalPoints: increment(points),
            lastActivity: serverTimestamp(),
            userId
        }, { merge: true });

        // Log activity
        await addDoc(activityRef, {
            userId,
            points,
            activityType,
            metadata,
            timestamp: serverTimestamp()
        });

        console.log(`Added ${points} points to user ${userId} for ${activityType}`);
        return true;
    } catch (error) {
        console.error('Error adding points:', error);
        throw error;
    }
};

// Get user's total points and rank
export const getUserStats = async (userId) => {
    try {
        const userStatsRef = doc(db, 'userStats', userId);
        const userStatsSnap = await getDoc(userStatsRef);

        if (userStatsSnap.exists()) {
            const userData = userStatsSnap.data();

            // Calculate rank by counting users with higher scores
            const higherScoresQuery = query(
                collection(db, 'userStats'),
                where('totalPoints', '>', userData.totalPoints || 0)
            );
            const higherScoresSnap = await getDocs(higherScoresQuery);
            const rank = higherScoresSnap.size + 1;

            return {
                ...userData,
                rank,
                totalPoints: userData.totalPoints || 0
            };
        }

        return { totalPoints: 0, rank: 0 };
    } catch (error) {
        console.error('Error getting user stats:', error);
        return { totalPoints: 0, rank: 0 };
    }
};

// Get leaderboard
export const getLeaderboard = async (limitCount = 20) => {
    try {
        const leaderboardQuery = query(
            collection(db, 'userStats'),
            orderBy('totalPoints', 'desc'),
            limit(limitCount)
        );

        const querySnapshot = await getDocs(leaderboardQuery);
        const leaderboard = [];

        for (let i = 0; i < querySnapshot.docs.length; i++) {
            const doc = querySnapshot.docs[i];
            const userData = doc.data();

            // Get user profile info
            const userProfileRef = doc(db, 'users', userData.userId);
            const userProfileSnap = await getDoc(userProfileRef);
            const userProfile = userProfileSnap.exists() ? userProfileSnap.data() : {};

            leaderboard.push({
                ...userData,
                rank: i + 1,
                displayName: userProfile.firstName && userProfile.lastName
                    ? `${userProfile.firstName} ${userProfile.lastName}`
                    : userProfile.displayName || 'Anonymous User',
                photoURL: userProfile.photoURL || null,
                email: userProfile.email || ''
            });
        }

        return leaderboard;
    } catch (error) {
        console.error('Error getting leaderboard:', error);
        return [];
    }
};

// Get user's recent activities
export const getUserActivities = async (userId, limitCount = 10) => {
    try {
        const activitiesQuery = query(
            collection(db, 'activities'),
            where('userId', '==', userId),
            orderBy('timestamp', 'desc'),
            limit(limitCount)
        );

        const querySnapshot = await getDocs(activitiesQuery);
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            timestamp: doc.data().timestamp?.toDate?.() || doc.data().timestamp
        }));
    } catch (error) {
        console.error('Error getting user activities:', error);
        return [];
    }
};

// Initialize user stats (call when user first registers)
export const initializeUserStats = async (userId) => {
    try {
        const userStatsRef = doc(db, 'userStats', userId);
        await setDoc(userStatsRef, {
            userId,
            totalPoints: 0,
            createdAt: serverTimestamp(),
            lastActivity: serverTimestamp()
        }, { merge: true });

        // Award points for profile completion
        await addPoints(userId, POINT_VALUES.PROFILE_COMPLETE, ACTIVITY_TYPES.PROFILE_COMPLETE, {
            action: 'Account created and profile completed'
        });

        return true;
    } catch (error) {
        console.error('Error initializing user stats:', error);
        return false;
    }
};
