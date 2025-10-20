// server/scripts/seedUsersAndEvents.js
const { User, Event, RSVP, UserStats } = require('../models');
const { v4: uuidv4 } = require('uuid');

// Sample data for creating realistic users and events
const studentNames = [
    'Sophia Chen', 'Marcus Johnson', 'Elena Rodriguez', 'David Kim', 'Aisha Patel',
    'Lucas Miller', 'Maya Thompson', 'Ryan O\'Connor', 'Zara Ahmed', 'Jake Williams'
];

const organizerData = [
    { name: 'Dr. Sarah Wilson', org: 'Computer Science Department', pos: 'Department Head' },
    { name: 'Prof. Michael Chang', org: 'Student Activities Office', pos: 'Director' },
    { name: 'Lisa Anderson', org: 'Engineering Club', pos: 'President' },
    { name: 'Ahmed Hassan', org: 'International Student Association', pos: 'Coordinator' },
    { name: 'Rebecca Foster', org: 'Career Services', pos: 'Counselor' },
    { name: 'Carlos Martinez', org: 'Mathematics Society', pos: 'Vice President' },
    { name: 'Dr. Jennifer Lee', org: 'Research Office', pos: 'Research Coordinator' },
    { name: 'Thomas Brown', org: 'Student Union', pos: 'Events Manager' },
    { name: 'Priya Sharma', org: 'Innovation Lab', pos: 'Lab Manager' },
    { name: 'Daniel Clark', org: 'Sports & Recreation', pos: 'Program Director' }
];

const eventTemplates = [
    {
        titleTemplates: ['Tech Workshop: {}', 'Introduction to {}', '{} Fundamentals', 'Mastering {}'],
        subjects: ['Machine Learning', 'Web Development', 'Data Science', 'Cybersecurity', 'Mobile Apps', 'AI Ethics', 'Cloud Computing', 'Blockchain'],
        categories: ['workshop', 'seminar', 'technical'],
        locations: ['Computer Lab A', 'Engineering Building Room 201', 'Tech Center', 'Innovation Hub']
    },
    {
        titleTemplates: ['Career Fair: {}', '{} Industry Networking', 'Professional Development: {}', '{} Career Opportunities'],
        subjects: ['Technology', 'Healthcare', 'Finance', 'Marketing', 'Engineering', 'Education', 'Consulting', 'Startups'],
        categories: ['career', 'networking', 'professional'],
        locations: ['Main Auditorium', 'Student Center Hall', 'Conference Room B', 'Career Services Office']
    },
    {
        titleTemplates: ['Cultural Night: {}', '{} Festival', 'Celebrating {}', '{} Heritage Event'],
        subjects: ['International', 'Asian Culture', 'Latin America', 'African Heritage', 'European', 'Middle Eastern', 'Indigenous', 'Diversity'],
        categories: ['cultural', 'social', 'celebration'],
        locations: ['Student Union Plaza', 'Cultural Center', 'Main Hall', 'Outdoor Amphitheater']
    },
    {
        titleTemplates: ['Research Seminar: {}', '{} Symposium', 'Academic Conference: {}', '{} Research Showcase'],
        subjects: ['Climate Change', 'Renewable Energy', 'Biotechnology', 'Space Exploration', 'Quantum Computing', 'Neuroscience', 'Psychology', 'Economics'],
        categories: ['academic', 'research', 'conference'],
        locations: ['Research Center', 'Library Auditorium', 'Science Building', 'Graduate Hall']
    },
    {
        titleTemplates: ['Sports Tournament: {}', '{} Championship', 'Fitness Workshop: {}', '{} Training Camp'],
        subjects: ['Basketball', 'Soccer', 'Tennis', 'Swimming', 'Yoga', 'CrossFit', 'Running', 'Martial Arts'],
        categories: ['sports', 'fitness', 'competition'],
        locations: ['Sports Complex', 'Gymnasium', 'Fitness Center', 'Outdoor Courts']
    }
];

function generateRandomDate(daysFromNow, maxDays) {
    const start = new Date();
    start.setDate(start.getDate() + daysFromNow);
    const end = new Date();
    end.setDate(end.getDate() + daysFromNow + maxDays);
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function generateRandomEmail(name) {
    const cleanName = name.toLowerCase().replace(/[^a-z\s]/g, '').replace(/\s+/g, '.');
    const domains = ['university.edu', 'student.edu', 'campus.edu', 'college.edu'];
    return `${cleanName}@${domains[Math.floor(Math.random() * domains.length)]}`;
}

function generateEvent(organizer, template) {
    const titleTemplate = template.titleTemplates[Math.floor(Math.random() * template.titleTemplates.length)];
    const subject = template.subjects[Math.floor(Math.random() * template.subjects.length)];
    const title = titleTemplate.replace('{}', subject);
    const location = template.locations[Math.floor(Math.random() * template.locations.length)];
    const category = template.categories[Math.floor(Math.random() * template.categories.length)];

    const eventDate = generateRandomDate(1, 30); // 1-31 days from now
    const endDate = new Date(eventDate);
    endDate.setHours(eventDate.getHours() + Math.floor(Math.random() * 3) + 1); // 1-4 hours duration

    const descriptions = [
        `Join us for an exciting ${category} focused on ${subject.toLowerCase()}. This event will provide valuable insights and hands-on experience for students interested in advancing their knowledge and skills.`,
        `Don't miss this opportunity to learn about ${subject.toLowerCase()} from industry experts. This ${category} is designed to enhance your understanding and provide practical applications.`,
        `Expand your horizons with our comprehensive ${category} on ${subject.toLowerCase()}. Network with peers and professionals while gaining valuable knowledge and experience.`,
        `Discover the latest trends and developments in ${subject.toLowerCase()}. This engaging ${category} offers both theoretical insights and practical applications for students and professionals.`
    ];

    return {
        id: uuidv4(),
        title,
        description: descriptions[Math.floor(Math.random() * descriptions.length)],
        startDate: eventDate,
        endDate,
        location,
        capacity: Math.floor(Math.random() * 80) + 20, // 20-100 capacity
        category,
        organizerId: organizer.id,
        imageUrl: `https://picsum.photos/800/400?random=${Math.floor(Math.random() * 1000)}`,
        status: 'published',
        createdAt: new Date(),
        updatedAt: new Date()
    };
}

async function seedUsersAndEvents() {
    console.log('🌱 Starting comprehensive user and event seeding...');

    try {
        // Create 10 student users
        const students = [];
        for (let i = 0; i < studentNames.length; i++) {
            const nameParts = studentNames[i].split(' ');
            const firstName = nameParts[0];
            const lastName = nameParts.slice(1).join(' ') || 'Student';

            const student = {
                id: uuidv4(),
                googleId: `student_${i + 1}_${Date.now()}`,
                firstName,
                lastName,
                email: generateRandomEmail(studentNames[i]),
                role: 'student',
                provider: 'google',
                profilePicture: `https://api.dicebear.com/7.x/avataaars/svg?seed=${studentNames[i].replace(' ', '')}`,
                createdAt: new Date(),
                updatedAt: new Date()
            };
            students.push(student);
        }

        // Create 10 organizer users
        const organizers = [];
        for (let i = 0; i < organizerData.length; i++) {
            const orgData = organizerData[i];
            const nameParts = orgData.name.split(' ');
            const firstName = nameParts[0];
            const lastName = nameParts.slice(1).join(' ') || 'Organizer';

            const organizer = {
                id: uuidv4(),
                googleId: `organizer_${i + 1}_${Date.now()}`,
                firstName,
                lastName,
                email: generateRandomEmail(orgData.name),
                role: 'organizer',
                provider: 'google',
                organization: orgData.org,
                position: orgData.pos,
                profilePicture: `https://api.dicebear.com/7.x/avataaars/svg?seed=${orgData.name.replace(' ', '')}`,
                createdAt: new Date(),
                updatedAt: new Date()
            };
            organizers.push(organizer);
        }

        // Insert users first (ensure they exist before creating events)
        console.log('👥 Creating users...');
        const createdUsers = await User.bulkCreate([...students, ...organizers], {
            ignoreDuplicates: true,
            returning: true
        });
        console.log(`Created ${createdUsers.length} users`);

        // Verify organizers exist in database before creating events
        const dbOrganizers = await User.findAll({
            where: { role: 'organizer' }
        });
        console.log(`Found ${dbOrganizers.length} organizers in database`);

        // Create 2 events for each organizer (20 events total)
        const events = [];
        for (const organizer of dbOrganizers.slice(0, 10)) { // Limit to first 10 organizers
            for (let i = 0; i < 2; i++) {
                const template = eventTemplates[Math.floor(Math.random() * eventTemplates.length)];
                const event = generateEvent(organizer, template);
                events.push(event);
            }
        }

        // Insert events
        console.log('📅 Creating events...');
        const createdEvents = await Event.bulkCreate(events, {
            ignoreDuplicates: true,
            returning: true
        });
        console.log(`Created ${createdEvents.length} events`);

        // Get all students from database for RSVPs
        const dbStudents = await User.findAll({
            where: { role: 'student' }
        });

        // Create some random RSVPs to make the leaderboard interesting
        console.log('🎫 Creating random RSVPs...');
        const rsvps = [];
        for (const student of dbStudents.slice(0, 8)) { // 8 students will have RSVPs
            const numEvents = Math.floor(Math.random() * 4) + 1; // 1-4 events per student
            const selectedEvents = createdEvents
                .sort(() => 0.5 - Math.random())
                .slice(0, numEvents);

            for (const event of selectedEvents) {
                const statuses = ['attending', 'interested'];
                const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

                rsvps.push({
                    id: uuidv4(),
                    userId: student.id,
                    eventId: event.id,
                    status: randomStatus,
                    createdAt: new Date(),
                    updatedAt: new Date()
                });
            }
        }

        await RSVP.bulkCreate(rsvps, { ignoreDuplicates: true });

        // Create user stats with points for activities
        console.log('🏆 Creating user statistics...');
        const userStats = [];

        // Give organizers points for creating events
        for (const organizer of dbOrganizers) {
            const organizerEvents = createdEvents.filter(e => e.organizerId === organizer.id);
            const eventPoints = organizerEvents.length * 10; // 10 points per event created

            userStats.push({
                id: uuidv4(),
                userId: organizer.id,
                totalPoints: eventPoints + Math.floor(Math.random() * 20) + 5, // Extra random points
                eventsCreated: organizerEvents.length,
                eventsAttended: Math.floor(Math.random() * 3), // Organizers might attend other events
                profileComplete: true,
                createdAt: new Date(),
                updatedAt: new Date()
            });
        }

        // Give students points for attending events and profile completion
        for (const student of dbStudents) {
            const studentRSVPs = rsvps.filter(r => r.userId === student.id);
            const attendancePoints = studentRSVPs.length * 5; // 5 points per event attended
            const profilePoints = 5; // Profile completion bonus

            userStats.push({
                id: uuidv4(),
                userId: student.id,
                totalPoints: attendancePoints + profilePoints + Math.floor(Math.random() * 15),
                eventsCreated: 0,
                eventsAttended: studentRSVPs.length,
                profileComplete: true,
                createdAt: new Date(),
                updatedAt: new Date()
            });
        }

        await UserStats.bulkCreate(userStats, {
            ignoreDuplicates: true
        });

        console.log('✅ Seeding completed successfully!');
        return {
            studentsCreated: dbStudents.length,
            organizersCreated: dbOrganizers.length,
            eventsCreated: createdEvents.length,
            rsvpsCreated: rsvps.length,
            userStatsCreated: userStats.length,
            students: dbStudents.map(s => ({ name: `${s.firstName} ${s.lastName}`, email: s.email })),
            organizers: dbOrganizers.map(o => ({
                name: `${o.firstName} ${o.lastName}`,
                email: o.email,
                organization: o.organization,
                position: o.position
            })),
            events: createdEvents.map(e => ({
                title: e.title,
                category: e.category,
                startDate: e.startDate,
                organizer: dbOrganizers.find(o => o.id === e.organizerId) ?
                    `${dbOrganizers.find(o => o.id === e.organizerId).firstName} ${dbOrganizers.find(o => o.id === e.organizerId).lastName}` :
                    'Unknown'
            }))
        };
    } catch (error) {
        console.error('❌ Seeding failed:', error);
        throw error;
    }
}

module.exports = { seedUsersAndEvents };