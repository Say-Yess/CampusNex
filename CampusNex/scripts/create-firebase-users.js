// Create Firebase Authentication test users
// Run this script to create test user accounts in Firebase Auth

const { initializeApp } = require('firebase/app');
const { getAuth, createUserWithEmailAndPassword, updateProfile } = require('firebase/auth');
const { getFirestore, doc, setDoc, serverTimestamp } = require('firebase/firestore');

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
const auth = getAuth(app);
const db = getFirestore(app);

// Test users data
const testUsers = [
    {
        email: 'student@campusnex.com',
        password: 'Student123!',
        firstName: 'Alex',
        lastName: 'Johnson',
        role: 'student',
        department: 'Computer Science',
        universityId: 'CS202501'
    },
    {
        email: 'organizer@campusnex.com',
        password: 'Organizer123!',
        firstName: 'John',
        lastName: 'Doe',
        role: 'organizer',
        department: 'Computer Science'
    },
    {
        email: 'admin@campusnex.com',
        password: 'Admin123!',
        firstName: 'Admin',
        lastName: 'User',
        role: 'admin',
        department: 'Administration'
    }
];

async function createTestUsers() {
    console.log('🔥 Creating Firebase Authentication test users...');

    for (const userData of testUsers) {
        try {
            console.log(`Creating user: ${userData.email}`);

            // Create user in Firebase Auth
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                userData.email,
                userData.password
            );
            const user = userCredential.user;

            // Update profile with name
            await updateProfile(user, {
                displayName: `${userData.firstName} ${userData.lastName}`
            });

            // Save additional user data to Firestore
            await setDoc(doc(db, 'users', user.uid), {
                email: userData.email,
                firstName: userData.firstName,
                lastName: userData.lastName,
                role: userData.role,
                department: userData.department,
                universityId: userData.universityId || null,
                createdAt: serverTimestamp()
            });

            console.log(`✅ Created user: ${userData.email} with role: ${userData.role}`);

        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                console.log(`⚠️  User ${userData.email} already exists`);
            } else {
                console.error(`❌ Failed to create user ${userData.email}:`, error.message);
            }
        }
    }

    console.log('\n🎉 Firebase user creation completed!');
    console.log('\n📋 Test Credentials:');
    console.log('Student: student@campusnex.com / Student123!');
    console.log('Organizer: organizer@campusnex.com / Organizer123!');
    console.log('Admin: admin@campusnex.com / Admin123!');

    process.exit(0);
}

createTestUsers().catch(console.error);