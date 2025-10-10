// server/scripts/seedCambodiaEvents.js
// Safe database seeding script for Cambodia University Events
// This script preserves all existing data and only adds new events

const { Event, User } = require('../models');
const { v4: uuidv4 } = require('uuid');

// Cambodia University Events Data (from mockEvents.js)
const cambodiaEvents = [
    {
        id: 'cambodia-rupp-science-fair-2025',
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
        id: 'cambodia-cju-tech-symposium-2025',
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
        id: 'cambodia-norton-business-competition-2025',
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
        id: 'cambodia-ifl-cultural-festival-2025',
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
        id: 'cambodia-bbu-career-fair-2025',
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
        id: 'cambodia-uc-debate-tournament-2025',
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
        id: 'cambodia-ppiu-medical-conference-2025',
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
        id: 'cambodia-rule-moot-court-2025',
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
        id: 'cambodia-aupp-international-festival-2025',
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
        id: 'cambodia-puc-engineering-expo-2025',
        title: 'Paññāsāstra University Engineering Expo',
        description: 'Showcase of final year engineering projects including robotics, civil engineering models, and computer science applications.',
        category: 'Technology',
        location: 'Paññāsāstra University, St. 184, Phnom Penh',
        startDate: '2025-11-15T09:00:00',
        endDate: '2025-11-15T16:00:00',
        imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop',
        capacity: 300,
        status: 'published'
    },
    {
        id: 'cambodia-cus-art-exhibition-2025',
        title: 'Cambodia University for Specialties Art Exhibition',
        description: 'Annual fine arts exhibition featuring paintings, sculptures, photography, and digital art from CUS students and faculty.',
        category: 'Arts & Culture',
        location: 'Cambodia University for Specialties, St. 123, Phnom Penh',
        startDate: '2025-11-18T15:00:00',
        endDate: '2025-11-18T20:00:00',
        imageUrl: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?q=80&w=2070&auto=format&fit=crop',
        capacity: 200,
        status: 'published'
    },
    {
        id: 'cambodia-setec-green-tech-2025',
        title: 'SETEC Green Technology Workshop',
        description: 'Svay Rieng University Institute of Technology presents sustainable technology solutions for Cambodia\'s environmental challenges.',
        category: 'Environment',
        location: 'SETEC Institute, Russian Blvd, Phnom Penh',
        startDate: '2025-11-20T13:30:00',
        endDate: '2025-11-20T17:30:00',
        imageUrl: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=2070&auto=format&fit=crop',
        capacity: 120,
        status: 'published'
    },
    {
        id: 'cambodia-niptict-cybersecurity-2025',
        title: 'NIPTICT Cybersecurity Summit',
        description: 'National Institute of Posts, Telecoms & ICT hosts cybersecurity experts discussing digital threats and protection strategies for Cambodia.',
        category: 'Technology',
        location: 'NIPTICT, St. 184, Phnom Penh',
        startDate: '2025-11-25T08:00:00',
        endDate: '2025-11-25T17:00:00',
        imageUrl: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2070&auto=format&fit=crop',
        capacity: 200,
        status: 'published'
    },
    {
        id: 'cambodia-zaman-literature-night-2025',
        title: 'Zaman University Literature Night',
        description: 'Evening of poetry, short story readings, and literary discussions featuring both Khmer and English literature from student writers.',
        category: 'Literature',
        location: 'Zaman University, St. 315, Phnom Penh',
        startDate: '2025-11-28T18:00:00',
        endDate: '2025-11-28T21:00:00',
        imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2070&auto=format&fit=crop',
        capacity: 100,
        status: 'published'
    },
    {
        id: 'cambodia-rua-food-security-2025',
        title: 'Royal University of Agriculture Food Security Forum',
        description: 'Experts discuss sustainable agriculture practices and food security challenges in Cambodia. Includes organic farming demonstrations.',
        category: 'Agriculture',
        location: 'Royal University of Agriculture, Chamkar Daung, Phnom Penh',
        startDate: '2025-12-01T14:00:00',
        endDate: '2025-12-01T18:00:00',
        imageUrl: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80&w=2070&auto=format&fit=crop',
        capacity: 180,
        status: 'published'
    },
    {
        id: 'cambodia-cmu-sports-day-2025',
        title: 'Cambodia Mekong University Sports Day',
        description: 'Annual inter-faculty sports competition featuring football, volleyball, basketball, badminton, and traditional Khmer games.',
        category: 'Sports & Recreation',
        location: 'Cambodia Mekong University, St. 271, Phnom Penh',
        startDate: '2025-12-05T07:00:00',
        endDate: '2025-12-05T18:00:00',
        imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070&auto=format&fit=crop',
        capacity: 800,
        status: 'published'
    },
    {
        id: 'cambodia-itc-model-un-2025',
        title: 'Institute of Technology Model UN Conference',
        description: 'Three-day Model United Nations conference addressing global issues with special focus on ASEAN regional cooperation and development.',
        category: 'Academic',
        location: 'Institute of Technology of Cambodia, Russian Blvd, Phnom Penh',
        startDate: '2025-12-08T08:00:00',
        endDate: '2025-12-10T17:00:00',
        imageUrl: 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?q=80&w=2070&auto=format&fit=crop',
        capacity: 150,
        status: 'published'
    },
    {
        id: 'cambodia-rac-historical-symposium-2025',
        title: 'Royal Academy of Cambodia Historical Symposium',
        description: 'Scholarly presentations on Cambodian history, archaeology, and cultural preservation. Features newly discovered artifacts and research.',
        category: 'History & Culture',
        location: 'Royal Academy of Cambodia, St. 184, Phnom Penh',
        startDate: '2025-12-12T13:00:00',
        endDate: '2025-12-12T17:00:00',
        imageUrl: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?q=80&w=2070&auto=format&fit=crop',
        capacity: 120,
        status: 'published'
    },
    {
        id: 'cambodia-usea-entrepreneurship-2025',
        title: 'University of South-East Asia Entrepreneurship Bootcamp',
        description: 'Intensive 2-day bootcamp for aspiring entrepreneurs. Learn business planning, funding strategies, and startup essentials from successful Cambodian entrepreneurs.',
        category: 'Business & Networking',
        location: 'University of South-East Asia, St. 184, Phnom Penh',
        startDate: '2025-12-15T09:00:00',
        endDate: '2025-12-16T17:00:00',
        imageUrl: 'https://images.unsplash.com/photo-1552581234-26160f608093?q=80&w=2070&auto=format&fit=crop',
        capacity: 80,
        status: 'published'
    },
    {
        id: 'cambodia-iu-fashion-show-2025',
        title: 'International University Fashion Show',
        description: 'Annual fashion show featuring designs by International University students, showcasing modern interpretations of traditional Cambodian clothing.',
        category: 'Fashion & Design',
        location: 'International University, St. 371, Phnom Penh',
        startDate: '2025-12-18T19:00:00',
        endDate: '2025-12-18T22:00:00',
        imageUrl: 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?q=80&w=2070&auto=format&fit=crop',
        capacity: 300,
        status: 'published'
    }
];

const seedCambodiaEvents = async () => {
    try {
        console.log('🌱 Starting SAFE seeding of Cambodia university events...');
        console.log('📊 This will preserve all existing data including users and RSVPs');
        console.log(`📦 Events to process: ${cambodiaEvents.length}`);
        
        // Check existing events count
        const existingEventsCount = await Event.count();
        console.log(`📋 Current events in database: ${existingEventsCount}`);        // Find or create a system organizer
        let systemOrganizer = await User.findOne({ where: { email: 'system@campusnex.com' } });
        if (!systemOrganizer) {
            systemOrganizer = await User.create({
                id: uuidv4(),
                firstName: 'CampusNex',
                lastName: 'System',
                email: 'system@campusnex.com',
                role: 'organizer',
                emailVerified: true
            });
            console.log('✅ Created system organizer account');
        }

        let addedCount = 0;
        let skippedCount = 0;

        // Process each Cambodia event
        for (let i = 0; i < cambodiaEvents.length; i++) {
            const eventData = cambodiaEvents[i];
            try {
                console.log(`🔄 Processing ${i + 1}/${cambodiaEvents.length}: ${eventData.title}`);
                
                // Check if event already exists (by ID or title) - simplified check
                const existingById = await Event.findByPk(eventData.id);
                const existingByTitle = await Event.findOne({ where: { title: eventData.title } });
                
                if (existingById || existingByTitle) {
                    console.log(`⏭️  Skipped existing: ${eventData.title}`);
                    skippedCount++;
                    continue;
                }
                
                // Create new event with proper field mapping
                const newEvent = await Event.create({
                    id: eventData.id,
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
                
            } catch (error) {
                console.log(`❌ Failed to create: ${eventData.title}`);
                console.log(`❌ Error details: ${error.message}`);
                console.log(`❌ Stack: ${error.stack}`);
            }
        }        // Final report
        const finalEventsCount = await Event.count();
        console.log('\n🎉 SAFE seeding completed!');
        console.log(`📊 Events before seeding: ${existingEventsCount}`);
        console.log(`📊 Events after seeding: ${finalEventsCount}`);
        console.log(`✅ New events added: ${addedCount}`);
        console.log(`⏭️  Events skipped (already exist): ${skippedCount}`);
        console.log('💾 All existing data preserved (users, RSVPs, etc.)');

        return {
            success: true,
            addedCount,
            skippedCount,
            totalEvents: finalEventsCount
        };

    } catch (error) {
        console.error('❌ Error during safe seeding:', error);
        throw error;
    }
};

// Allow running this script directly
if (require.main === module) {
    seedCambodiaEvents()
        .then((result) => {
            console.log('✅ Seeding completed successfully:', result);
            process.exit(0);
        })
        .catch((error) => {
            console.error('❌ Seeding failed:', error);
            process.exit(1);
        });
}

module.exports = { seedCambodiaEvents };