// src/data/categories.js
// Centralized event categories data for CampusNex

export const eventCategories = [
    { id: 1, name: 'Technology', icon: '💻', color: 'bg-blue-100' },
    { id: 2, name: 'Business', icon: '💼', color: 'bg-green-100' },
    { id: 3, name: 'Education', icon: '🎓', color: 'bg-purple-100' },
    { id: 4, name: 'Sports', icon: '⚽', color: 'bg-orange-100' },
    { id: 5, name: 'Photography', icon: '📸', color: 'bg-pink-100' },
    { id: 6, name: 'Food & Drinks', icon: '🍕', color: 'bg-yellow-100' },
    { id: 7, name: 'Performing Arts', icon: '🎭', color: 'bg-red-100' },
    { id: 8, name: 'Workshops', icon: '🛠️', color: 'bg-indigo-100' }
];

// Filter options for event discovery
export const filterOptions = {
    categories: [
        'All Categories',
        'Technology',
        'Business & Networking',
        'Photography',
        'Food & Drinks',
        'Performing Arts',
        'Sports & Outdoors',
        'Workshops, Conferences & Classes',
        'Festivals & Lifestyle',
        'Exhibitions'
    ],
    timeFilters: [
        'All Time',
        'Today',
        'This Week',
        'This Month',
        'Next Month'
    ],
    locationFilters: [
        'All Locations',
        'Phnom Penh',
        'Siem Reap',
        'Online Events'
    ]
};

// Get category by name
export const getCategoryByName = (name) => {
    return eventCategories.find(cat => cat.name === name) || eventCategories[0];
};

// Get category icon by name
export const getCategoryIcon = (categoryName) => {
    const category = getCategoryByName(categoryName);
    return category ? category.icon : '📅';
};

// Get category color by name
export const getCategoryColor = (categoryName) => {
    const category = getCategoryByName(categoryName);
    return category ? category.color : 'bg-gray-100';
};