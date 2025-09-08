// src/services/firestoreSeed.js
// Utility to seed Firestore with sample collections and data for CampusNex

import { db } from './firebase';
import { collection, addDoc } from 'firebase/firestore';

export async function seedFirestore() {
  // Sample events
  const events = [
    {
      title: 'Tech Conference 2025',
      date: '2025-12-18',
      location: 'Limkokwing University',
      description: 'A conference for tech enthusiasts and students.',
      category: 'Technology',
      capacity: 200
    },
    {
      title: 'Career Fair',
      date: '2025-12-20',
      location: 'RUPP',
      description: 'Meet top employers and discover career opportunities.',
      category: 'Career',
      capacity: 300
    },
    {
      title: 'Design Thinking Workshop',
      date: '2025-11-10',
      location: 'Institute of Technology Cambodia',
      description: 'Learn creative problem-solving and design thinking skills.',
      category: 'Workshop',
      capacity: 50
    },
    {
      title: 'Startup Pitch Night',
      date: '2025-12-25',
      location: 'Cambodia-Japan Cooperation Center',
      description: 'Pitch your startup idea to investors and win prizes.',
      category: 'Entrepreneurship',
      capacity: 100
    },
    {
      title: 'English Language Seminar',
      date: '2025-10-05',
      location: 'Pannasastra University',
      description: 'Improve your English skills for academic and career success.',
      category: 'Seminar',
      capacity: 80
    },
    {
      title: 'Coding Bootcamp',
      date: '2025-09-20',
      location: 'National Polytechnic Institute',
      description: 'Intensive coding bootcamp for beginners and intermediates.',
      category: 'Technology',
      capacity: 120
    },
    {
      title: 'Art Exhibition',
      date: '2025-11-15',
      location: 'Royal University of Fine Arts',
      description: 'Showcase of student art and creative projects.',
      category: 'Art',
      capacity: 60
    },
    {
      title: 'Business Networking Night',
      date: '2025-12-01',
      location: 'Cambodia Business School',
      description: 'Connect with business leaders and entrepreneurs.',
      category: 'Networking',
      capacity: 150
    },
    {
      title: 'Robotics Competition',
      date: '2025-10-30',
      location: 'Institute of Technology Cambodia',
      description: 'Compete in robotics challenges and win awards.',
      category: 'Competition',
      capacity: 90
    },
    {
      title: 'Medical Career Day',
      date: '2025-09-25',
      location: 'University of Health Sciences',
      description: 'Explore medical careers and meet professionals.',
      category: 'Career',
      capacity: 100
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
      role: 'student',
      RSVPs: []
    },
    {
      name: 'Vannak',
      email: 'vannak@organizer.edu',
      role: 'organizer',
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
