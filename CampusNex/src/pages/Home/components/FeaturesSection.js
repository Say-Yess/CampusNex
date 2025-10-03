// src/pages/Home/components/FeaturesSection.js
import React from 'react';

const features = [
    {
        icon: (
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
        ),
        title: 'Smart Discovery',
        description: 'AI-powered recommendations based on your interests, academic major, and past attendance. Never miss events that matter to you.',
        bgColor: 'bg-blue-100',
        hoverColor: 'group-hover:bg-blue-200'
    },
    {
        icon: (
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
        ),
        title: 'Seamless Integration',
        description: 'Sync with Google Calendar, receive smart notifications, and get reminders. Your schedule, perfectly organized.',
        bgColor: 'bg-green-100',
        hoverColor: 'group-hover:bg-green-200'
    },
    {
        icon: (
            <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
        ),
        title: 'Community Building',
        description: 'Connect with like-minded peers, build your professional network, and create meaningful relationships that last beyond graduation.',
        bgColor: 'bg-purple-100',
        hoverColor: 'group-hover:bg-purple-200'
    },
    {
        icon: (
            <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        ),
        title: 'Real-time Updates',
        description: 'Get instant notifications about event changes, new opportunities, and last-minute updates. Stay connected and informed.',
        bgColor: 'bg-orange-100',
        hoverColor: 'group-hover:bg-orange-200'
    },
    {
        icon: (
            <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
        ),
        title: 'Easy Organization',
        description: 'Create and manage events effortlessly with our intuitive tools. Track RSVPs, send updates, and analyze attendance.',
        bgColor: 'bg-indigo-100',
        hoverColor: 'group-hover:bg-indigo-200'
    },
    {
        icon: (
            <svg className="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
        ),
        title: 'Personalized Experience',
        description: 'Tailored recommendations, custom preferences, and personalized dashboard. Make CampusNex truly yours.',
        bgColor: 'bg-pink-100',
        hoverColor: 'group-hover:bg-pink-200'
    }
];

const FeaturesSection = () => {
    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 font-poppins">
                        Why Choose CampusNex?
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto font-inter">
                        Designed specifically for university students, by students. Experience the most
                        intuitive way to discover, join, and organize campus events.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="text-center group">
                            <div className={`w-16 h-16 ${feature.bgColor} rounded-xl flex items-center justify-center mx-auto mb-6 ${feature.hoverColor} transition-colors`}>
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3 font-poppins">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 font-inter">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;