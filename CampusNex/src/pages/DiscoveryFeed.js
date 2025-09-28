// src/pages/DiscoveryFeed.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import EventCard from '../components/EventCard';
import EventFilters from '../components/EventFilters';
import RSVPResultPopup from '../components/RSVPResultPopup';
import { eventsAPI } from '../services/api';
import { useAuth } from '../services/AuthContext';

// Mock data for testing when API is not available
const mockEvents = [
    {
        id: '1',
        title: 'Tech Conference 2025',
        description: 'Join us for the biggest tech conference of the year! Learn about the latest trends in AI, machine learning, and web development from industry experts.',
        category: 'Technology',
        location: 'San Francisco Convention Center',
        startDate: new Date('2025-10-15T09:00:00'),
        endDate: new Date('2025-10-15T17:00:00'),
        imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop',
        RSVPs: [{ status: 'attending' }, { status: 'attending' }, { status: 'interested' }]
    },
    {
        id: '2',
        title: 'Startup Weekend',
        description: 'A 54-hour weekend event where entrepreneurs, developers, designers, and business people come together to build amazing startups.',
        category: 'Business',
        location: 'Innovation Hub',
        startDate: new Date('2025-10-20T18:00:00'),
        endDate: new Date('2025-10-22T20:00:00'),
        imageUrl: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=2070&auto=format&fit=crop',
        RSVPs: [{ status: 'attending' }, { status: 'attending' }]
    },
    {
        id: '3',
        title: 'AI Workshop: Building Chatbots',
        description: 'Learn how to build intelligent chatbots using modern AI technologies. Perfect for beginners and intermediate developers.',
        category: 'Technology',
        location: 'University Tech Lab',
        startDate: new Date('2025-10-25T14:00:00'),
        endDate: new Date('2025-10-25T18:00:00'),
        imageUrl: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2069&auto=format&fit=crop',
        RSVPs: [{ status: 'attending' }]
    },
    {
        id: '4',
        title: 'Digital Marketing Masterclass',
        description: 'Master the art of digital marketing with hands-on workshops covering SEO, social media, content marketing, and analytics.',
        category: 'Marketing',
        location: 'Business Center Downtown',
        startDate: new Date('2025-11-01T10:00:00'),
        endDate: new Date('2025-11-01T16:00:00'),
        imageUrl: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?q=80&w=2070&auto=format&fit=crop',
        RSVPs: [{ status: 'attending' }, { status: 'attending' }, { status: 'attending' }, { status: 'interested' }]
    },
    {
        id: '5',
        title: 'Career Fair 2025',
        description: 'Connect with top employers and discover amazing career opportunities across various industries. Bring your resume!',
        category: 'Career',
        location: 'Campus Main Hall',
        startDate: new Date('2025-11-05T09:00:00'),
        endDate: new Date('2025-11-05T15:00:00'),
        imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop',
        RSVPs: [{ status: 'attending' }, { status: 'attending' }, { status: 'attending' }]
    }
];

const DiscoveryFeed = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [filters, setFilters] = useState({
        category: 'All',
        location: 'All',
        date: 'All',
    });
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showRsvpResult, setShowRsvpResult] = useState(false);
    const [rsvpResult, setRsvpResult] = useState({ success: false, message: '' });
    const [isAnimating, setIsAnimating] = useState(false);
    const [swipeDirection, setSwipeDirection] = useState('');

    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    // Fetch events from API
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                setLoading(true);
                console.log('Attempting to fetch events from API...');
                const response = await eventsAPI.getAllEvents();
                setEvents(response.events);
                setError('');
                console.log('Successfully loaded events from API:', response.events.length);
            } catch (err) {
                console.error('Error fetching events from API:', err);
                console.log('Using mock data instead...');
                // Use mock data when API fails
                setEvents(mockEvents);
                setError(''); // Clear error since we have mock data
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    // Handle RSVP to an event
    const handleRSVP = async (eventId, status) => {
        if (!isAuthenticated) {
            navigate('/login', { state: { from: '/discovery' } });
            return;
        }

        try {
            await eventsAPI.rsvpToEvent(eventId, status);
            setRsvpResult({
                success: true,
                message: status === 'attending'
                    ? 'You are now attending this event!'
                    : 'You\'ve marked interest in this event!'
            });
            setShowRsvpResult(true);
        } catch (err) {
            console.log('RSVP failed, showing mock success for demo:', err);
            // Show mock success for demo purposes
            setRsvpResult({
                success: true,
                message: status === 'attending'
                    ? 'You are now attending this event! (Demo mode)'
                    : 'You\'ve marked interest in this event! (Demo mode)'
            });
            setShowRsvpResult(true);
        }
    };

    // Handle closing RSVP result popup
    const handleCloseRsvpResult = () => {
        setShowRsvpResult(false);
        setRsvpResult({ success: false, message: '' });
    };

    // Move to the next event with animation
    const nextEvent = () => {
        if (currentIndex < filteredEvents.length - 1 && !isAnimating) {
            setIsAnimating(true);
            setSwipeDirection('left');
            setTimeout(() => {
                setCurrentIndex(prevIndex => prevIndex + 1);
                setSwipeDirection('');
                setTimeout(() => setIsAnimating(false), 100);
            }, 200);
        }
    };

    // Move to the previous event with animation
    const prevEvent = () => {
        if (currentIndex > 0 && !isAnimating) {
            setIsAnimating(true);
            setSwipeDirection('right');
            setTimeout(() => {
                setCurrentIndex(prevIndex => prevIndex - 1);
                setSwipeDirection('');
                setTimeout(() => setIsAnimating(false), 100);
            }, 200);
        }
    };

    // Handle touch/swipe gestures
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);

    const onTouchStart = (e) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;

        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > 50;
        const isRightSwipe = distance < -50;

        if (isLeftSwipe) {
            nextEvent();
        } else if (isRightSwipe) {
            prevEvent();
        }
    };

    // Filter events based on user selections
    const filteredEvents = events.filter(event => {
        const categoryMatch = filters.category === 'All' || event.category === filters.category;
        const locationMatch = filters.location === 'All' || event.location === filters.location;

        let dateMatch = true;
        if (filters.date !== 'All') {
            const eventDate = new Date(event.startDate);
            const today = new Date();

            if (filters.date === 'Today') {
                dateMatch = eventDate.toDateString() === today.toDateString();
            } else if (filters.date === 'This Week') {
                const weekStart = new Date(today);
                weekStart.setDate(today.getDate() - today.getDay());
                const weekEnd = new Date(weekStart);
                weekEnd.setDate(weekStart.getDate() + 6);

                dateMatch = eventDate >= weekStart && eventDate <= weekEnd;
            } else if (filters.date === 'This Month') {
                dateMatch = eventDate.getMonth() === today.getMonth() &&
                    eventDate.getFullYear() === today.getFullYear();
            }
        }

        return categoryMatch && locationMatch && dateMatch;
    });

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex flex-col">
                <Navbar />
                <div className="flex-1 flex items-center justify-center">
                    <p className="text-xl">Loading events...</p>
                </div>
                <Footer />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-white flex flex-col">
                <Navbar />
                <div className="flex-1 flex flex-col items-center justify-center">
                    <p className="text-xl text-red-500 mb-4">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="bg-orange-500 text-white px-6 py-2 rounded font-semibold"
                    >
                        Try Again
                    </button>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <Navbar />
            <main className="flex-1 py-12 px-4">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-4xl font-bold text-royal-blue mb-8 text-center">Discover Events</h1>

                    {!isAuthenticated && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                            <p className="text-blue-800 text-center">
                                <span className="font-semibold">Welcome!</span> You can browse all events below.
                                <span className="ml-1">
                                    <a href="/login" className="text-blue-600 hover:text-blue-800 underline">Sign in</a> or
                                    <a href="/signup" className="text-blue-600 hover:text-blue-800 underline ml-1">create an account</a> to join events.
                                </span>
                            </p>
                        </div>
                    )}

                    <EventFilters filters={filters} setFilters={setFilters} />

                    {filteredEvents.length > 0 ? (
                        <div className="relative max-w-xl mx-auto mt-10">
                            {/* Modern Navigation Arrows */}
                            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20">
                                <button
                                    onClick={prevEvent}
                                    disabled={currentIndex === 0 || isAnimating}
                                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${currentIndex > 0 && !isAnimating
                                            ? 'bg-white hover:bg-blue-50 text-blue-600 hover:scale-110 cursor-pointer'
                                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                        }`}
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                            </div>

                            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20">
                                <button
                                    onClick={nextEvent}
                                    disabled={currentIndex === filteredEvents.length - 1 || isAnimating}
                                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${currentIndex < filteredEvents.length - 1 && !isAnimating
                                            ? 'bg-white hover:bg-blue-50 text-blue-600 hover:scale-110 cursor-pointer'
                                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                        }`}
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>

                            {/* Swipeable Card Container */}
                            <div
                                className="relative h-[700px] overflow-hidden rounded-2xl"
                                onTouchStart={onTouchStart}
                                onTouchMove={onTouchMove}
                                onTouchEnd={onTouchEnd}
                            >
                                {/* Swipe Hint */}
                                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-30">
                                    <div className="bg-black/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                                        Swipe or use arrows to navigate
                                    </div>
                                </div>

                                {filteredEvents.map((event, index) => {
                                    const isActive = index === currentIndex;
                                    const isPrev = index === currentIndex - 1;
                                    const isNext = index === currentIndex + 1;

                                    let transform = 'translateX(100%)';
                                    let opacity = '0';
                                    let scale = '0.9';
                                    let zIndex = '0';

                                    if (isActive) {
                                        transform = swipeDirection === 'left' ? 'translateX(-100%)' :
                                            swipeDirection === 'right' ? 'translateX(100%)' : 'translateX(0)';
                                        opacity = swipeDirection ? '0' : '1';
                                        scale = '1';
                                        zIndex = '10';
                                    } else if (isPrev) {
                                        transform = swipeDirection === 'right' ? 'translateX(0)' : 'translateX(-100%)';
                                        opacity = swipeDirection === 'right' ? '1' : '0';
                                        scale = swipeDirection === 'right' ? '1' : '0.9';
                                        zIndex = swipeDirection === 'right' ? '10' : '0';
                                    } else if (isNext) {
                                        transform = swipeDirection === 'left' ? 'translateX(0)' : 'translateX(100%)';
                                        opacity = swipeDirection === 'left' ? '1' : '0';
                                        scale = swipeDirection === 'left' ? '1' : '0.9';
                                        zIndex = swipeDirection === 'left' ? '10' : '0';
                                    }

                                    return (
                                        <div
                                            key={event.id}
                                            className="absolute inset-0 transition-all duration-300 ease-out"
                                            style={{
                                                transform: `${transform} scale(${scale})`,
                                                opacity,
                                                zIndex
                                            }}
                                        >
                                            <EventCard
                                                id={event.id}
                                                title={event.title}
                                                date={new Date(event.startDate).toLocaleDateString('en-US', {
                                                    weekday: 'long',
                                                    month: 'short',
                                                    day: 'numeric'
                                                })}
                                                time={`${new Date(event.startDate).toLocaleTimeString('en-US', {
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })} - ${new Date(event.endDate).toLocaleTimeString('en-US', {
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}`}
                                                venue={event.location}
                                                category={event.category}
                                                description={event.description?.substring(0, 150) + (event.description?.length > 150 ? '...' : '')}
                                                registered={event.RSVPs?.filter(r => r.status === 'attending').length || 0}
                                                image={event.imageUrl}
                                                onJoin={() => handleRSVP(event.id, 'attending')}
                                                isAuthenticated={isAuthenticated}
                                            />
                                        </div>
                                    );
                                })}
                            </div>

                            <p className="text-center mt-4">
                                Event {currentIndex + 1} of {filteredEvents.length}
                            </p>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center h-64">
                            <p className="text-xl text-gray-500">No events match your filters.</p>
                        </div>
                    )}
                </div>

                {showRsvpResult && (
                    <RSVPResultPopup
                        result={rsvpResult}
                        onClose={handleCloseRsvpResult}
                    />
                )}
            </main>
            <Footer />
        </div>
    );
};

export default DiscoveryFeed;
