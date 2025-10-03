// src/data/mockUsers.js
// Centralized mock user data for CampusNex (for testing purposes only)

export const mockUsers = [
    {
        id: '1',
        name: 'John Doe',
        email: 'john.doe@example.com',
        role: 'student',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
        university: 'Royal University of Phnom Penh',
        major: 'Computer Science',
        year: 'Senior',
        interests: ['Technology', 'Photography', 'Business'],
        eventsAttended: 12,
        eventsOrganized: 0,
        joinedDate: '2024-09-01'
    },
    {
        id: '2',
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        role: 'organizer',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop',
        university: 'University of Cambodia',
        department: 'Event Management',
        interests: ['Event Planning', 'Arts', 'Culture'],
        eventsAttended: 8,
        eventsOrganized: 15,
        joinedDate: '2024-08-15'
    },
    {
        id: '3',
        name: 'Admin User',
        email: 'admin@campusnex.com',
        role: 'admin',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
        university: 'CampusNex Team',
        department: 'Platform Administration',
        interests: ['Platform Management', 'Community Building'],
        eventsAttended: 25,
        eventsOrganized: 50,
        joinedDate: '2024-01-01'
    }
];

// Get user by ID
export const getMockUserById = (id) => {
    return mockUsers.find(user => user.id === id) || null;
};

// Get users by role
export const getMockUsersByRole = (role) => {
    return mockUsers.filter(user => user.role === role);
};

// Mock user statistics
export const mockUserStats = {
    totalUsers: 1250,
    activeUsers: 890,
    students: 950,
    organizers: 280,
    admins: 20,
    newThisMonth: 45
};