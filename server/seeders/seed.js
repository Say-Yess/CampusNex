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

        // Create events
        console.log('Creating events...');
        const events = await Promise.all([
            Event.create({
                title: 'Campus Tech Fair 2025',
                description: 'Annual technology exhibition showcasing student projects and research in areas like AI, robotics, and mobile applications. Connect with industry professionals and see the latest innovations from our campus community.',
                location: 'Main Campus Hall',
                startDate: new Date('2025-10-15T10:00:00'),
                endDate: new Date('2025-10-15T16:00:00'),
                category: 'Technology',
                capacity: 200,
                organizerId: organizerUsers[0].id,
                status: 'published',
                imageUrl: '/images/events/tech-fair.jpg'
            }),
            Event.create({
                title: 'Career Development Workshop',
                description: 'Interactive workshop on resume building, interview preparation, and networking strategies. Learn how to showcase your skills effectively and make a strong impression on potential employers.',
                location: 'Career Center, Room 102',
                startDate: new Date('2025-10-20T14:00:00'),
                endDate: new Date('2025-10-20T16:00:00'),
                category: 'Career',
                capacity: 50,
                organizerId: organizerUsers[1].id,
                status: 'published',
                imageUrl: '/images/events/career-workshop.jpg'
            }),
            Event.create({
                title: 'Campus Music Festival',
                description: 'A celebration of musical talent featuring performances from student bands, solo artists, and cultural groups. Food vendors and art installations will be available throughout the event.',
                location: 'University Amphitheater',
                startDate: new Date('2025-11-05T17:00:00'),
                endDate: new Date('2025-11-05T22:00:00'),
                category: 'Entertainment',
                capacity: 500,
                organizerId: organizerUsers[0].id,
                status: 'published',
                imageUrl: '/images/events/music-festival.jpg'
            }),
            Event.create({
                title: 'Entrepreneurship Seminar',
                description: 'Learn from successful entrepreneurs about starting your own business, securing funding, and navigating challenges. Networking opportunities with investors and business incubators.',
                location: 'Business School Auditorium',
                startDate: new Date('2025-11-12T13:00:00'),
                endDate: new Date('2025-11-12T17:00:00'),
                category: 'Business',
                capacity: 150,
                organizerId: organizerUsers[1].id,
                status: 'published',
                imageUrl: '/images/events/entrepreneurship.jpg'
            }),
            Event.create({
                title: 'Environmental Sustainability Summit',
                description: 'A forum for discussing campus sustainability initiatives and environmental challenges. Featured speakers include environmental scientists, activists, and university sustainability officers.',
                location: 'Science Building, Room 305',
                startDate: new Date('2025-11-18T09:00:00'),
                endDate: new Date('2025-11-18T15:00:00'),
                category: 'Academic',
                capacity: 100,
                organizerId: organizerUsers[0].id,
                status: 'published',
                imageUrl: '/images/events/sustainability.jpg'
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