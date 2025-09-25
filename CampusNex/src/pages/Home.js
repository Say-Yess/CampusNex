// src/pages/Home.js
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import { useNavigate } from 'react-router-dom';
import PrimaryButton from '../components/PrimaryButton';
import { eventsAPI } from '../services/api';

const Home = () => {
    const navigate = useNavigate();
    const [highlightedEvents, setHighlightedEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeSlide, setActiveSlide] = useState(0);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHighlightedEvents = async () => {
            try {
                setLoading(true);
                const response = await eventsAPI.getAllEvents();

                // Filter for featured/highlighted events and take the first 3
                // Ideally, we would have a dedicated API endpoint for featured events
                // This implementation assumes events have a 'featured' flag or sorts by popularity
                let eventsWithImages = response.events
                    .filter(event => event.imageUrl)
                    .slice(0, 3);

                // If we don't have enough events with images, add some with default images
                if (eventsWithImages.length < 3) {
                    // Get all events without images
                    const eventsWithoutImages = response.events
                        .filter(event => !event.imageUrl)
                        .slice(0, 3 - eventsWithImages.length);

                    // Add default images to them
                    const defaultImageUrls = [
                        'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop',
                        'https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=2070&auto=format&fit=crop',
                        'https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2069&auto=format&fit=crop'
                    ];

                    eventsWithoutImages.forEach((event, index) => {
                        event.imageUrl = defaultImageUrls[index % defaultImageUrls.length];
                    });

                    eventsWithImages = [...eventsWithImages, ...eventsWithoutImages];
                }

                setHighlightedEvents(eventsWithImages);
            } catch (err) {
                console.error('Failed to fetch highlighted events:', err);
                setError('Failed to load events');
                // Set some default events for display if API fails
                setHighlightedEvents([
                    {
                        id: 1,
                        title: 'Tech Conference 2025',
                        imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop'
                    },
                    {
                        id: 2,
                        title: 'Startup Weekend',
                        imageUrl: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=2070&auto=format&fit=crop'
                    },
                    {
                        id: 3,
                        title: 'AI Workshop',
                        imageUrl: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2069&auto=format&fit=crop'
                    }
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchHighlightedEvents();
    }, []);

    // Function to change slides
    const goToSlide = (index) => {
        setActiveSlide(index);
    };

    // Auto rotate slides every 5 seconds
    useEffect(() => {
        const timer = setInterval(() => {
            if (highlightedEvents.length > 0) {
                setActiveSlide((prevSlide) =>
                    prevSlide === highlightedEvents.length - 1 ? 0 : prevSlide + 1
                );
            }
        }, 5000);

        return () => clearInterval(timer);
    }, [highlightedEvents]);

    // Navigate to event details when clicked
    const handleEventClick = (eventId) => {
        navigate(`/events/${eventId}`);
    };

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <Navbar />

            {/* Hero Section */}
            <section className="flex flex-col-reverse md:flex-row items-center justify-between px-4 sm:px-8 md:px-12 lg:px-20 py-8 md:py-16 flex-1 w-full max-w-7xl mx-auto">
                {/* Left: Text */}
                <div className="w-full md:w-1/2 max-w-xl text-center md:text-left mt-8 md:mt-0">
                    <h1 className="text-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold font-inter capitalize mb-6 md:mb-8 leading-tight">Discover your opportunity with us</h1>
                    <p className="text-black text-lg sm:text-xl md:text-2xl font-inter font-normal capitalize mb-6 md:mb-8 leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vestibulum rhoncus nibh. Quisque viverra est vitae nibh commodo gravida.</p>
                    <div className="flex justify-center md:justify-start">
                        <PrimaryButton onClick={() => navigate('/discovery')}>Discovery</PrimaryButton>
                    </div>
                </div>
                {/* Right: Event Carousel */}
                <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg aspect-square bg-gray-800 rounded-3xl overflow-hidden mx-auto shadow-lg">
                    {loading ? (
                        <div className="w-full h-full flex items-center justify-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white" role="status" aria-label="Loading"></div>
                        </div>
                    ) : error ? (
                        <div className="w-full h-full flex items-center justify-center">
                            <span className="text-white text-lg sm:text-xl md:text-2xl font-inter font-normal">Unable to load events</span>
                        </div>
                    ) : highlightedEvents.length === 0 ? (
                        <div className="w-full h-full flex items-center justify-center">
                            <span className="text-white text-lg sm:text-xl md:text-2xl font-inter font-normal">No highlighted events</span>
                        </div>
                    ) : (
                        <>
                            {highlightedEvents.map((event, index) => (
                                <div
                                    key={event.id}
                                    onClick={() => handleEventClick(event.id)}
                                    className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 cursor-pointer ${index === activeSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                                >
                                    <img
                                        src={event.imageUrl || 'https://images.unsplash.com/photo-1535016120720-40c646be5580?q=80&w=2070&auto=format&fit=crop'}
                                        alt={event.title}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.src = 'https://images.unsplash.com/photo-1535016120720-40c646be5580?q=80&w=2070&auto=format&fit=crop';
                                        }}
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-5">
                                        <h3 className="text-white text-xl sm:text-2xl font-inter font-semibold">{event.title}</h3>
                                        {event.date && (
                                            <p className="text-white text-sm sm:text-base mt-1">
                                                {new Date(event.date).toLocaleDateString('en-US', {
                                                    weekday: 'long',
                                                    month: 'short',
                                                    day: 'numeric'
                                                })}
                                            </p>
                                        )}
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
                                        className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-colors duration-300 ${index === activeSlide ? 'bg-white' : 'bg-gray-600/60'}`}
                                        aria-label={`Go to slide ${index + 1}`}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Home;
