import React, { useState, useEffect } from 'react';
import { eventsAPI } from '../services/api';

const dates = [
    'All',
    'Today',
    'This Week',
    'This Month',
];

const EventFilters = ({ filters, setFilters }) => {
    const [categories, setCategories] = useState(['All']);
    const [locations, setLocations] = useState(['All']);
    const [loading, setLoading] = useState(false);

    // Fetch unique categories and locations from API
    useEffect(() => {
        const fetchFilterOptions = async () => {
            try {
                setLoading(true);
                const response = await eventsAPI.getAllEvents();

                // Extract unique categories
                const uniqueCategories = ['All', ...new Set(response.events.map(event => event.category))];
                setCategories(uniqueCategories.filter(Boolean)); // Filter out null/undefined

                // Extract unique locations
                const uniqueLocations = ['All', ...new Set(response.events.map(event => event.location))];
                setLocations(uniqueLocations.filter(Boolean)); // Filter out null/undefined
            } catch (err) {
                console.error('Error fetching filter options:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchFilterOptions();
    }, []);

    return (
        <div className="flex flex-wrap gap-4 mb-6 justify-center items-center">
            {/* Category Filter */}
            <select
                className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-bright-teal"
                value={filters.category}
                onChange={e => setFilters({ ...filters, category: e.target.value })}
                disabled={loading}
            >
                {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                ))}
            </select>

            {/* Location Filter */}
            <select
                className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-bright-teal"
                value={filters.location}
                onChange={e => setFilters({ ...filters, location: e.target.value })}
                disabled={loading}
            >
                {locations.map(location => (
                    <option key={location} value={location}>{location}</option>
                ))}
            </select>

            {/* Date Filter */}
            <select
                className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-bright-teal"
                value={filters.date}
                onChange={e => setFilters({ ...filters, date: e.target.value })}
                disabled={loading}
            >
                {dates.map(date => (
                    <option key={date} value={date}>{date}</option>
                ))}
            </select>
        </div>
    );
};

export default EventFilters;
