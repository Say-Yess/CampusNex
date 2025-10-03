const { User, Event, RSVP } = require('../models');
const bcrypt = require('bcrypt');
const { sequelize } = require('../config/database');

/**
 * Seeds database with initial data for testing and development
 */
const seedDatabase = async () => {
    console.log('Starting database seeding...');

    try {
        // Reset database if in development mode
        if (process.env.NODE_ENV === 'development') {
            console.log('Resetting database...');
            await sequelize.sync({ force: true });
        }

        // Create admin user
        console.log('Creating admin user...');
        const adminUser = await User.create({
            email: 'admin@campusnex.com',
            password: await bcrypt.hash('Admin@123', 10),
            firstName: 'Admin',
            lastName: 'User',
            role: 'admin',
            department: 'Administration'
        });

        // Create organizer users
        console.log('Creating organizer users...');
        const organizerUsers = await Promise.all([
            User.create({
                email: 'organizer1@campusnex.com',
                password: await bcrypt.hash('Organizer@123', 10),
                firstName: 'John',
                lastName: 'Doe',
                role: 'organizer',
                department: 'Computer Science'
            }),
            User.create({
                email: 'organizer2@campusnex.com',
                password: await bcrypt.hash('Organizer@123', 10),
                firstName: 'Jane',
                lastName: 'Smith',
                role: 'organizer',
                department: 'Business Administration'
            })
        ]);

        // Create student users
        console.log('Creating student users...');
        const studentUsers = await Promise.all([
            User.create({
                email: 'student1@campusnex.com',
                password: await bcrypt.hash('Student@123', 10),
                firstName: 'Alex',
                lastName: 'Johnson',
                role: 'student',
                department: 'Computer Science',
                universityId: 'CS202501'
            }),
            User.create({
                email: 'student2@campusnex.com',
                password: await bcrypt.hash('Student@123', 10),
                firstName: 'Emma',
                lastName: 'Williams',
                role: 'student',
                department: 'Business Administration',
                universityId: 'BA202502'
            }),
            User.create({
                email: 'student3@campusnex.com',
                password: await bcrypt.hash('Student@123', 10),
                firstName: 'Michael',
                lastName: 'Brown',
                role: 'student',
                department: 'Electrical Engineering',
                universityId: 'EE202503'
            })
        ]);

        // Create events - Phnom Penh focused events
        console.log('Creating Phnom Penh events...');
        const events = await Promise.all([
            Event.create({
                title: 'Angkor Wat Sunrise Photography Workshop',
                description: 'Capture the magical sunrise over Angkor Wat with professional photographers. Learn advanced techniques while experiencing one of the world\'s most beautiful sunrises.',
                location: 'Angkor Archaeological Park, Siem Reap',
                startDate: new Date('2025-10-15T05:00:00'),
                endDate: new Date('2025-10-15T08:00:00'),
                category: 'Photography',
                capacity: 25,
                organizerId: organizerUsers[0].id,
                status: 'published',
                imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop'
            }),
            Event.create({
                title: 'Cambodia Tech Startup Pitch Night',
                description: 'Local entrepreneurs pitch their innovative solutions to transform Cambodia. Network with investors, mentors, and fellow startup enthusiasts in Phnom Penh.',
                location: 'Smart Axiata Digital Innovation Hub, Phnom Penh',
                startDate: new Date('2025-10-20T18:00:00'),
                endDate: new Date('2025-10-20T22:00:00'),
                category: 'Business & Networking',
                capacity: 100,
                organizerId: organizerUsers[1].id,
                status: 'published',
                imageUrl: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=2070&auto=format&fit=crop'
            }),
            Event.create({
                title: 'Traditional Khmer Cooking Masterclass',
                description: 'Learn to cook authentic Cambodian dishes like Fish Amok, Beef Lok Lak, and Nom Banh Chok from master chefs in Siem Reap.',
                location: 'Frizz Restaurant, Siem Reap',
                startDate: new Date('2025-10-25T14:00:00'),
                endDate: new Date('2025-10-25T18:00:00'),
                category: 'Food & Drinks',
                capacity: 20,
                organizerId: organizerUsers[0].id,
                status: 'published',
                imageUrl: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2069&auto=format&fit=crop'
            }),
            Event.create({
                title: 'Royal Palace Evening Concert',
                description: 'Experience classical Khmer music and traditional Apsara dance performance in the magical setting of the Royal Palace Gardens.',
                location: 'Royal Palace Gardens, Phnom Penh',
                startDate: new Date('2025-11-01T19:00:00'),
                endDate: new Date('2025-11-01T21:00:00'),
                category: 'Performing Arts',
                capacity: 150,
                organizerId: organizerUsers[1].id,
                status: 'published',
                imageUrl: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?q=80&w=2070&auto=format&fit=crop'
            }),
            Event.create({
                title: 'Mekong River Sunset Cruise',
                description: 'Enjoy breathtaking sunset views along the Mekong River with traditional music, local snacks, and cultural storytelling.',
                location: 'Sisowath Quay, Phnom Penh',
                startDate: new Date('2025-11-05T17:00:00'),
                endDate: new Date('2025-11-05T19:30:00'),
                category: 'Sports & Outdoors',
                capacity: 60,
                organizerId: organizerUsers[0].id,
                status: 'published',
                imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop'
            }),
            Event.create({
                title: 'Cambodian Art & Craft Workshop',
                description: 'Learn traditional Cambodian arts including stone carving, silk weaving, and silver crafting with local artisans.',
                location: 'Artisans Angkor, Siem Reap',
                startDate: new Date('2025-11-08T09:00:00'),
                endDate: new Date('2025-11-08T16:00:00'),
                category: 'Workshops, Conferences & Classes',
                capacity: 30,
                organizerId: organizerUsers[1].id,
                status: 'published',
                imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=2070&auto=format&fit=crop'
            }),
            Event.create({
                title: 'Phnom Penh Street Food Festival',
                description: 'Discover the incredible flavors of Cambodian street food with vendors from across the city. From Num Pang to fresh tropical fruits!',
                location: 'Wat Phnom Park, Phnom Penh',
                startDate: new Date('2025-11-12T16:00:00'),
                endDate: new Date('2025-11-12T22:00:00'),
                category: 'Festivals & Lifestyle',
                capacity: 500,
                organizerId: organizerUsers[0].id,
                status: 'published',
                imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2070&auto=format&fit=crop'
            }),
            Event.create({
                title: 'Banteay Srei Temple Architecture Tour',
                description: 'Explore the intricate pink sandstone carvings of the "Citadel of Women" with expert archaeologists and historians.',
                location: 'Banteay Srei Temple, Siem Reap',
                startDate: new Date('2025-11-15T08:00:00'),
                endDate: new Date('2025-11-15T12:00:00'),
                category: 'Exhibitions',
                capacity: 40,
                organizerId: organizerUsers[1].id,
                status: 'published',
                imageUrl: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?q=80&w=2070&auto=format&fit=crop'
            }),
            Event.create({
                title: 'Cambodian Independence Day Celebration',
                description: 'Join the festive celebration of Cambodia\'s Independence Day with parades, traditional performances, and fireworks.',
                location: 'Independence Monument, Phnom Penh',
                startDate: new Date('2025-11-09T14:00:00'),
                endDate: new Date('2025-11-09T20:00:00'),
                category: 'Festivals & Lifestyle',
                capacity: 1000,
                organizerId: organizerUsers[0].id,
                status: 'published',
                imageUrl: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=2070&auto=format&fit=crop'
            }),
            Event.create({
                title: 'Tonle Sap Floating Village Experience',
                description: 'Visit the remarkable floating villages of Tonle Sap Lake and learn about the unique lifestyle of the lake communities.',
                location: 'Kompong Phluk, Siem Reap',
                startDate: new Date('2025-11-18T07:00:00'),
                endDate: new Date('2025-11-18T15:00:00'),
                category: 'Sports & Outdoors',
                capacity: 35,
                organizerId: organizerUsers[1].id,
                status: 'published',
                imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af2ac1?q=80&w=2070&auto=format&fit=crop'
            }),
            Event.create({
                title: 'Phnom Penh Night Market & Food Tour',
                description: 'Explore the vibrant night markets of Phnom Penh, taste local delicacies, and shop for unique Cambodian handicrafts.',
                location: 'Central Market to Russian Market, Phnom Penh',
                startDate: new Date('2025-11-22T18:00:00'),
                endDate: new Date('2025-11-22T22:00:00'),
                category: 'Food & Drinks',
                capacity: 25,
                organizerId: organizerUsers[0].id,
                status: 'published',
                imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop'
            }),
            Event.create({
                title: 'Cambodian Traditional Dance Workshop',
                description: 'Learn the graceful movements of classical Khmer dance from professional dancers at the Royal University of Fine Arts.',
                location: 'Royal University of Fine Arts, Phnom Penh',
                startDate: new Date('2025-11-25T10:00:00'),
                endDate: new Date('2025-11-25T16:00:00'),
                category: 'Performing Arts',
                capacity: 30,
                organizerId: organizerUsers[1].id,
                status: 'published',
                imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=2070&auto=format&fit=crop'
            }),
            Event.create({
                title: 'Cambodia Digital Innovation Summit',
                description: 'Discover how technology is transforming Cambodia. Meet tech leaders, learn about digital initiatives, and network with innovators.',
                location: 'Sokha Phnom Penh Hotel, Phnom Penh',
                startDate: new Date('2025-11-28T08:30:00'),
                endDate: new Date('2025-11-28T17:00:00'),
                category: 'Business & Networking',
                capacity: 200,
                organizerId: organizerUsers[0].id,
                status: 'published',
                imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop'
            }),
            Event.create({
                title: 'Bayon Temple Sunrise Meditation',
                description: 'Experience spiritual tranquility with guided meditation at the iconic Bayon Temple as the sun rises over Angkor Thom.',
                location: 'Bayon Temple, Angkor Thom, Siem Reap',
                startDate: new Date('2025-12-01T05:30:00'),
                endDate: new Date('2025-12-01T07:30:00'),
                category: 'Workshops, Conferences & Classes',
                capacity: 20,
                organizerId: organizerUsers[1].id,
                status: 'published',
                imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop'
            }),
            Event.create({
                title: 'Cambodian Coffee Culture Experience',
                description: 'Discover Cambodia\'s growing coffee culture. Visit local plantations, learn brewing techniques, and taste unique Cambodian coffee varieties.',
                location: 'Brown Coffee & Bakery, Phnom Penh',
                startDate: new Date('2025-12-05T09:00:00'),
                endDate: new Date('2025-12-05T12:00:00'),
                category: 'Food & Drinks',
                capacity: 25,
                organizerId: organizerUsers[0].id,
                status: 'published',
                imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070&auto=format&fit=crop'
            }),
            Event.create({
                title: 'Silk Island Bicycle Adventure',
                description: 'Cycle through the peaceful Silk Island, visit silk weaving villages, and enjoy a traditional lunch with local families.',
                location: 'Koh Dach (Silk Island), Phnom Penh',
                startDate: new Date('2025-12-08T08:00:00'),
                endDate: new Date('2025-12-08T16:00:00'),
                category: 'Sports & Outdoors',
                capacity: 15,
                organizerId: organizerUsers[1].id,
                status: 'published',
                imageUrl: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?q=80&w=2070&auto=format&fit=crop'
            }),
            Event.create({
                title: 'Cambodian Film Festival Screening',
                description: 'Watch award-winning Cambodian films and documentaries, followed by discussions with local filmmakers and critics.',
                location: 'Institut français du Cambodge, Phnom Penh',
                startDate: new Date('2025-12-12T19:00:00'),
                endDate: new Date('2025-12-12T22:00:00'),
                category: 'Festivals & Lifestyle',
                capacity: 80,
                organizerId: organizerUsers[0].id,
                status: 'published',
                imageUrl: 'https://images.unsplash.com/photo-1489599808821-bd0d4e61bc21?q=80&w=2070&auto=format&fit=crop'
            }),
            Event.create({
                title: 'Tuol Sleng & S21 Historical Learning Tour',
                description: 'A respectful educational tour learning about Cambodia\'s history, promoting peace and understanding for future generations.',
                location: 'Tuol Sleng Genocide Museum, Phnom Penh',
                startDate: new Date('2025-12-15T09:00:00'),
                endDate: new Date('2025-12-15T12:00:00'),
                category: 'Exhibitions',
                capacity: 30,
                organizerId: organizerUsers[1].id,
                status: 'published',
                imageUrl: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?q=80&w=2070&auto=format&fit=crop'
            }),
            Event.create({
                title: 'Cambodian New Year Water Festival',
                description: 'Celebrate Bon Om Touk (Water Festival) with dragon boat races, traditional games, and festive celebrations along the riverfront.',
                location: 'Sisowath Quay Riverfront, Phnom Penh',
                startDate: new Date('2025-12-18T10:00:00'),
                endDate: new Date('2025-12-18T22:00:00'),
                category: 'Festivals & Lifestyle',
                capacity: 2000,
                organizerId: organizerUsers[0].id,
                status: 'published',
                imageUrl: 'https://images.unsplash.com/photo-1496147192622-7ad46b92b5b8?q=80&w=2070&auto=format&fit=crop'
            }),
            Event.create({
                title: 'Ta Prohm Temple Photography Expedition',
                description: 'Capture the mystical beauty of Ta Prohm temple, famous for ancient trees growing through ruins. Professional photography guidance included.',
                location: 'Ta Prohm Temple, Angkor Archaeological Park',
                startDate: new Date('2025-12-22T14:00:00'),
                endDate: new Date('2025-12-22T17:00:00'),
                category: 'Photography',
                capacity: 20,
                organizerId: organizerUsers[1].id,
                status: 'published',
                imageUrl: 'https://images.unsplash.com/photo-1617469851115-fd8dff64a495?q=80&w=2070&auto=format&fit=crop'
            })
        ]);

        // Create RSVPs
        console.log('Creating RSVPs...');
        await Promise.all([
            // Student 1 RSVPs
            RSVP.create({
                userId: studentUsers[0].id,
                eventId: events[0].id,
                status: 'attending'
            }),
            RSVP.create({
                userId: studentUsers[0].id,
                eventId: events[2].id,
                status: 'interested'
            }),
            RSVP.create({
                userId: studentUsers[0].id,
                eventId: events[4].id,
                status: 'attending'
            }),

            // Student 2 RSVPs
            RSVP.create({
                userId: studentUsers[1].id,
                eventId: events[1].id,
                status: 'attending'
            }),
            RSVP.create({
                userId: studentUsers[1].id,
                eventId: events[3].id,
                status: 'attending'
            }),

            // Student 3 RSVPs
            RSVP.create({
                userId: studentUsers[2].id,
                eventId: events[0].id,
                status: 'attending'
            }),
            RSVP.create({
                userId: studentUsers[2].id,
                eventId: events[1].id,
                status: 'interested'
            }),
            RSVP.create({
                userId: studentUsers[2].id,
                eventId: events[2].id,
                status: 'attending'
            })
        ]);

        console.log('Database seeding completed successfully!');
    } catch (error) {
        console.error('Error seeding database:', error);
        throw error;
    }
};

module.exports = seedDatabase;