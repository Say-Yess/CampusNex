// src/pages/Home.js
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PrimaryButton from '../components/PrimaryButton';

const Home = () => (
    <div className="min-h-screen bg-white flex flex-col">
        <Navbar />

        {/* Hero Section */}
        <section className="flex flex-col-reverse md:flex-row items-center justify-between px-4 sm:px-8 md:px-12 lg:px-20 py-8 md:py-16 flex-1 w-full max-w-7xl mx-auto">
            {/* Left: Text */}
            <div className="w-full md:w-1/2 max-w-xl text-center md:text-left mt-8 md:mt-0">
                <h1 className="text-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold font-inter capitalize mb-6 md:mb-8 leading-tight">Discover your opportunity with us</h1>
                <p className="text-black text-lg sm:text-xl md:text-2xl font-inter font-normal capitalize mb-6 md:mb-8 leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vestibulum rhoncus nibh. Quisque viverra est vitae nibh commodo gravida.</p>
                <div className="flex justify-center md:justify-start">
                    <PrimaryButton>discovery</PrimaryButton>
                </div>
            </div>
            {/* Right: Image/Mockup */}
            <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg aspect-square bg-gray-400 rounded-3xl flex items-center justify-center mx-auto">
                <span className="text-white text-lg sm:text-xl md:text-2xl font-inter font-normal capitalize">Event image or competition</span>
                {/* Carousel dots */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3">
                    <span className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 bg-black rounded-full inline-block"></span>
                    <span className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 bg-gray-600 rounded-full inline-block"></span>
                    <span className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 bg-gray-600 rounded-full inline-block"></span>
                </div>
            </div>
        </section>

        <Footer />
    </div>
);

export default Home;
