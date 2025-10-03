// src/pages/Home/components/StatisticsSection.js
import React from 'react';

const statistics = [
    {
        number: '2,500+',
        label: 'Active Students',
        description: 'Engaged community members'
    },
    {
        number: '150+',
        label: 'Events Monthly',
        description: 'Diverse opportunities'
    },
    {
        number: '95%',
        label: 'Satisfaction Rate',
        description: 'Happy participants'
    },
    {
        number: '50+',
        label: 'Partner Organizations',
        description: 'Collaborative network'
    }
];

const StatisticsSection = () => {
    return (
        <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 font-poppins">
                        Join the Movement
                    </h2>
                    <p className="text-xl text-blue-100 max-w-3xl mx-auto font-inter">
                        Thousands of students are already discovering amazing opportunities through CampusNex
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {statistics.map((stat, index) => (
                        <div key={index} className="text-center">
                            <div className="text-4xl lg:text-5xl font-bold text-white mb-2 font-poppins">
                                {stat.number}
                            </div>
                            <div className="text-lg font-semibold text-blue-100 mb-1">
                                {stat.label}
                            </div>
                            <div className="text-blue-200 text-sm">
                                {stat.description}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <div className="inline-flex items-center space-x-2 text-blue-100">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-sm">Growing every day</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StatisticsSection;