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

    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    // Fetch events from API
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                setLoading(true);
                const response = await eventsAPI.getAllEvents();
                setEvents(response.events);
                setError('');
            } catch (err) {
                console.error('Error fetching events:', err);
                setError('Failed to load events. Please try again later.');
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
            setRsvpResult({
                success: false,
                message: 'Failed to RSVP. Please try again later.'
            });
            setShowRsvpResult(true);
        }
    };

    // Move to the next event
    const nextEvent = () => {
        if (currentIndex < filteredEvents.length - 1) {
            setCurrentIndex(prevIndex => prevIndex + 1);
        }
    };

    // Move to the previous event
    const prevEvent = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prevIndex => prevIndex - 1);
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

                    <EventFilters filters={filters} setFilters={setFilters} />

                    {filteredEvents.length > 0 ? (
                        <div className="relative max-w-xl mx-auto mt-10">
                            <div className="flex justify-between mb-4">
                                <button
                                    onClick={prevEvent}
                                    className={`px-4 py-2 rounded ${currentIndex > 0 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500'}`}
                                    disabled={currentIndex === 0}
                                >
                                    Previous
                                </button>
                                <button
                                    onClick={nextEvent}
                                    className={`px-4 py-2 rounded ${currentIndex < filteredEvents.length - 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500'}`}
                                    disabled={currentIndex === filteredEvents.length - 1}
                                >
                                    Next
                                </button>
                            </div>

                            <div className="relative h-[700px]">
                                {filteredEvents.map((event, index) => (
                                    <div
                                        key={event.id}
                                        className={`absolute transition-all duration-300 w-full ${index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
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
                                        />
                                    </div>
                                ))}
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
