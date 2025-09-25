// src/services/firestoreSeed.js
// Utility to seed Firestore with sample collections and data for CampusNex

import { db } from './firebase';
import { collection, addDoc, doc, setDoc } from 'firebase/firestore';

export async function seedFirestore() {
  // Sample events
  const events = [
    {
      title: 'Tech Conference 2025',
      date: '2025-12-18',
      location: 'Limkokwing University',
      description: 'A conference for tech enthusiasts and students.',
      category: 'Technology',
      capacity: 200,
      imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop',
      featured: true
    },
    {
      title: 'Career Fair',
      date: '2025-12-20',
      location: 'RUPP',
      description: 'Meet top employers and discover career opportunities.',
      category: 'Career',
      capacity: 300,
      imageUrl: 'https://images.unsplash.com/photo-1551818255-e6e10975bc17?q=80&w=2073&auto=format&fit=crop',
      featured: false
    },
    {
      title: 'Design Thinking Workshop',
      date: '2025-11-10',
      location: 'Institute of Technology Cambodia',
      description: 'Learn creative problem-solving and design thinking skills.',
      category: 'Workshop',
      capacity: 50,
      imageUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop',
      featured: false
    },
    {
      title: 'Startup Pitch Night',
      date: '2025-12-25',
      location: 'Cambodia-Japan Cooperation Center',
      description: 'Pitch your startup idea to investors and win prizes.',
      category: 'Entrepreneurship',
      capacity: 100,
      imageUrl: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=2070&auto=format&fit=crop',
      featured: true
    },
    {
      title: 'English Language Seminar',
      date: '2025-10-05',
      location: 'Pannasastra University',
      description: 'Improve your English skills for academic and career success.',
      category: 'Seminar',
      capacity: 80,
      imageUrl: null,
      featured: false
    },
    {
      title: 'Coding Bootcamp',
      date: '2025-09-20',
      location: 'National Polytechnic Institute',
      description: 'Intensive coding bootcamp for beginners and intermediates.',
      category: 'Technology',
      capacity: 120,
      imageUrl: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2069&auto=format&fit=crop',
      featured: true
    },
    {
      title: 'Art Exhibition',
      date: '2025-11-15',
      location: 'Royal University of Fine Arts',
      description: 'Showcase of student art and creative projects.',
      category: 'Art',
      capacity: 60,
      imageUrl: null,
      featured: false
    },
    {
      title: 'Business Networking Night',
      date: '2025-12-01',
      location: 'Cambodia Business School',
      description: 'Connect with business leaders and entrepreneurs.',
      category: 'Networking',
      capacity: 150,
      imageUrl: null,
      featured: false
    },
    {
      title: 'Robotics Competition',
      date: '2025-10-30',
      location: 'Institute of Technology Cambodia',
      description: 'Compete in robotics challenges and win awards.',
      category: 'Competition',
      capacity: 90,
      imageUrl: null,
      featured: false
    },
    {
      title: 'Medical Career Day',
      date: '2025-09-25',
      location: 'University of Health Sciences',
      description: 'Explore medical careers and meet professionals.',
      category: 'Career',
      capacity: 100,
      imageUrl: null,
      featured: false
    }
  ];

  // Add events to Firestore
  for (const event of events) {
    await addDoc(collection(db, 'events'), event);
  }

  // Sample users
  const users = [
    {
      name: 'Sokha',
      email: 'sokha@student.edu',
      password: 'password123', // In a real app, this would be hashed
      role: 'student',
      firstName: 'Sokha',
      lastName: 'Student',
      major: 'Computer Science',
      yearOfStudy: '3rd Year',
      bio: 'Passionate about technology and coding.',
      RSVPs: []
    },
    {
      name: 'Vannak',
      email: 'vannak@organizer.edu',
      password: 'password123', // In a real app, this would be hashed
      role: 'organizer',
      firstName: 'Vannak',
      lastName: 'Organizer',
      department: 'Student Activities',
      bio: 'Coordinating events for student engagement.',
      RSVPs: []
    },
    {
      name: 'Admin',
      email: 'admin@campus.edu',
      password: 'admin123', // In a real app, this would be hashed
      role: 'admin',
      firstName: 'Admin',
      lastName: 'User',
      RSVPs: []
    }
  ];

  for (const user of users) {
    await addDoc(collection(db, 'users'), user);
  }

  // Sample submissions
  const submissions = [
    {
      title: 'Startup Pitch Night',
      date: '2025-12-25',
      location: 'Cambodia-Japan Cooperation Center',
      description: 'Pitch your startup idea to investors.',
      category: 'Entrepreneurship',
      capacity: 100,
      status: 'pending'
    }
  ];

  for (const submission of submissions) {
    await addDoc(collection(db, 'submissions'), submission);
  }

  console.log('Firestore seeded with sample data.');
}
