// src/pages/SubmitEvent.js

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useState } from 'react';

const features = [
    {
        title: 'Reach 1000s of Students',
        description: 'Connect with engaged students across multiple campuses',
        icon: (
            <div className="flex items-center justify-center mb-6">
                <div className="w-12 h-12 rounded-full border-4 border-orange-400 flex items-center justify-center">
                    <div className="w-10 h-10 bg-transparent"></div>
                </div>
            </div>
        ),
    },
    {
        title: 'Track RSVPs Easily',
        description: 'Real-time analytics and attendee management',
        icon: (
            <div className="flex items-center justify-center mb-6">
                <div className="w-12 h-12 rounded-full border-4 border-orange-400 flex items-center justify-center">
                    <div className="w-10 h-10 bg-transparent"></div>
                </div>
            </div>
        ),
    },
    {
        title: 'Promote Scholarships',
        description: 'Help students find funding opportunities',
        icon: (
            <div className="flex items-center justify-center mb-6">
                <div className="w-12 h-12 rounded-full border-4 border-orange-400 flex items-center justify-center">
                    <div className="w-10 h-10 bg-transparent"></div>
                </div>
            </div>
        ),
    },
];

const SubmitEvent = () => {
    const [showForm, setShowForm] = useState(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowForm(false);
    };

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <Navbar />
            <main className="flex-1 flex flex-col items-center justify-center py-16 px-4">
                {showForm ? (
                    <div className="w-full max-w-lg rounded-3xl bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 p-10 shadow-lg">
                        <h1 className="text-blue-900 text-4xl font-bold mb-8 text-center">Organizer Application</h1>
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <label className="block text-gray-700 font-semibold mb-1">First Name</label>
                                    <input className="w-full border rounded px-4 py-2" required placeholder="John" />
                                </div>
                                <div className="flex-1">
                                    <label className="block text-gray-700 font-semibold mb-1">Last Name</label>
                                    <input className="w-full border rounded px-4 py-2" required placeholder="Style" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-gray-700 font-semibold mb-1">Email Address</label>
                                <input type="email" className="w-full border rounded px-4 py-2" required placeholder="John@university.edu" />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-semibold mb-1">Password</label>
                                <input type="password" className="w-full border rounded px-4 py-2" required placeholder="Create Secure Password" minLength={8} />
                                <span className="text-xs text-gray-500">8 Characters or longer with symbols</span>
                            </div>
                            <div>
                                <label className="block text-gray-700 font-semibold mb-1">Organization Name</label>
                                <input className="w-full border rounded px-4 py-2" required placeholder="Limkokwing University" />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-semibold mb-1">Your Role</label>
                                <input className="w-full border rounded px-4 py-2" required placeholder="Event Coordinator" />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-semibold mb-1">Phone Number (Optional)</label>
                                <input className="w-full border rounded px-4 py-2" placeholder="+855 12 34567" />
                            </div>
                            <div className="flex items-center gap-2">
                                <input type="checkbox" required className="form-checkbox h-5 w-5 text-blue-600" />
                                <span>I Agree To The <a href="#" className="text-blue-600 underline">Posting Guidelines</a> And Terms Of Service</span>
                            </div>
                            <div className="flex gap-4 mt-6">
                                <button type="button" className="bg-gray-200 text-gray-700 px-6 py-2 rounded font-semibold flex-1">Back</button>
                                <button type="submit" className="bg-orange-500 text-white px-6 py-2 rounded font-semibold flex-1">Create Account</button>
                            </div>
                        </form>
                    </div>
                ) : (
                    <div className="w-full max-w-lg rounded-3xl bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 p-10 shadow-lg flex flex-col items-center">
                        <h1 className="text-blue-900 text-4xl font-bold mb-6 text-center">Thanks For Joining</h1>
                        <div className="w-full bg-blue-200 rounded-xl p-6 mb-8">
                            <h2 className="text-xl font-semibold text-center mb-4">What happens next?</h2>
                            <ul className="list-disc pl-6 text-gray-700 text-base">
                                <li>We'll verify your organization</li>
                                <li>You'll receive a welcome email with login instructions</li>
                                <li>Start posting events and reaching students!</li>
                            </ul>
                        </div>
                        <button className="bg-orange-500 text-white px-8 py-3 rounded font-semibold text-lg">Preview Dashboard</button>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default SubmitEvent;
