// src/pages/Home/hooks/useHomeData.js
import { useState, useEffect } from 'react';
import { eventsAPI } from '../../../services/api';
import { mockEvents, addDefaultImages } from '../../../data/mockEvents';

const MAX_HIGHLIGHTED_EVENTS = 3;

export const useHomeData = () => {
    const [highlightedEvents, setHighlightedEvents] = useState([]);
    const [currentEvents, setCurrentEvents] = useState([]);
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    /**
     * Categorizes events into current and upcoming
     * @param {Array} events - Array of event objects
     * @returns {Object} Object containing current and upcoming events
     */
    const categorizeEvents = (events) => {
        const now = new Date();
        const current = [];
        const upcoming = [];

        events.forEach(event => {
            const eventDate = new Date(event.startDate || event.date);
            if (eventDate <= now) {
                current.push(event);
            } else {
                upcoming.push(event);
            }
        });

        return { current: current.slice(0, 4), upcoming: upcoming.slice(0, 4) };
    };

    /**
     * Fetch and organize events data on component mount
     */
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                setLoading(true);
                console.log('Fetching events from API...');
                const response = await eventsAPI.getAllEvents();

                if (response?.events?.length > 0) {
                    const eventsWithImages = addDefaultImages(response.events);
                    const { current, upcoming } = categorizeEvents(eventsWithImages);

                    setHighlightedEvents(eventsWithImages.slice(0, MAX_HIGHLIGHTED_EVENTS));
                    setCurrentEvents(current);
                    setUpcomingEvents(upcoming);

                    console.log('Successfully loaded events from API');
                } else {
                    throw new Error('No events found');
                }
            } catch (err) {
                console.error('Failed to fetch events:', err);
                console.log('Using mock events...');

                const eventsWithImages = addDefaultImages(mockEvents);
                const { current, upcoming } = categorizeEvents(eventsWithImages);

                setHighlightedEvents(eventsWithImages.slice(0, MAX_HIGHLIGHTED_EVENTS));
                setCurrentEvents(current);
                setUpcomingEvents(upcoming);
                setError(null);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    return {
        highlightedEvents,
        currentEvents,
        upcomingEvents,
        loading,
        error
    };
};