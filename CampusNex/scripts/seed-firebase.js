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

// Phnom Penh focused events data
const sampleEvents = [
    {
        title: 'Angkor Wat Sunrise Photography Workshop',
        description: 'Capture the magical sunrise over Angkor Wat with professional photographers. Learn advanced techniques while experiencing one of the world\'s most beautiful sunrises.',
        category: 'Photography',
        location: 'Angkor Archaeological Park, Siem Reap',
        startDate: new Date('2025-10-15T05:00:00'),
        endDate: new Date('2025-10-15T08:00:00'),
        imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop',
        capacity: 25,
        featured: true,
        organizerId: 'admin',
        createdAt: serverTimestamp(),
        RSVPs: []
    },
    {
        title: 'Cambodia Tech Startup Pitch Night',
        description: 'Local entrepreneurs pitch their innovative solutions to transform Cambodia. Network with investors, mentors, and fellow startup enthusiasts in Phnom Penh.',
        category: 'Business & Networking',
        location: 'Smart Axiata Digital Innovation Hub, Phnom Penh',
        startDate: new Date('2025-10-20T18:00:00'),
        endDate: new Date('2025-10-20T22:00:00'),
        imageUrl: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=2070&auto=format&fit=crop',
        capacity: 100,
        featured: true,
        organizerId: 'admin',
        createdAt: serverTimestamp(),
        RSVPs: []
    },
    {
        title: 'Traditional Khmer Cooking Masterclass',
        description: 'Learn to cook authentic Cambodian dishes like Fish Amok, Beef Lok Lak, and Nom Banh Chok from master chefs in Siem Reap.',
        category: 'Food & Drinks',
        location: 'Frizz Restaurant, Siem Reap',
        startDate: new Date('2025-10-25T14:00:00'),
        endDate: new Date('2025-10-25T18:00:00'),
        imageUrl: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2069&auto=format&fit=crop',
        capacity: 20,
        featured: false,
        organizerId: 'admin',
        createdAt: serverTimestamp(),
        RSVPs: []
    },
    {
        title: 'Royal Palace Evening Concert',
        description: 'Experience classical Khmer music and traditional Apsara dance performance in the magical setting of the Royal Palace Gardens.',
        category: 'Performing Arts',
        location: 'Royal Palace Gardens, Phnom Penh',
        startDate: new Date('2025-11-01T19:00:00'),
        endDate: new Date('2025-11-01T21:00:00'),
        imageUrl: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?q=80&w=2070&auto=format&fit=crop',
        capacity: 150,
        featured: true,
        organizerId: 'admin',
        createdAt: serverTimestamp(),
        RSVPs: []
    },
    {
        title: 'Mekong River Sunset Cruise',
        description: 'Enjoy breathtaking sunset views along the Mekong River with traditional music, local snacks, and cultural storytelling.',
        category: 'Sports & Outdoors',
        location: 'Sisowath Quay, Phnom Penh',
        startDate: new Date('2025-11-05T17:00:00'),
        endDate: new Date('2025-11-05T19:30:00'),
        imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop',
        capacity: 60,
        featured: false,
        organizerId: 'admin',
        createdAt: serverTimestamp(),
        RSVPs: []
    },
    {
        title: 'Cambodian Art & Craft Workshop',
        description: 'Learn traditional Cambodian arts including stone carving, silk weaving, and silver crafting with local artisans.',
        category: 'Workshops, Conferences & Classes',
        location: 'Artisans Angkor, Siem Reap',
        startDate: new Date('2025-11-08T09:00:00'),
        endDate: new Date('2025-11-08T16:00:00'),
        imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=2070&auto=format&fit=crop',
        capacity: 30,
        featured: false,
        organizerId: 'admin',
        createdAt: serverTimestamp(),
        RSVPs: []
    },
    {
        title: 'Phnom Penh Street Food Festival',
        description: 'Discover the incredible flavors of Cambodian street food with vendors from across the city. From Num Pang to fresh tropical fruits!',
        category: 'Festivals & Lifestyle',
        location: 'Wat Phnom Park, Phnom Penh',
        startDate: new Date('2025-11-12T16:00:00'),
        endDate: new Date('2025-11-12T22:00:00'),
        imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2070&auto=format&fit=crop',
        capacity: 500,
        featured: true,
        organizerId: 'admin',
        createdAt: serverTimestamp(),
        RSVPs: []
    },
    {
        title: 'Banteay Srei Temple Architecture Tour',
        description: 'Explore the intricate pink sandstone carvings of the "Citadel of Women" with expert archaeologists and historians.',
        category: 'Exhibitions',
        location: 'Banteay Srei Temple, Siem Reap',
        startDate: new Date('2025-11-15T08:00:00'),
        endDate: new Date('2025-11-15T12:00:00'),
        imageUrl: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?q=80&w=2070&auto=format&fit=crop',
        capacity: 40,
        featured: false,
        organizerId: 'admin',
        createdAt: serverTimestamp(),
        RSVPs: []
    },
    {
        title: 'Cambodian Independence Day Celebration',
        description: 'Join the festive celebration of Cambodia\'s Independence Day with parades, traditional performances, and fireworks.',
        category: 'Festivals & Lifestyle',
        location: 'Independence Monument, Phnom Penh',
        startDate: new Date('2025-11-09T14:00:00'),
        endDate: new Date('2025-11-09T20:00:00'),
        imageUrl: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=2070&auto=format&fit=crop',
        capacity: 1000,
        featured: true,
        organizerId: 'admin',
        createdAt: serverTimestamp(),
        RSVPs: []
    },
    {
        title: 'Tonle Sap Floating Village Experience',
        description: 'Visit the remarkable floating villages of Tonle Sap Lake and learn about the unique lifestyle of the lake communities.',
        category: 'Sports & Outdoors',
        location: 'Kompong Phluk, Siem Reap',
        startDate: new Date('2025-11-18T07:00:00'),
        endDate: new Date('2025-11-18T15:00:00'),
        imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af2ac1?q=80&w=2070&auto=format&fit=crop',
        capacity: 35,
        featured: false,
        organizerId: 'admin',
        createdAt: serverTimestamp(),
        RSVPs: []
    },
    {
        title: 'Phnom Penh Night Market & Food Tour',
        description: 'Explore the vibrant night markets of Phnom Penh, taste local delicacies, and shop for unique Cambodian handicrafts.',
        category: 'Food & Drinks',
        location: 'Central Market to Russian Market, Phnom Penh',
        startDate: new Date('2025-11-22T18:00:00'),
        endDate: new Date('2025-11-22T22:00:00'),
        imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop',
        capacity: 25,
        featured: false,
        organizerId: 'admin',
        createdAt: serverTimestamp(),
        RSVPs: []
    },
    {
        title: 'Cambodian Traditional Dance Workshop',
        description: 'Learn the graceful movements of classical Khmer dance from professional dancers at the Royal University of Fine Arts.',
        category: 'Performing Arts',
        location: 'Royal University of Fine Arts, Phnom Penh',
        startDate: new Date('2025-11-25T10:00:00'),
        endDate: new Date('2025-11-25T16:00:00'),
        imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=2070&auto=format&fit=crop',
        capacity: 30,
        featured: false,
        organizerId: 'admin',
        createdAt: serverTimestamp(),
        RSVPs: []
    },
    {
        title: 'Cambodia Digital Innovation Summit',
        description: 'Discover how technology is transforming Cambodia. Meet tech leaders, learn about digital initiatives, and network with innovators.',
        category: 'Business & Networking',
        location: 'Sokha Phnom Penh Hotel, Phnom Penh',
        startDate: new Date('2025-11-28T08:30:00'),
        endDate: new Date('2025-11-28T17:00:00'),
        imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop',
        capacity: 200,
        featured: true,
        organizerId: 'admin',
        createdAt: serverTimestamp(),
        RSVPs: []
    },
    {
        title: 'Bayon Temple Sunrise Meditation',
        description: 'Experience spiritual tranquility with guided meditation at the iconic Bayon Temple as the sun rises over Angkor Thom.',
        category: 'Workshops, Conferences & Classes',
        location: 'Bayon Temple, Angkor Thom, Siem Reap',
        startDate: new Date('2025-12-01T05:30:00'),
        endDate: new Date('2025-12-01T07:30:00'),
        imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop',
        capacity: 20,
        featured: false,
        organizerId: 'admin',
        createdAt: serverTimestamp(),
        RSVPs: []
    },
    {
        title: 'Cambodian Coffee Culture Experience',
        description: 'Discover Cambodia\'s growing coffee culture. Visit local plantations, learn brewing techniques, and taste unique Cambodian coffee varieties.',
        category: 'Food & Drinks',
        location: 'Brown Coffee & Bakery, Phnom Penh',
        startDate: new Date('2025-12-05T09:00:00'),
        endDate: new Date('2025-12-05T12:00:00'),
        imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070&auto=format&fit=crop',
        capacity: 25,
        featured: false,
        organizerId: 'admin',
        createdAt: serverTimestamp(),
        RSVPs: []
    },
    {
        title: 'Silk Island Bicycle Adventure',
        description: 'Cycle through the peaceful Silk Island, visit silk weaving villages, and enjoy a traditional lunch with local families.',
        category: 'Sports & Outdoors',
        location: 'Koh Dach (Silk Island), Phnom Penh',
        startDate: new Date('2025-12-08T08:00:00'),
        endDate: new Date('2025-12-08T16:00:00'),
        imageUrl: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?q=80&w=2070&auto=format&fit=crop',
        capacity: 15,
        featured: false,
        organizerId: 'admin',
        createdAt: serverTimestamp(),
        RSVPs: []
    },
    {
        title: 'Cambodian Film Festival Screening',
        description: 'Watch award-winning Cambodian films and documentaries, followed by discussions with local filmmakers and critics.',
        category: 'Festivals & Lifestyle',
        location: 'Institut français du Cambodge, Phnom Penh',
        startDate: new Date('2025-12-12T19:00:00'),
        endDate: new Date('2025-12-12T22:00:00'),
        imageUrl: 'https://images.unsplash.com/photo-1489599808821-bd0d4e61bc21?q=80&w=2070&auto=format&fit=crop',
        capacity: 80,
        featured: false,
        organizerId: 'admin',
        createdAt: serverTimestamp(),
        RSVPs: []
    },
    {
        title: 'Tuol Sleng & S21 Historical Learning Tour',
        description: 'A respectful educational tour learning about Cambodia\'s history, promoting peace and understanding for future generations.',
        category: 'Exhibitions',
        location: 'Tuol Sleng Genocide Museum, Phnom Penh',
        startDate: new Date('2025-12-15T09:00:00'),
        endDate: new Date('2025-12-15T12:00:00'),
        imageUrl: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?q=80&w=2070&auto=format&fit=crop',
        capacity: 30,
        featured: false,
        organizerId: 'admin',
        createdAt: serverTimestamp(),
        RSVPs: []
    },
    {
        title: 'Cambodian New Year Water Festival',
        description: 'Celebrate Bon Om Touk (Water Festival) with dragon boat races, traditional games, and festive celebrations along the riverfront.',
        category: 'Festivals & Lifestyle',
        location: 'Sisowath Quay Riverfront, Phnom Penh',
        startDate: new Date('2025-12-18T10:00:00'),
        endDate: new Date('2025-12-18T22:00:00'),
        imageUrl: 'https://images.unsplash.com/photo-1496147192622-7ad46b92b5b8?q=80&w=2070&auto=format&fit=crop',
        capacity: 2000,
        featured: true,
        organizerId: 'admin',
        createdAt: serverTimestamp(),
        RSVPs: []
    },
    {
        title: 'Ta Prohm Temple Photography Expedition',
        description: 'Capture the mystical beauty of Ta Prohm temple, famous for ancient trees growing through ruins. Professional photography guidance included.',
        category: 'Photography',
        location: 'Ta Prohm Temple, Angkor Archaeological Park',
        startDate: new Date('2025-12-22T14:00:00'),
        endDate: new Date('2025-12-22T17:00:00'),
        imageUrl: 'https://images.unsplash.com/photo-1617469851115-fd8dff64a495?q=80&w=2070&auto=format&fit=crop',
        capacity: 20,
        featured: false,
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