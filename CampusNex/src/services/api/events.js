// src/services/api/events.js
// Events API service for CampusNex

import apiClient from './client';

// Get all events with optional query parameters
export const getAllEvents = async (queryParams = '') => {
    try {
        const response = await apiClient.get(`/events${queryParams}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Failed to get events' };
    }
};

// Get single event by ID
export const getEventById = async (eventId) => {
    try {
        const response = await apiClient.get(`/events/${eventId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Failed to get event details' };
    }
};

// Create a new event
export const createEvent = async (eventData) => {
    try {
        const response = await apiClient.post('/events', eventData);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Failed to create event' };
    }
};

// Update an event
export const updateEvent = async (eventId, eventData) => {
    try {
        const response = await apiClient.put(`/events/${eventId}`, eventData);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Failed to update event' };
    }
};

// Delete an event
export const deleteEvent = async (eventId) => {
    try {
        const response = await apiClient.delete(`/events/${eventId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Failed to delete event' };
    }
};

// RSVP to an event
export const rsvpToEvent = async (eventId, status) => {
    try {
        const response = await apiClient.post(`/events/${eventId}/rsvp`, { status });
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Failed to RSVP to event' };
    }
};

// Get events the user has RSVP'd to (interested or attending)
export const getUserRSVPs = async () => {
    try {
        const response = await apiClient.get('/users/me/events');
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Failed to get your events' };
    }
};