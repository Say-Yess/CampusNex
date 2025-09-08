import React from 'react';

const categories = [
    'All',
    'Educational & Business',
    'Career',
    'Entrepreneurship',
];
const campuses = [
    'All',
    'CJCC',
    'Phnom Penh',
    'RUPP',
];
const dates = [
    'All',
    'Today',
    'This Week',
    'This Month',
];

const EventFilters = ({ filters, setFilters }) => {
    return (
        <div className="flex flex-wrap gap-4 mb-6 justify-center items-center">
            {/* Category Filter */}
            <select
                className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-bright-teal"
                value={filters.category}
                onChange={e => setFilters({ ...filters, category: e.target.value })}
            >
                {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                ))}
            </select>
            {/* Campus Filter */}
            <select
                className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-bright-teal"
                value={filters.campus}
                onChange={e => setFilters({ ...filters, campus: e.target.value })}
            >
                {campuses.map(campus => (
                    <option key={campus} value={campus}>{campus}</option>
                ))}
            </select>
            {/* Date Filter */}
            <select
                className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-bright-teal"
                value={filters.date}
                onChange={e => setFilters({ ...filters, date: e.target.value })}
            >
                {dates.map(date => (
                    <option key={date} value={date}>{date}</option>
                ))}
            </select>
        </div>
    );
};

export default EventFilters;
