// src/pages/Home/components/HeroSection.js
import React, { useState, useEffect } from 'react';
import PrimaryButton from '../../../components/PrimaryButton';
import { defaultEventImages } from '../../../data/mockEvents';

const SLIDE_INTERVAL = 5000; // 5 seconds

const HeroSection = ({ highlightedEvents, navigate }) => {
    const [activeSlide, setActiveSlide] = useState(0);

    /**
     * Auto-rotate carousel slides
     */
    useEffect(() => {
        const timer = setInterval(() => {
            if (highlightedEvents.length > 0) {
                setActiveSlide((prevSlide) =>
                    prevSlide === highlightedEvents.length - 1 ? 0 : prevSlide + 1
                );
            }
        }, SLIDE_INTERVAL);

        return () => clearInterval(timer);
    }, [highlightedEvents]);

    const goToSlide = (index) => {
        setActiveSlide(index);
    };

    const nextSlide = () => {
        setActiveSlide((prevSlide) =>
            prevSlide === highlightedEvents.length - 1 ? 0 : prevSlide + 1
        );
    };

    const prevSlide = () => {
        setActiveSlide((prevSlide) =>
            prevSlide === 0 ? highlightedEvents.length - 1 : prevSlide - 1
        );
    };

    if (!highlightedEvents.length) return null;

    return (
        <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left: Text Content */}
                    <div className="space-y-6">
                        <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight font-poppins">
                            Discover Amazing
                            <span className="text-blue-600 block">Campus Events</span>
                        </h1>
                        <p className="text-lg text-gray-600 leading-relaxed font-inter">
                            Connect with your community through exciting events, workshops, and activities.
                            From academic conferences to social gatherings, find your next adventure on campus.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <PrimaryButton
                                onClick={() => navigate('/discovery')}
                                className="text-lg px-8 py-3"
                            >
                                Explore Events
                            </PrimaryButton>
                            <button
                                onClick={() => navigate('/signup')}
                                className="text-lg px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
                            >
                                Join Community
                            </button>
                        </div>
                        <div className="flex items-center space-x-8 text-sm text-gray-500">
                            <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                <span>Live Events</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span>2,500+ Students</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span>100+ Events Monthly</span>
                            </div>
                        </div>
                    </div>

                    {/* Right: Event Carousel */}
                    <div className="relative">
                        <div className="relative h-96 bg-white rounded-2xl shadow-2xl overflow-hidden">
                            {/* Navigation arrows */}
                            <button
                                onClick={prevSlide}
                                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center transition-colors z-20 shadow-lg"
                                aria-label="Previous event"
                            >
                                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <button
                                onClick={nextSlide}
                                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center transition-colors z-20 shadow-lg"
                                aria-label="Next event"
                            >
                                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>

                            {/* Event slides */}
                            {highlightedEvents.map((event, index) => (
                                <div
                                    key={event.id}
                                    className={`absolute inset-0 transition-opacity duration-500 cursor-pointer ${index === activeSlide ? 'opacity-100' : 'opacity-0'
                                        }`}
                                    onClick={() => navigate(`/events/${event.id}`)}
                                >
                                    <img
                                        src={event.imageUrl}
                                        alt={event.title}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.src = defaultEventImages[0];
                                        }}
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                                        <h3 className="text-white text-xl font-semibold mb-1">{event.title}</h3>
                                        <p className="text-white/90 text-sm">
                                            {new Date(event.startDate || event.date).toLocaleDateString('en-US', {
                                                weekday: 'long',
                                                month: 'short',
                                                day: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                </div>
                            ))}

                            {/* Carousel dots */}
                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3 z-10">
                                {highlightedEvents.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            goToSlide(index);
                                        }}
                                        className={`w-3 h-3 rounded-full transition-colors duration-300 ${index === activeSlide ? 'bg-white' : 'bg-white/40'
                                            }`}
                                        aria-label={`Go to slide ${index + 1}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;