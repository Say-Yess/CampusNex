// src/data/mockEvents.js
// Centralized mock events data for CampusNex - Cambodia University Events

export const defaultEventImages = [
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2070&auto=format&fit=crop', // Conference/Academic
    'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop', // Graduation/University
    'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=2070&auto=format&fit=crop', // Technology/Computers
    'https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2070&auto=format&fit=crop', // Cultural/Festival
    'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2070&auto=format&fit=crop', // Business/Networking
    'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=2070&auto=format&fit=crop', // Discussion/Meeting
    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=2070&auto=format&fit=crop', // Art/Creative
    'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?q=80&w=2070&auto=format&fit=crop', // Historical/Museum
    'https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=2070&auto=format&fit=crop', // Presentation/Tech
    'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=2070&auto=format&fit=crop'  // Sports/Competition
];

export const mockEvents = [
    // Royal University of Phnom Penh (RUPP) Events
    {
        id: '1',
        title: 'RUPP Annual Science Fair 2025',
        description: 'Royal University of Phnom Penh presents innovative research projects from students across all faculties. Featuring AI, renewable energy, biotechnology, and sustainable development projects.',
        category: 'Academic',
        location: 'Royal University of Phnom Penh, Russian Blvd, Phnom Penh',
        date: '2025-10-15',
        startDate: '2025-10-15T08:00:00',
        endDate: '2025-10-15T17:00:00',
        imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=2070&auto=format&fit=crop', // Science Fair - Laboratory/Research
        capacity: 500,
        featured: true,
        organizerId: 'rupp_admin',
        RSVPs: [
            { status: 'attending' },
            { status: 'attending' },
            { status: 'interested' }
        ]
    },
    {
        id: '2',
        title: 'Cambodia-Japan University Tech Symposium',
        description: 'Join CJU\'s premier technology conference featuring presentations on digital transformation, smart cities, and Industry 4.0 in Cambodia.',
        category: 'Technology',
        location: 'Cambodia-Japan University, Pochentong, Phnom Penh',
        date: '2025-10-18',
        startDate: '2025-10-18T13:00:00',
        endDate: '2025-10-18T18:00:00',
        imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2070&auto=format&fit=crop', // Tech Symposium - Modern Technology
        capacity: 300,
        featured: true,
        organizerId: 'cju_admin',
        RSVPs: [
            { status: 'attending' },
            { status: 'attending' }
        ]
    },
    {
        id: '3',
        title: 'Norton University Business Competition',
        description: 'Annual business plan competition for undergraduate students. Present your startup ideas to industry experts and win cash prizes up to $5,000.',
        category: 'Business & Networking',
        location: 'Norton University, St. 214, Phnom Penh',
        date: '2025-10-22',
        startDate: '2025-10-22T14:00:00',
        endDate: '2025-10-22T18:00:00',
        imageUrl: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=2070&auto=format&fit=crop', // Business Competition - Entrepreneurs
        capacity: 150,
        featured: true,
        organizerId: 'norton_admin',
        RSVPs: [
            { status: 'attending' }
        ]
    },
    {
        id: '4',
        title: 'IFL Cultural Festival - Khmer Heritage Day',
        description: 'Institute of Foreign Languages celebrates Cambodian culture with traditional dance performances, poetry recitations, and cultural exhibitions.',
        category: 'Performing Arts',
        location: 'Institute of Foreign Languages, Russian Blvd, Phnom Penh',
        date: '2025-10-25',
        startDate: '2025-10-25T16:00:00',
        endDate: '2025-10-25T21:00:00',
        imageUrl: 'https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?q=80&w=2070&auto=format&fit=crop', // Cultural Festival - Traditional Dance
        capacity: 400,
        featured: true,
        organizerId: 'ifl_admin',
        RSVPs: []
    },
    {
        id: '5',
        title: 'Build Bright University Career Fair',
        description: 'Connect with top employers in Cambodia including banks, NGOs, tech companies, and government agencies. Resume workshops and interview sessions included.',
        category: 'Career Development',
        location: 'Build Bright University, St. 271, Phnom Penh',
        date: '2025-10-28',
        startDate: '2025-10-28T09:00:00',
        endDate: '2025-10-28T16:00:00',
        imageUrl: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=2070&auto=format&fit=crop', // Career Fair - Job Interview
        capacity: 600,
        featured: true,
        organizerId: 'bbu_admin',
        RSVPs: []
    },
    {
        id: '6',
        title: 'University of Cambodia Debate Tournament',
        description: 'Inter-university English debate competition focusing on contemporary issues affecting Southeast Asia. Teams from across Phnom Penh will compete.',
        category: 'Academic',
        location: 'University of Cambodia, Northbridge Rd, Phnom Penh',
        date: '2025-11-02',
        startDate: '2025-11-02T08:30:00',
        endDate: '2025-11-02T17:00:00',
        imageUrl: 'https://images.unsplash.com/photo-1553028826-f4804a6dba3b?q=80&w=2070&auto=format&fit=crop', // Debate Tournament - Students Debating
        capacity: 200,
        featured: false,
        organizerId: 'uc_admin',
        RSVPs: []
    },
    {
        id: '7',
        title: 'PPIU Medical Conference - Healthcare Innovation',
        description: 'Phnom Penh International University Medical Faculty hosts a conference on modern healthcare solutions and medical technology in Cambodia.',
        category: 'Health & Medicine',
        location: 'Phnom Penh International University, St. 169, Phnom Penh',
        date: '2025-11-05',
        startDate: '2025-11-05T13:00:00',
        endDate: '2025-11-05T18:00:00',
        imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?q=80&w=2070&auto=format&fit=crop', // Medical Conference - Healthcare
        capacity: 250,
        featured: false,
        organizerId: 'ppiu_admin',
        RSVPs: []
    },
    {
        id: '8',
        title: 'RULE Law Student Moot Court Competition',
        description: 'Royal University of Law and Economics presents an annual moot court competition simulating Supreme Court cases with real judges presiding.',
        category: 'Academic',
        location: 'Royal University of Law and Economics, St. 184, Phnom Penh',
        date: '2025-11-08',
        startDate: '2025-11-08T14:00:00',
        endDate: '2025-11-08T18:00:00',
        imageUrl: 'https://images.unsplash.com/photo-1505663912202-ac22d4cb3412?q=80&w=2070&auto=format&fit=crop', // Moot Court - Law/Justice
        capacity: 180,
        featured: false,
        organizerId: 'rule_admin',
        RSVPs: []
    },
    {
        id: '9',
        title: 'AUPP International Student Festival',
        description: 'American University of Phnom Penh celebrates diversity with food from 20+ countries, cultural performances, and international student showcases.',
        category: 'Cultural',
        location: 'American University of Phnom Penh, St. 184, Phnom Penh',
        date: '2025-11-12',
        startDate: '2025-11-12T17:00:00',
        endDate: '2025-11-12T22:00:00',
        imageUrl: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=2070&auto=format&fit=crop', // International Festival - Multicultural
        capacity: 350,
        featured: true,
        organizerId: 'aupp_admin',
        RSVPs: []
    },
    {
        id: '10',
        title: 'Paññāsāstra University Engineering Expo',
        description: 'Showcase of final year engineering projects including robotics, civil engineering models, and computer science applications.',
        category: 'Technology',
        location: 'Paññāsāstra University, St. 184, Phnom Penh',
        date: '2025-11-15',
        startDate: '2025-11-15T09:00:00',
        endDate: '2025-11-15T16:00:00',
        imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop', // Engineering Expo - Robotics/Tech
        capacity: 300,
        featured: false,
        organizerId: 'puc_admin',
        RSVPs: []
    },
    {
        id: '11',
        title: 'Cambodia University for Specialties Art Exhibition',
        description: 'Annual fine arts exhibition featuring paintings, sculptures, photography, and digital art from CUS students and faculty.',
        category: 'Arts & Culture',
        location: 'Cambodia University for Specialties, St. 123, Phnom Penh',
        date: '2025-11-18',
        startDate: '2025-11-18T15:00:00',
        endDate: '2025-11-18T20:00:00',
        imageUrl: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?q=80&w=2070&auto=format&fit=crop', // Art Exhibition - Gallery/Paintings
        capacity: 200,
        featured: false,
        organizerId: 'cus_admin',
        RSVPs: []
    },
    {
        id: '12',
        title: 'SETEC Green Technology Workshop',
        description: 'Svay Rieng University Institute of Technology presents sustainable technology solutions for Cambodia\'s environmental challenges.',
        category: 'Environment',
        location: 'SETEC Institute, Russian Blvd, Phnom Penh',
        date: '2025-11-20',
        startDate: '2025-11-20T13:30:00',
        endDate: '2025-11-20T17:30:00',
        imageUrl: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=2070&auto=format&fit=crop', // Green Technology - Environmental/Solar
        capacity: 120,
        featured: false,
        organizerId: 'setec_admin',
        RSVPs: []
    },
    {
        id: '13',
        title: 'NIPTICT Cybersecurity Summit',
        description: 'National Institute of Posts, Telecoms & ICT hosts cybersecurity experts discussing digital threats and protection strategies for Cambodia.',
        category: 'Technology',
        location: 'NIPTICT, St. 184, Phnom Penh',
        date: '2025-11-25',
        startDate: '2025-11-25T08:00:00',
        endDate: '2025-11-25T17:00:00',
        imageUrl: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2070&auto=format&fit=crop', // Cybersecurity Summit - Digital Security
        capacity: 200,
        featured: true,
        organizerId: 'niptict_admin',
        RSVPs: []
    },
    {
        id: '14',
        title: 'Zaman University Literature Night',
        description: 'Evening of poetry, short story readings, and literary discussions featuring both Khmer and English literature from student writers.',
        category: 'Literature',
        location: 'Zaman University, St. 315, Phnom Penh',
        date: '2025-11-28',
        startDate: '2025-11-28T18:00:00',
        endDate: '2025-11-28T21:00:00',
        imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2070&auto=format&fit=crop', // Literature Night - Books/Reading
        capacity: 100,
        featured: false,
        organizerId: 'zaman_admin',
        RSVPs: []
    },
    {
        id: '15',
        title: 'Royal University of Agriculture Food Security Forum',
        description: 'Experts discuss sustainable agriculture practices and food security challenges in Cambodia. Includes organic farming demonstrations.',
        category: 'Agriculture',
        location: 'Royal University of Agriculture, Chamkar Daung, Phnom Penh',
        date: '2025-12-01',
        startDate: '2025-12-01T14:00:00',
        endDate: '2025-12-01T18:00:00',
        imageUrl: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80&w=2070&auto=format&fit=crop', // Agriculture Forum - Farming/Crops
        capacity: 180,
        featured: false,
        organizerId: 'rua_admin',
        RSVPs: []
    },
    {
        id: '16',
        title: 'Cambodia Mekong University Sports Day',
        description: 'Annual inter-faculty sports competition featuring football, volleyball, basketball, badminton, and traditional Khmer games.',
        category: 'Sports & Recreation',
        location: 'Cambodia Mekong University, St. 271, Phnom Penh',
        date: '2025-12-05',
        startDate: '2025-12-05T07:00:00',
        endDate: '2025-12-05T18:00:00',
        imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070&auto=format&fit=crop', // Sports Day - Athletic Competition
        capacity: 800,
        featured: true,
        organizerId: 'cmu_admin',
        RSVPs: []
    },
    {
        id: '17',
        title: 'Institute of Technology Model UN Conference',
        description: 'Three-day Model United Nations conference addressing global issues with special focus on ASEAN regional cooperation and development.',
        category: 'Academic',
        location: 'Institute of Technology of Cambodia, Russian Blvd, Phnom Penh',
        date: '2025-12-08',
        startDate: '2025-12-08T08:00:00',
        endDate: '2025-12-10T17:00:00',
        imageUrl: 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?q=80&w=2070&auto=format&fit=crop', // Model UN - International Conference
        capacity: 150,
        featured: true,
        organizerId: 'itc_admin',
        RSVPs: []
    },
    {
        id: '18',
        title: 'Royal Academy of Cambodia Historical Symposium',
        description: 'Scholarly presentations on Cambodian history, archaeology, and cultural preservation. Features newly discovered artifacts and research.',
        category: 'History & Culture',
        location: 'Royal Academy of Cambodia, St. 184, Phnom Penh',
        date: '2025-12-12',
        startDate: '2025-12-12T13:00:00',
        endDate: '2025-12-12T17:00:00',
        imageUrl: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?q=80&w=2070&auto=format&fit=crop', // Historical Symposium - Ancient Artifacts
        capacity: 120,
        featured: false,
        organizerId: 'rac_admin',
        RSVPs: []
    },
    {
        id: '19',
        title: 'University of South-East Asia Entrepreneurship Bootcamp',
        description: 'Intensive 2-day bootcamp for aspiring entrepreneurs. Learn business planning, funding strategies, and startup essentials from successful Cambodian entrepreneurs.',
        category: 'Business & Networking',
        location: 'University of South-East Asia, St. 184, Phnom Penh',
        date: '2025-12-15',
        startDate: '2025-12-15T09:00:00',
        endDate: '2025-12-16T17:00:00',
        imageUrl: 'https://images.unsplash.com/photo-1552581234-26160f608093?q=80&w=2070&auto=format&fit=crop', // Entrepreneurship Bootcamp - Startup/Business
        capacity: 80,
        featured: true,
        organizerId: 'usea_admin',
        RSVPs: []
    },
    {
        id: '20',
        title: 'International University Fashion Show',
        description: 'Annual fashion show featuring designs by International University students, showcasing modern interpretations of traditional Cambodian clothing.',
        category: 'Fashion & Design',
        location: 'International University, St. 371, Phnom Penh',
        date: '2025-12-18',
        startDate: '2025-12-18T19:00:00',
        endDate: '2025-12-18T22:00:00',
        imageUrl: 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?q=80&w=2070&auto=format&fit=crop', // Fashion Show - Runway/Models
        capacity: 300,
        featured: true,
        organizerId: 'iu_admin',
        RSVPs: []
    }
];

// Event mock data organized by ID for EventDetail component
export const mockEventsByID = mockEvents.reduce((acc, event) => {
    acc[event.id] = event;
    return acc;
}, {});

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