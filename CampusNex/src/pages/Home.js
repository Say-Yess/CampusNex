/**
 * Home Page Component
 * 
 * Features:
 * - Hero section with event carousel
 * - Current events showcase
 * - Category exploration
 * - Upcoming events
 * - Promotional banner
 * 
 * @author CampusNex Team
 * @version 2.0
 */

// React core imports
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Component imports
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PrimaryButton from '../components/PrimaryButton';

// Service imports
import { eventsAPI } from '../services/api';

// Constants
const DEFAULT_EVENT_IMAGES = [
    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2069&auto=format&fit=crop'
];

const SLIDE_INTERVAL = 5000; // 5 seconds
const MAX_HIGHLIGHTED_EVENTS = 3;

const EVENT_CATEGORIES = [
    { id: 1, name: 'Technology', icon: '💻', color: 'bg-blue-100' },
    { id: 2, name: 'Business', icon: '💼', color: 'bg-green-100' },
    { id: 3, name: 'Education', icon: '🎓', color: 'bg-purple-100' },
    { id: 4, name: 'Sports', icon: '⚽', color: 'bg-orange-100' }
];

/**
 * Home Page Component
 * Main landing page showcasing events and navigation
 */
const Home = () => {
    // Hooks
    const navigate = useNavigate();

    // State management
    const [highlightedEvents, setHighlightedEvents] = useState([]);
    const [currentEvents, setCurrentEvents] = useState([]);
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeSlide, setActiveSlide] = useState(0);
    const [error, setError] = useState(null);

    // Helper Functions

    /**
     * Adds default images to events that don't have them
     * @param {Array} events - Array of event objects
     * @returns {Array} Events with default images added
     */
    const addDefaultImages = (events) => {
        return events.map((event, index) => ({
            ...event,
            imageUrl: event.imageUrl || DEFAULT_EVENT_IMAGES[index % DEFAULT_EVENT_IMAGES.length]
        }));
    };

    /**
     * Categorizes events into current and upcoming
     * @param {Array} events - Array of event objects
     * @returns {Object} Object containing current and upcoming events
     */
    const categorizeEvents = (events) => {
        const now = new Date();
        const current = [];
        const upcoming = [];

        events.forEach(event => {
            const eventDate = new Date(event.startDate || event.date);
            if (eventDate <= now) {
                current.push(event);
            } else {
                upcoming.push(event);
            }
        });

        return { current: current.slice(0, 4), upcoming: upcoming.slice(0, 4) };
    };

    /**
     * Creates mock event data for demonstration
     * @returns {Array} Array of mock events
     */
    const createMockEvents = () => [
        {
            id: 1,
            title: 'Tech Conference 2025',
            date: '2025-10-15',
            startDate: '2025-10-15T09:00:00',
            location: 'Convention Center',
            category: 'Technology',
            description: 'Join industry leaders for the latest in technology trends.',
            imageUrl: DEFAULT_EVENT_IMAGES[0]
        },
        {
            id: 2,
            title: 'Startup Weekend',
            date: '2025-10-20',
            startDate: '2025-10-20T10:00:00',
            location: 'Innovation Hub',
            category: 'Business',
            description: 'Build your startup idea in 54 hours with fellow entrepreneurs.',
            imageUrl: DEFAULT_EVENT_IMAGES[1]
        },
        {
            id: 3,
            title: 'AI Workshop',
            date: '2025-10-25',
            startDate: '2025-10-25T14:00:00',
            location: 'Tech Campus',
            category: 'Education',
            description: 'Learn the fundamentals of artificial intelligence and machine learning.',
            imageUrl: DEFAULT_EVENT_IMAGES[2]
        },
        {
            id: 4,
            title: 'Sports Tournament',
            date: '2025-11-01',
            startDate: '2025-11-01T08:00:00',
            location: 'Stadium',
            category: 'Sports',
            description: 'Annual inter-college sports championship.',
            imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070&auto=format&fit=crop'
        }
    ];

    // Effects

    /**
     * Fetch and organize events data on component mount
     */
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                setLoading(true);
                console.log('Fetching events from API...');
                const response = await eventsAPI.getAllEvents();

                if (response?.events?.length > 0) {
                    const eventsWithImages = addDefaultImages(response.events);
                    const { current, upcoming } = categorizeEvents(eventsWithImages);

                    setHighlightedEvents(eventsWithImages.slice(0, MAX_HIGHLIGHTED_EVENTS));
                    setCurrentEvents(current);
                    setUpcomingEvents(upcoming);

                    console.log('Successfully loaded events from API');
                } else {
                    throw new Error('No events found');
                }
            } catch (err) {
                console.error('Failed to fetch events:', err);
                console.log('Using mock events...');

                const mockEvents = createMockEvents();
                const { current, upcoming } = categorizeEvents(mockEvents);

                setHighlightedEvents(mockEvents.slice(0, MAX_HIGHLIGHTED_EVENTS));
                setCurrentEvents(current);
                setUpcomingEvents(upcoming);
                setError(null);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

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

    // Event Handlers

    /**
     * Change carousel slide
     * @param {number} index - Slide index
     */
    const goToSlide = (index) => {
        setActiveSlide(index);
    };

    /**
     * Navigate to event details
     * @param {number} eventId - Event ID
     */
    const handleEventClick = (eventId) => {
        navigate(`/events/${eventId}`);
    };

    /**
     * Navigate to discovery page with optional category filter
     * @param {string} category - Category to filter by
     */
    const handleDiscoveryNavigation = (category = null) => {
        if (category) {
            navigate(`/discovery?category=${encodeURIComponent(category)}`);
        } else {
            navigate('/discovery');
        }
    };

    /**
     * Handle category selection
     * @param {Object} category - Category object
     */
    const handleCategoryClick = (category) => {
        handleDiscoveryNavigation(category.name);
    };

    // Component Render Functions

    /**
     * Render event card component
     * @param {Object} event - Event object
     * @param {string} size - Card size variant
     * @returns {JSX.Element} Event card component
     */
    const renderEventCard = (event, size = 'default') => {
        const cardClasses = size === 'small'
            ? 'bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300'
            : 'bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300';

        return (
            <div
                key={event.id}
                className={cardClasses}
                onClick={() => handleEventClick(event.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && handleEventClick(event.id)}
            >
                <div className="relative">
                    <img
                        src={event.imageUrl}
                        alt={event.title}
                        className="w-full h-32 sm:h-40 object-cover"
                        onError={(e) => {
                            e.target.src = DEFAULT_EVENT_IMAGES[0];
                        }}
                    />
                    <div className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow-md">
                        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                    </div>
                </div>
                <div className="p-4">
                    <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-1">{event.title}</h3>
                    <p className="text-xs text-gray-600 mb-1">{event.location}</p>
                    <p className="text-xs text-gray-500 mb-3">
                        {new Date(event.startDate || event.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric'
                        })} | {event.category}
                    </p>
                    <button className="w-full bg-orange-500 hover:bg-orange-600 text-white text-xs font-medium py-2 px-4 rounded-lg transition-colors duration-200">
                        Upcoming & Interested
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />

            {/* Hero Section */}
            <section className="bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
                    <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
                        {/* Left: Text Content */}
                        <div className="w-full lg:w-1/2 text-center lg:text-left">
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
                                Discover Your Opportunity With Us
                            </h1>
                            <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vestibulum rhoncus nibh.
                                Quisque viverra est vitae nibh commodo gravida.
                            </p>
                            <div className="flex justify-center lg:justify-start">
                                <PrimaryButton
                                    onClick={() => handleDiscoveryNavigation()}
                                    className="px-8 py-3 text-lg font-semibold"
                                >
                                    Discovery
                                </PrimaryButton>
                            </div>
                        </div>

                        {/* Right: Event Carousel */}
                        <div className="w-full lg:w-1/2 flex justify-center">
                            <div className="relative w-full max-w-md aspect-square bg-gray-800 rounded-3xl overflow-hidden shadow-2xl">
                                {loading ? (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white" role="status" aria-label="Loading"></div>
                                    </div>
                                ) : error ? (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <span className="text-white text-lg font-medium">Unable to load events</span>
                                    </div>
                                ) : highlightedEvents.length === 0 ? (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <span className="text-white text-lg font-medium">No highlighted events</span>
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
                                                    src={event.imageUrl}
                                                    alt={event.title}
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => {
                                                        e.target.src = DEFAULT_EVENT_IMAGES[0];
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
                                                    className={`w-3 h-3 rounded-full transition-colors duration-300 ${index === activeSlide ? 'bg-white' : 'bg-white/40'}`}
                                                    aria-label={`Go to slide ${index + 1}`}
                                                />
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Current Events Section */}
            <section className="py-12 lg:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-8">Current Event</h2>

                    {loading ? (
                        <div className="flex justify-center items-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {currentEvents.map((event) => renderEventCard(event))}
                        </div>
                    )}
                </div>
            </section>

            {/* Explore Categories Section */}
            <section className="py-12 lg:py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-8">Explore Categories</h2>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                        {EVENT_CATEGORIES.map((category) => (
                            <div
                                key={category.id}
                                onClick={() => handleCategoryClick(category)}
                                className="flex flex-col items-center cursor-pointer group"
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => e.key === 'Enter' && handleCategoryClick(category)}
                            >
                                <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full ${category.color} flex items-center justify-center mb-3 group-hover:scale-105 transition-transform duration-200`}>
                                    <span className="text-2xl sm:text-3xl">{category.icon}</span>
                                </div>
                                <p className="text-sm font-medium text-gray-700 text-center">{category.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Upcoming Events Section */}
            <section className="py-12 lg:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-8">Upcoming Event</h2>

                    {loading ? (
                        <div className="flex justify-center items-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {upcomingEvents.map((event) => renderEventCard(event))}
                        </div>
                    )}
                </div>
            </section>

            {/* Promotional Banner */}
            <section className="bg-blue-600 py-12 lg:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col sm:flex-row items-center justify-between text-center sm:text-left">
                        <div className="mb-6 sm:mb-0">
                            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                                Events specially curated for you!
                            </h2>
                            <p className="text-blue-100 text-lg">
                                Get event suggestions tailored to your interests based on your favorite events list away.
                            </p>
                        </div>
                        <div className="flex-shrink-0">
                            <button
                                onClick={() => handleDiscoveryNavigation()}
                                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200"
                            >
                                Get More →
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Home;
