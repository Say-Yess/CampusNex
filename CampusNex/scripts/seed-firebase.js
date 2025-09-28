// Firebase Database Seeder for CampusNex
// Run this file to populate your Firebase database with initial events

const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, serverTimestamp } = require('firebase/firestore');

const firebaseConfig = {
    apiKey: "AIzaSyBG-rov_gOD4JCIZ0xyiPkZ-GSPRIbQvfk",
    authDomain: "campusnex-37b2b.firebaseapp.com",
    projectId: "campusnex-37b2b",
    storageBucket: "campusnex-37b2b.firebasestorage.app",
    messagingSenderId: "399142959452",
    appId: "1:399142959452:web:dfcc9ecff25f7889866999",
    measurementId: "G-0X1F4CHP7D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Sample events data
const sampleEvents = [
    {
        title: 'Tech Conference 2025',
        description: 'Join us for the biggest tech conference of the year! Learn about the latest trends in AI, machine learning, and web development from industry experts. This conference will feature keynote speeches from tech leaders, hands-on workshops, networking sessions, and exhibitions from top tech companies.',
        category: 'Technology',
        location: 'San Francisco Convention Center',
        startDate: new Date('2025-10-15T09:00:00'),
        endDate: new Date('2025-10-15T17:00:00'),
        imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop',
        capacity: 500,
        featured: true,
        organizerId: 'admin',
        createdAt: serverTimestamp(),
        RSVPs: []
    },
    {
        title: 'Startup Weekend',
        description: 'A 54-hour weekend event where entrepreneurs, developers, designers, and business people come together to build amazing startups. Form teams, validate ideas, and pitch your startup to a panel of judges.',
        category: 'Business',
        location: 'Innovation Hub',
        startDate: new Date('2025-10-20T18:00:00'),
        endDate: new Date('2025-10-22T20:00:00'),
        imageUrl: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=2070&auto=format&fit=crop',
        capacity: 100,
        featured: true,
        organizerId: 'admin',
        createdAt: serverTimestamp(),
        RSVPs: []
    },
    {
        title: 'AI Workshop: Building Chatbots',
        description: 'Learn how to build intelligent chatbots using modern AI technologies. This hands-on workshop covers natural language processing, machine learning models, and practical implementation.',
        category: 'Technology',
        location: 'University Tech Lab',
        startDate: new Date('2025-10-25T14:00:00'),
        endDate: new Date('2025-10-25T18:00:00'),
        imageUrl: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2069&auto=format&fit=crop',
        capacity: 50,
        featured: false,
        organizerId: 'admin',
        createdAt: serverTimestamp(),
        RSVPs: []
    },
    {
        title: 'Digital Marketing Masterclass',
        description: 'Master the art of digital marketing with hands-on workshops covering SEO, social media, content marketing, and analytics.',
        category: 'Marketing',
        location: 'Business Center Downtown',
        startDate: new Date('2025-11-01T10:00:00'),
        endDate: new Date('2025-11-01T16:00:00'),
        imageUrl: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?q=80&w=2070&auto=format&fit=crop',
        capacity: 75,
        featured: false,
        organizerId: 'admin',
        createdAt: serverTimestamp(),
        RSVPs: []
    },
    {
        title: 'Career Fair 2025',
        description: 'Connect with top employers and discover amazing career opportunities across various industries. Bring your resume!',
        category: 'Career',
        location: 'Campus Main Hall',
        startDate: new Date('2025-11-05T09:00:00'),
        endDate: new Date('2025-11-05T15:00:00'),
        imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop',
        capacity: 200,
        featured: true,
        organizerId: 'admin',
        createdAt: serverTimestamp(),
        RSVPs: []
    }
];

// Function to seed the database
async function seedDatabase() {
    try {
        console.log('🌱 Starting database seeding...');

        console.log('🔍 Testing Firestore connection...');

        for (let i = 0; i < sampleEvents.length; i++) {
            const eventData = sampleEvents[i];
            console.log(`📝 Adding event ${i + 1}/${sampleEvents.length}: "${eventData.title}"`);

            const docRef = await addDoc(collection(db, 'events'), eventData);
            console.log(`✅ Event "${eventData.title}" added with ID: ${docRef.id}`);
        }

        console.log('🎉 Database seeding completed successfully!');
        console.log(`📊 Added ${sampleEvents.length} events to the database.`);
        console.log('🔗 Check your Firebase Console: https://console.firebase.google.com/project/campusnex-37b2b/firestore');

    } catch (error) {
        console.error('❌ Error seeding database:', error);
        console.log('\n🔧 Troubleshooting:');
        console.log('1. Make sure Firestore Database is enabled in Firebase Console');
        console.log('2. Check that your Firebase project ID is correct');
        console.log('3. Ensure you have proper permissions');
        console.log('4. Visit: https://console.firebase.google.com/project/campusnex-37b2b/firestore');

        if (error.code === 'permission-denied') {
            console.log('❗ Permission denied - Update your Firestore security rules');
        }
        if (error.code === 'not-found') {
            console.log('❗ Database not found - Enable Firestore Database in Firebase Console');
        }
    }
}

// Run the seeder
console.log('🚀 CampusNex Database Seeder');
console.log('='.repeat(40));
seedDatabase();