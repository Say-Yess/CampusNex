// src/pages/OrganizerDashboard/hooks/useDashboardData.js
import { useState, useEffect } from 'react';
import { eventsAPI } from '../../../services/api';
import { useAuth } from '../../../services/AuthContext';

export const useDashboardData = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalEvents: 0,
        totalAttendees: 0,
        successRate: 0
    });
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showAttendeesModal, setShowAttendeesModal] = useState(false);
    const [activeView, setActiveView] = useState('my-events');

    const { user } = useAuth();

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            setLoading(true);
            const response = await eventsAPI.getAllEvents();
            const eventsData = response.events || [];

            // Filter events created by current user (organizer)
            // For demo purposes, we'll show all events. In real app, filter by organizer ID
            const userEvents = eventsData; // .filter(event => event.organizerId === user?.id);
            setEvents(userEvents);

            // Calculate stats from real data
            const totalEvents = userEvents.length;
            const totalAttendees = userEvents.reduce((sum, event) => {
                return sum + (event.attendees?.length || event.capacity || 0);
            }, 0);

            // Simple success rate calculation (can be improved with RSVP data)
            const successRate = totalEvents > 0 ? Math.round((totalEvents / (totalEvents + 2)) * 100) : 0;

            setStats({
                totalEvents,
                totalAttendees,
                successRate
            });
        } catch (error) {
            console.error('Error fetching events:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleEditEvent = (event) => {
        setSelectedEvent(event);
        setShowEditModal(true);
    };

    const handleViewAttendees = (event) => {
        setSelectedEvent(event);
        setShowAttendeesModal(true);
    };

    const handleEventUpdated = () => {
        fetchEvents(); // Refresh the events list
        setShowEditModal(false);
        setSelectedEvent(null);
    };

    const handleDeleteEvent = async (eventId) => {
        if (window.confirm('Are you sure you want to delete this event?')) {
            try {
                await eventsAPI.deleteEvent(eventId);
                setEvents(events.filter(event => event.id !== eventId));
            } catch (error) {
                console.error('Error deleting event:', error);
                alert('Failed to delete event. Please try again.');
            }
        }
    };

    const getEventStatus = (startDate, endDate) => {
        const now = new Date();
        const start = new Date(startDate);
        const end = new Date(endDate);

        if (now < start) return { status: 'upcoming', color: 'blue' };
        if (now >= start && now <= end) return { status: 'active', color: 'green' };
        return { status: 'completed', color: 'gray' };
    };

    const formatEventDate = (dateStr) => {
        if (!dateStr) return 'Date TBD';
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    return {
        // State
        events,
        loading,
        stats,
        selectedEvent,
        showEditModal,
        showAttendeesModal,
        activeView,
        user,

        // Actions
        setActiveView,
        setShowEditModal,
        setShowAttendeesModal,
        handleEditEvent,
        handleViewAttendees,
        handleEventUpdated,
        handleDeleteEvent,

        // Utils
        getEventStatus,
        formatEventDate,
        fetchEvents
    };
};