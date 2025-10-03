// src/data/mockEvents.js
// Centralized mock events data for CampusNex

export const defaultEventImages = [
    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2069&auto=format&fit=crop'
];

export const mockEvents = [
    {
        id: '1',
        title: 'Angkor Wat Sunrise Photography Workshop',
        description: 'Capture the magical sunrise over Angkor Wat with professional photographers. Learn advanced techniques while experiencing one of the world\'s most beautiful sunrises.',
        category: 'Photography',
        location: 'Angkor Archaeological Park, Siem Reap',
        date: '2025-10-15',
        startDate: '2025-10-15T05:00:00',
        endDate: '2025-10-15T08:00:00',
        imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop',
        capacity: 25,
        featured: true,
        organizerId: 'admin',
        RSVPs: [
            { status: 'attending' },
            { status: 'attending' },
            { status: 'interested' }
        ]
    },
    {
        id: '2',
        title: 'Cambodia Tech Startup Pitch Night',
        description: 'Local entrepreneurs pitch their innovative solutions to transform Cambodia. Network with investors, mentors, and fellow startup enthusiasts in Phnom Penh.',
        category: 'Business & Networking',
        location: 'Smart Axiata Digital Innovation Hub, Phnom Penh',
        date: '2025-10-20',
        startDate: '2025-10-20T18:00:00',
        endDate: '2025-10-20T22:00:00',
        imageUrl: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=2070&auto=format&fit=crop',
        capacity: 100,
        featured: true,
        organizerId: 'admin',
        RSVPs: [
            { status: 'attending' },
            { status: 'attending' }
        ]
    },
    {
        id: '3',
        title: 'Traditional Khmer Cooking Masterclass',
        description: 'Learn to cook authentic Cambodian dishes like Fish Amok, Beef Lok Lak, and Nom Banh Chok from master chefs in Siem Reap.',
        category: 'Food & Drinks',
        location: 'Frizz Restaurant, Siem Reap',
        date: '2025-10-25',
        startDate: '2025-10-25T14:00:00',
        endDate: '2025-10-25T18:00:00',
        imageUrl: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2069&auto=format&fit=crop',
        capacity: 20,
        featured: false,
        organizerId: 'admin',
        RSVPs: [
            { status: 'attending' }
        ]
    },
    {
        id: '4',
        title: 'Royal Palace Evening Concert',
        description: 'Experience classical Khmer music and traditional Apsara dance performance in the magical setting of the Royal Palace Gardens.',
        category: 'Performing Arts',
        location: 'Royal Palace Gardens, Phnom Penh',
        date: '2025-11-01',
        startDate: '2025-11-01T19:00:00',
        endDate: '2025-11-01T21:00:00',
        imageUrl: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?q=80&w=2070&auto=format&fit=crop',
        capacity: 150,
        featured: true,
        organizerId: 'admin',
        RSVPs: []
    },
    {
        id: '5',
        title: 'Mekong River Sunset Cruise',
        description: 'Enjoy breathtaking sunset views along the Mekong River with traditional music, local snacks, and cultural storytelling.',
        category: 'Sports & Outdoors',
        location: 'Sisowath Quay, Phnom Penh',
        date: '2025-11-05',
        startDate: '2025-11-05T17:00:00',
        endDate: '2025-11-05T19:30:00',
        imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop',
        capacity: 60,
        featured: false,
        organizerId: 'admin',
        RSVPs: []
    },
    {
        id: '6',
        title: 'Cambodian Art & Craft Workshop',
        description: 'Learn traditional Cambodian arts including stone carving, silk weaving, and silver crafting with local artisans.',
        category: 'Workshops, Conferences & Classes',
        location: 'Artisans Angkor, Siem Reap',
        date: '2025-11-08',
        startDate: '2025-11-08T09:00:00',
        endDate: '2025-11-08T16:00:00',
        imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=2070&auto=format&fit=crop',
        capacity: 30,
        featured: false,
        organizerId: 'admin',
        RSVPs: []
    }
];

// Event mock data organized by ID for EventDetail component
export const mockEventsByID = {
    '1': mockEvents[0],
    '2': mockEvents[1],
    '3': mockEvents[2],
    '4': mockEvents[3],
    '5': mockEvents[4],
    '6': mockEvents[5]
};

// Helper function to get event by ID
export const getMockEventById = (id) => {
    return mockEventsByID[id] || null;
};

// Helper function to add default images to events
export const addDefaultImages = (events) => {
    return events.map((event, index) => ({
        ...event,
        imageUrl: event.imageUrl || defaultEventImages[index % defaultEventImages.length]
    }));
};