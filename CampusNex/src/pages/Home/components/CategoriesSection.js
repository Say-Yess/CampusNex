// src/pages/Home/components/CategoriesSection.js
import React from 'react';
import { eventCategories } from '../../../data/categories';

const CategoriesSection = ({ navigate }) => {
    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 font-poppins">
                        Explore Categories
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto font-inter">
                        Find events that match your interests and academic goals
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {eventCategories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => navigate('/discovery')}
                            className={`${category.color} rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 group border-2 border-transparent hover:border-gray-200`}
                        >
                            <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">
                                {category.icon}
                            </div>
                            <h3 className="font-semibold text-gray-900 group-hover:text-gray-800">
                                {category.name}
                            </h3>
                        </button>
                    ))}
                </div>

                <div className="text-center mt-8">
                    <button
                        onClick={() => navigate('/discovery')}
                        className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center space-x-2 transition-colors"
                    >
                        <span>View All Categories</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default CategoriesSection;