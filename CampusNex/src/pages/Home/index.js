// src/pages/Home/index.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import StatisticsSection from './components/StatisticsSection';
import CategoriesSection from './components/CategoriesSection';
import { useHomeData } from './hooks/useHomeData';

/**
 * Home Page Component
 * 
 * Features:
 * - Hero section with event carousel
 * - Features showcase
 * - Statistics display
 * - Category exploration
 * 
 * @author CampusNex Team
 * @version 2.0 - Refactored into smaller components
 */
const Home = () => {
    const navigate = useNavigate();
    const { highlightedEvents, loading } = useHomeData();

    if (loading) {
        return (
            <div className="min-h-screen bg-white">
                <Navbar />
                <div className="flex items-center justify-center h-96">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <p className="text-gray-600">Loading amazing events...</p>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            <HeroSection
                highlightedEvents={highlightedEvents}
                navigate={navigate}
            />

            <FeaturesSection />

            <StatisticsSection />

            <CategoriesSection navigate={navigate} />

            {/* Call to Action Section */}
            <section className="py-16 bg-blue-600">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6 font-poppins">
                        Ready to Get Started?
                    </h2>
                    <p className="text-xl text-blue-100 mb-8 font-inter">
                        Join thousands of students who are already discovering amazing events and building meaningful connections.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={() => navigate('/signup')}
                            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                        >
                            Create Account
                        </button>
                        <button
                            onClick={() => navigate('/discovery')}
                            className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
                        >
                            Browse Events
                        </button>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Home;