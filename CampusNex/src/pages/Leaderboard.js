// src/pages/Leaderboard.js
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LeaderboardSection from '../components/LeaderboardSection';

const Leaderboard = () => (
    <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="flex-1">
            <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-orange-500 pt-24 pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                        🏆 Campus Leaderboard
                    </h1>
                    <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-8">
                        Celebrating our most active students and outstanding event organizers who make our campus community vibrant and engaging
                    </p>
                    <div className="flex flex-wrap justify-center gap-6 text-white">
                        <div className="flex items-center gap-2 bg-white bg-opacity-20 rounded-full px-6 py-3">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            <span className="font-semibold">Real-time Rankings</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white bg-opacity-20 rounded-full px-6 py-3">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                            </svg>
                            <span className="font-semibold">Achievement Rewards</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white bg-opacity-20 rounded-full px-6 py-3">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <span className="font-semibold">Community Impact</span>
                        </div>
                    </div>
                </div>
            </div>
            <LeaderboardSection />
        </main>
        <Footer />
    </div>
);

export default Leaderboard;
