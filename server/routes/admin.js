// API endpoint to seed Cambodia events
const express = require('express');
const router = express.Router();
const { Event, User } = require('../models');
const { v4: uuidv4 } = require('uuid');

// Cambodia University Events Data (using UUIDs for database compatibility)
const cambodiaEvents = [
    {
        title: 'RUPP Annual Science Fair 2025',
        description: 'Royal University of Phnom Penh presents innovative research projects from students across all faculties. Featuring AI, renewable energy, biotechnology, and sustainable development projects.',
        category: 'Academic',
        location: 'Royal University of Phnom Penh, Russian Blvd, Phnom Penh',
        startDate: '2025-10-15T08:00:00',
        endDate: '2025-10-15T17:00:00',
        imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=2070&auto=format&fit=crop',
        capacity: 500,
        status: 'published'
    },
    {
        title: 'Cambodia-Japan University Tech Symposium',
        description: 'Join CJU\'s premier technology conference featuring presentations on digital transformation, smart cities, and Industry 4.0 in Cambodia.',
        category: 'Technology',
        location: 'Cambodia-Japan University, Pochentong, Phnom Penh',
        startDate: '2025-10-18T13:00:00',
        endDate: '2025-10-18T18:00:00',
        imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2070&auto=format&fit=crop',
        capacity: 300,
        status: 'published'
    },
    {
        title: 'Norton University Business Competition',
        description: 'Annual business plan competition for undergraduate students. Present your startup ideas to industry experts and win cash prizes up to $5,000.',
        category: 'Business & Networking',
        location: 'Norton University, St. 214, Phnom Penh',
        startDate: '2025-10-22T14:00:00',
        endDate: '2025-10-22T18:00:00',
        imageUrl: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=2070&auto=format&fit=crop',
        capacity: 150,
        status: 'published'
    },
    {
        title: 'IFL Cultural Festival - Khmer Heritage Day',
        description: 'Institute of Foreign Languages celebrates Cambodian culture with traditional dance performances, poetry recitations, and cultural exhibitions.',
        category: 'Performing Arts',
        location: 'Institute of Foreign Languages, Russian Blvd, Phnom Penh',
        startDate: '2025-10-25T16:00:00',
        endDate: '2025-10-25T21:00:00',
        imageUrl: 'https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?q=80&w=2070&auto=format&fit=crop',
        capacity: 400,
        status: 'published'
    },
    {
        title: 'Build Bright University Career Fair',
        description: 'Connect with top employers in Cambodia including banks, NGOs, tech companies, and government agencies. Resume workshops and interview sessions included.',
        category: 'Career Development',
        location: 'Build Bright University, St. 271, Phnom Penh',
        startDate: '2025-10-28T09:00:00',
        endDate: '2025-10-28T16:00:00',
        imageUrl: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=2070&auto=format&fit=crop',
        capacity: 600,
        status: 'published'
    },
    {
        title: 'University of Cambodia Debate Tournament',
        description: 'Inter-university English debate competition focusing on contemporary issues affecting Southeast Asia. Teams from across Phnom Penh will compete.',
        category: 'Academic',
        location: 'University of Cambodia, Northbridge Rd, Phnom Penh',
        startDate: '2025-11-02T08:30:00',
        endDate: '2025-11-02T17:00:00',
        imageUrl: 'https://images.unsplash.com/photo-1553028826-f4804a6dba3b?q=80&w=2070&auto=format&fit=crop',
        capacity: 200,
        status: 'published'
    },
    {
        title: 'PPIU Medical Conference - Healthcare Innovation',
        description: 'Phnom Penh International University Medical Faculty hosts a conference on modern healthcare solutions and medical technology in Cambodia.',
        category: 'Health & Medicine',
        location: 'Phnom Penh International University, St. 169, Phnom Penh',
        startDate: '2025-11-05T13:00:00',
        endDate: '2025-11-05T18:00:00',
        imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?q=80&w=2070&auto=format&fit=crop',
        capacity: 250,
        status: 'published'
    },
    {
        title: 'RULE Law Student Moot Court Competition',
        description: 'Royal University of Law and Economics presents an annual moot court competition simulating Supreme Court cases with real judges presiding.',
        category: 'Academic',
        location: 'Royal University of Law and Economics, St. 184, Phnom Penh',
        startDate: '2025-11-08T14:00:00',
        endDate: '2025-11-08T18:00:00',
        imageUrl: 'https://images.unsplash.com/photo-1505663912202-ac22d4cb3412?q=80&w=2070&auto=format&fit=crop',
        capacity: 180,
        status: 'published'
    },
    {
        title: 'AUPP International Student Festival',
        description: 'American University of Phnom Penh celebrates diversity with food from 20+ countries, cultural performances, and international student showcases.',
        category: 'Cultural',
        location: 'American University of Phnom Penh, St. 184, Phnom Penh',
        startDate: '2025-11-12T17:00:00',
        endDate: '2025-11-12T22:00:00',
        imageUrl: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=2070&auto=format&fit=crop',
        capacity: 350,
        status: 'published'
    },
    {
        title: 'Paññāsāstra University Engineering Expo',
        description: 'Showcase of final year engineering projects including robotics, civil engineering models, and computer science applications.',
        category: 'Technology',
        location: 'Paññāsāstra University, St. 184, Phnom Penh',
        startDate: '2025-11-15T09:00:00',
        endDate: '2025-11-15T16:00:00',
        imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop',
        capacity: 300,
        status: 'published'
    }
];

// POST /api/admin/seed-cambodia-events
router.post('/seed-cambodia-events', async (req, res) => {
    try {
        console.log('🌱 Starting SAFE seeding of Cambodia university events...');

        // Check existing events count
        const existingEventsCount = await Event.count();
        console.log(`📋 Current events in database: ${existingEventsCount}`);

        // Find or create a system organizer
        let systemOrganizer = await User.findOne({ where: { email: 'system@campusnex.com' } });
        if (!systemOrganizer) {
            systemOrganizer = await User.create({
                id: uuidv4(),
                firstName: 'CampusNex',
                lastName: 'System',
                email: 'system@campusnex.com',
                role: 'organizer'
            });
            console.log('✅ Created system organizer account');
        }

        let addedCount = 0;
        let skippedCount = 0;
        const addedEvents = [];

        // Process each Cambodia event
        for (let i = 0; i < cambodiaEvents.length; i++) {
            const eventData = cambodiaEvents[i];
            try {
                console.log(`🔄 Processing ${i + 1}/${cambodiaEvents.length}: ${eventData.title}`);

                // Check if event already exists by title
                const existingByTitle = await Event.findOne({ where: { title: eventData.title } });

                if (existingByTitle) {
                    console.log(`⏭️  Skipped existing: ${eventData.title}`);
                    skippedCount++;
                    continue;
                }

                // Create new event
                const newEvent = await Event.create({
                    title: eventData.title,
                    description: eventData.description,
                    location: eventData.location,
                    startDate: new Date(eventData.startDate),
                    endDate: new Date(eventData.endDate),
                    category: eventData.category,
                    imageUrl: eventData.imageUrl,
                    capacity: eventData.capacity,
                    status: eventData.status || 'published',
                    organizerId: systemOrganizer.id
                });

                console.log(`✅ Added: ${newEvent.title} (ID: ${newEvent.id})`);
                addedCount++;
                addedEvents.push({
                    id: newEvent.id,
                    title: newEvent.title,
                    category: newEvent.category,
                    location: newEvent.location
                });

            } catch (error) {
                console.log(`❌ Failed to create: ${eventData.title}`);
                console.log(`❌ Error details: ${error.message}`);
            }
        }

        // Final report
        const finalEventsCount = await Event.count();
        console.log('\n🎉 SAFE seeding completed!');
        console.log(`📊 Events before seeding: ${existingEventsCount}`);
        console.log(`📊 Events after seeding: ${finalEventsCount}`);
        console.log(`✅ New events added: ${addedCount}`);
        console.log(`⏭️  Events skipped (already exist): ${skippedCount}`);

        res.json({
            success: true,
            message: 'Cambodia events seeded successfully!',
            stats: {
                existingEventsCount,
                finalEventsCount,
                addedCount,
                skippedCount,
                addedEvents
            }
        });

    } catch (error) {
        console.error('❌ Error during safe seeding:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to seed Cambodia events',
            error: error.message
        });
    }
});

module.exports = router;