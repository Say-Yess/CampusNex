// src/pages/DiscoveryFeed.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Filter } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import EventCard from '../components/EventCard';
import RSVPResultPopup from '../components/RSVPResultPopup';
import JoinConfirmationModal from '../components/JoinConfirmationModal';
import { eventsAPI } from '../services/api';
import { useAuth } from '../services/AuthContext';
import { mockEvents } from '../data/mockEvents';

const DiscoveryFeed = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [filters, setFilters] = useState({
        category: 'All',
        location: 'All',
        date: 'All',
        search: '',
    });
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showRsvpResult, setShowRsvpResult] = useState(false);
    const [rsvpResult, setRsvpResult] = useState({ success: false, message: '' });
    const [isAnimating, setIsAnimating] = useState(false);
    const [swipeDirection, setSwipeDirection] = useState('');
    const [showJoinConfirmation, setShowJoinConfirmation] = useState(false);
    const [selectedEventForJoin, setSelectedEventForJoin] = useState(null);
    const [showFilters, setShowFilters] = useState(false);
    const [categories, setCategories] = useState(['All']);
    const [locations, setLocations] = useState(['All']);

    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    // Shuffle array function for randomization
    const shuffleArray = (array) => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };

    // Fetch events from API
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                setLoading(true);
                console.log('Attempting to fetch events from API...');

                // Try to fetch events with random ordering from backend
                const response = await eventsAPI.getAllEvents('?order_by=random');
                let eventsData = response.events;

                // Additional client-side randomization for extra shuffle
                eventsData = shuffleArray(eventsData);

                setEvents(eventsData);

                // Extract unique categories and locations for filters
                const uniqueCategories = ['All', ...new Set(eventsData.map(event => event.category))];
                setCategories(uniqueCategories.filter(Boolean));

                const uniqueLocations = ['All', ...new Set(eventsData.map(event => event.location))];
                setLocations(uniqueLocations.filter(Boolean));

                setError('');
                console.log('Successfully loaded events from API:', eventsData.length);
            } catch (err) {
                console.error('Error fetching events from API:', err);
                console.log('Using mock data instead...');
                // Use mock data when API fails and randomize it
                const shuffledMockEvents = shuffleArray(mockEvents);
                setEvents(shuffledMockEvents);

                // Set default campus categories and locations
                setCategories(['All', 'Academic', 'Sports', 'Cultural', 'Social', 'Career', 'Workshop']);
                setLocations(['All', 'Main Campus', 'Library', 'Auditorium', 'Sports Complex', 'Student Center']);

                setError(''); // Clear error since we have mock data
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    // Handle Join Now button click - show confirmation popup first
    const handleJoinClick = (eventId) => {
        if (!isAuthenticated) {
            navigate('/login', { state: { from: '/discovery' } });
            return;
        }

        const event = events.find(e => e.id === eventId);
        setSelectedEventForJoin(event);
        setShowJoinConfirmation(true);
    };

    // Handle confirmed RSVP from confirmation popup
    const handleConfirmedRSVP = async (eventId, status) => {
        setShowJoinConfirmation(false);

        try {
            await eventsAPI.rsvpToEvent(eventId, status);
            setRsvpResult({
                success: true,
                message: status === 'attending'
                    ? 'RSVP Confirmed! We\'re Excited To See You There.'
                    : 'Thank For Letting Us Know We\'ll Miss You',
                type: status
            });
            setShowRsvpResult(true);
        } catch (err) {
            console.log('RSVP failed, showing mock success for demo:', err);
            // Show mock success for demo purposes
            setRsvpResult({
                success: true,
                message: status === 'attending'
                    ? 'RSVP Confirmed! We\'re Excited To See You There. (Demo mode)'
                    : 'Thank For Letting Us Know We\'ll Miss You (Demo mode)',
                type: status
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

        // Text search across multiple fields
        let searchMatch = true;
        if (filters.search && filters.search.trim() !== '') {
            const searchTerm = filters.search.toLowerCase().trim();
            const eventName = event.title?.toLowerCase() || '';
            const eventDescription = event.description?.toLowerCase() || '';
            const eventOrganizer = event.organizer?.toLowerCase() || '';
            const eventLocation = event.location?.toLowerCase() || '';
            const eventCategory = event.category?.toLowerCase() || '';

            searchMatch = eventName.includes(searchTerm) ||
                eventDescription.includes(searchTerm) ||
                eventOrganizer.includes(searchTerm) ||
                eventLocation.includes(searchTerm) ||
                eventCategory.includes(searchTerm);
        }

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

        return categoryMatch && locationMatch && dateMatch && searchMatch;
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
            <main className="flex-1 pt-24 pb-12 px-4">
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

                    {/* Enhanced Search and Filters */}
                    <div className="mb-6">
                        {/* Search Bar */}
                        <div className="relative max-w-lg mx-auto mb-4">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search events by name, description, organizer..."
                                value={filters.search || ''}
                                onChange={e => setFilters({ ...filters, search: e.target.value })}
                                className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                disabled={loading}
                            />
                            {filters.search && (
                                <button
                                    onClick={() => setFilters({ ...filters, search: '' })}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                    disabled={loading}
                                >
                                    <X size={20} />
                                </button>
                            )}
                        </div>

                        {/* Ordering and Filter Controls */}
                        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-4">
                            {/* Event Ordering Selection */}
                            <div className="flex items-center gap-2">
                                <label htmlFor="eventOrder" className="text-sm font-medium text-gray-700">
                                    Order by:
                                </label>
                                <select
                                    id="eventOrder"
                                    onChange={(e) => {
                                        if (e.target.value === 'refresh-random') {
                                            // Trigger a fresh random fetch
                                            window.location.reload();
                                        }
                                        // TODO: Implement other ordering options
                                    }}
                                    className="px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="random">Random (Current)</option>
                                    <option value="refresh-random">🔄 Shuffle Again</option>
                                    <option value="chronological" disabled>Chronological (Coming Soon)</option>
                                    <option value="interest" disabled>Based on Interests (Coming Soon)</option>
                                    <option value="popular" disabled>Most Popular (Coming Soon)</option>
                                </select>
                            </div>

                            {/* Filter Toggle Button */}
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition-all duration-300 border border-blue-200"
                            >
                                <Filter size={18} />
                                <span>{showFilters ? 'Hide Filters' : 'Show Filters'}</span>
                            </button>
                        </div>

                        {/* Filter Dropdowns - Collapsible */}
                        {showFilters && (
                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                <div className="flex flex-wrap gap-4 justify-center items-center">
                                    {/* Category Filter */}
                                    <div className="flex flex-col">
                                        <label className="text-sm font-medium text-gray-700 mb-1">Category</label>
                                        <select
                                            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-[140px]"
                                            value={filters.category}
                                            onChange={e => setFilters({ ...filters, category: e.target.value })}
                                            disabled={loading}
                                        >
                                            {categories.map(cat => (
                                                <option key={cat} value={cat}>{cat}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Location Filter */}
                                    <div className="flex flex-col">
                                        <label className="text-sm font-medium text-gray-700 mb-1">Location</label>
                                        <select
                                            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-[140px]"
                                            value={filters.location}
                                            onChange={e => setFilters({ ...filters, location: e.target.value })}
                                            disabled={loading}
                                        >
                                            {locations.map(location => (
                                                <option key={location} value={location}>{location}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Date Filter */}
                                    <div className="flex flex-col">
                                        <label className="text-sm font-medium text-gray-700 mb-1">Date</label>
                                        <select
                                            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-[140px]"
                                            value={filters.date}
                                            onChange={e => setFilters({ ...filters, date: e.target.value })}
                                            disabled={loading}
                                        >
                                            {['All', 'Today', 'This Week', 'This Month'].map(date => (
                                                <option key={date} value={date}>{date}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Clear Filters Button */}
                                    <div className="flex flex-col justify-end">
                                        <button
                                            onClick={() => setFilters({
                                                category: 'All',
                                                location: 'All',
                                                date: 'All',
                                                search: ''
                                            })}
                                            className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg transition-all duration-300 border border-red-200 whitespace-nowrap"
                                            disabled={loading}
                                        >
                                            Clear All
                                        </button>
                                    </div>
                                </div>

                                {/* Active Filters Display */}
                                {(filters.category !== 'All' || filters.location !== 'All' || filters.date !== 'All' || filters.search) && (
                                    <div className="mt-4 pt-4 border-t border-gray-200">
                                        <div className="text-sm text-gray-600 mb-2">Active filters:</div>
                                        <div className="flex flex-wrap gap-2">
                                            {filters.search && (
                                                <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                                                    Search: "{filters.search}"
                                                    <button
                                                        onClick={() => setFilters({ ...filters, search: '' })}
                                                        className="hover:text-blue-900"
                                                    >
                                                        <X size={14} />
                                                    </button>
                                                </span>
                                            )}
                                            {filters.category !== 'All' && (
                                                <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                                                    Category: {filters.category}
                                                    <button
                                                        onClick={() => setFilters({ ...filters, category: 'All' })}
                                                        className="hover:text-green-900"
                                                    >
                                                        <X size={14} />
                                                    </button>
                                                </span>
                                            )}
                                            {filters.location !== 'All' && (
                                                <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                                                    Location: {filters.location}
                                                    <button
                                                        onClick={() => setFilters({ ...filters, location: 'All' })}
                                                        className="hover:text-purple-900"
                                                    >
                                                        <X size={14} />
                                                    </button>
                                                </span>
                                            )}
                                            {filters.date !== 'All' && (
                                                <span className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">
                                                    Date: {filters.date}
                                                    <button
                                                        onClick={() => setFilters({ ...filters, date: 'All' })}
                                                        className="hover:text-orange-900"
                                                    >
                                                        <X size={14} />
                                                    </button>
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

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
                                                onJoin={() => handleJoinClick(event.id)}
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

                {showJoinConfirmation && (
                    <JoinConfirmationModal
                        isOpen={showJoinConfirmation}
                        onClose={() => setShowJoinConfirmation(false)}
                        event={selectedEventForJoin}
                        onConfirm={handleConfirmedRSVP}
                    />
                )}
            </main>
            <Footer />
        </div>
    );
};

export default DiscoveryFeed;
