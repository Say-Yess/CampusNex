// src/data/index.js
// Central export for all mock data

export {
    mockEvents,
    mockEventsByID,
    getMockEventById,
    defaultEventImages,
    addDefaultImages
} from './mockEvents';

export {
    eventCategories,
    filterOptions,
    getCategoryByName,
    getCategoryIcon,
    getCategoryColor
} from './categories';

export {
    mockUsers,
    getMockUserById,
    getMockUsersByRole,
    mockUserStats
} from './mockUsers';