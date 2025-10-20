// src/pages/About.js

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const faqs = [
    {
        question: 'What is CampusNex?',
        answer: 'CampusNex is a platform for discovering and managing educational and professional events for Cambodian university students, parents, and organizers.'
    },
    {
        question: 'How do I join as an organizer?',
        answer: 'Sign up as an organizer and fill out the organizer application form. Once approved, you can post events.'
    },
    {
        question: 'How do I RSVP for an event?',
        answer: 'Browse events, swipe to RSVP, and sync with your Google Calendar.'
    },
];

const About = () => (
    <div className="min-h-screen bg-white flex flex-col">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center pt-24 pb-16 px-4">
            <div className="w-full max-w-3xl rounded-3xl bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 p-10 shadow-lg">
                <h1 className="text-blue-900 text-4xl font-bold mb-8 text-center">About CampusNex</h1>
                <p className="text-lg text-gray-700 mb-8 text-center">CampusNex centralizes opportunities, events, and resources for students and organizers. Our mission is to make discovery, RSVP, and event management easy and accessible.</p>
                <h2 className="text-2xl font-bold text-blue-900 mb-6">Frequently Asked Questions</h2>
                <div className="space-y-6">
                    {faqs.map((faq, idx) => (
                        <div key={idx} className="bg-white rounded-xl p-6 shadow">
                            <div className="text-xl font-semibold text-blue-900 mb-2">{faq.question}</div>
                            <div className="text-gray-700 text-base">{faq.answer}</div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
        <Footer />
    </div>
);

export default About;
