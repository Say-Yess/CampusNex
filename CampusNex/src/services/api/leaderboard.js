// src/services/api/leaderboard.js
// Leaderboard API service for CampusNex using Railway backend

import apiClient from './client';

// Get leaderboard
export const getLeaderboard = async (limit = 50) => {
    try {
        const response = await apiClient.get(`/leaderboard?limit=${limit}`);

        if (response.data.success) {
            return response.data.data.leaderboard;
        } else {
            throw new Error(response.data.message || 'Failed to get leaderboard');
        }
    } catch (error) {
        console.error('Error getting leaderboard:', error);
        throw error;
    }
};

// Get user stats
export const getUserStats = async () => {
    try {
        const response = await apiClient.get('/leaderboard/stats');

        if (response.data.success) {
            return response.data.data;
        } else {
            throw new Error(response.data.message || 'Failed to get user stats');
        }
    } catch (error) {
        console.error('Error getting user stats:', error);
        throw error;
    }
};

// Get user activities
export const getUserActivities = async (limit = 10) => {
    try {
        const response = await apiClient.get(`/leaderboard/activities?limit=${limit}`);

        if (response.data.success) {
            return response.data.data;
        } else {
            throw new Error(response.data.message || 'Failed to get user activities');
        }
    } catch (error) {
        console.error('Error getting user activities:', error);
        throw error;
    }
};

// Get top users
export const getTopUsers = async (count = 10) => {
    try {
        const response = await apiClient.get(`/leaderboard/top/${count}`);

        if (response.data.success) {
            return response.data.data;
        } else {
            throw new Error(response.data.message || 'Failed to get top users');
        }
    } catch (error) {
        console.error('Error getting top users:', error);
        throw error;
    }
};

// Initialize user stats (for existing users)
export const initializeUserStats = async () => {
    try {
        const response = await apiClient.post('/leaderboard/initialize');

        if (response.data.success) {
            return response.data.data;
        } else {
            throw new Error(response.data.message || 'Failed to initialize user stats');
        }
    } catch (error) {
        console.error('Error initializing user stats:', error);
        throw error;
    }
};

// Points system constants (for reference)
export const POINT_VALUES = {
    CREATE_EVENT: 10,
    ATTEND_EVENT: 5,
    EARLY_REGISTRATION: 3,
    EVENT_REVIEW: 2,
    PROFILE_COMPLETE: 5,
    DAILY_LOGIN: 1,
    SHARE_EVENT: 2
};

export const ACTIVITY_TYPES = {
    CREATE_EVENT: 'create_event',
    ATTEND_EVENT: 'attend_event',
    EARLY_REGISTRATION: 'early_registration',
    EVENT_REVIEW: 'event_review',
    PROFILE_COMPLETE: 'profile_complete',
    DAILY_LOGIN: 'daily_login',
    SHARE_EVENT: 'share_event'
};