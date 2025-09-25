// src/services/api/users.js
// Users API service for CampusNex

import apiClient from './client';

// Get current user profile
export const getUserProfile = async () => {
    try {
        const response = await apiClient.get('/users/profile');
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Failed to get user profile' };
    }
};

// Update user profile
export const updateUserProfile = async (profileData) => {
    try {
        const response = await apiClient.put('/users/profile', profileData);

        // Update user in localStorage if successful
        if (response.data.success) {
            const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
            const updatedUser = { ...currentUser, ...response.data.user };
            localStorage.setItem('user', JSON.stringify(updatedUser));
        }

        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Failed to update profile' };
    }
};

// Get user's events (both organized and RSVPed)
export const getUserEvents = async () => {
    try {
        const response = await apiClient.get('/users/events');
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Failed to get user events' };
    }
};