// src/pages/InterestedEvents.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { eventsAPI } from '../services/api';
import { useAuth } from '../services/AuthContext';

const InterestedEvents = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const { user, isAuthenticated } = useAuth();

    useEffect(() => {
        // Redirect to login if not authenticated
        if (!isAuthenticated) {
            navigate('/login', { state: { from: '/interested' } });
            return;
        }

        const fetchInterestedEvents = async () => {
            try {
                setLoading(true);
                // Get user's RSVPs
                const response = await eventsAPI.getUserRSVPs();
                setEvents(response.events);
                setError('');
            } catch (err) {
                console.error('Error fetching interested events:', err);
                setError('Failed to load your events. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchInterestedEvents();
    }, [isAuthenticated, navigate]);

    const handleEventClick = (eventId) => {
        navigate(`/event/${eventId}`);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex flex-col">
                <Navbar />
                <div className="flex-1 flex items-center justify-center">
                    <p className="text-xl">Loading your events...</p>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <Navbar />
            <main className="flex-1 flex flex-col items-center justify-center py-16 px-4">
                <div className="w-full max-w-2xl rounded-3xl bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 p-10 shadow-lg">
                    <h1 className="text-blue-900 text-4xl font-bold mb-8 text-center">My Events</h1>

                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
                            {error}
                        </div>
                    )}

                    {events.length > 0 ? (
                        <div className="space-y-6">
                            {events.map((event) => (
                                <div
                                    key={event.id}
                                    className="bg-white rounded-xl p-6 shadow flex justify-between items-center cursor-pointer hover:shadow-md transition-shadow"
                                    onClick={() => handleEventClick(event.id)}
                                >
                                    <div>
                                        <div className="text-xl font-semibold text-blue-900 mb-2">{event.title}</div>
                                        <div className="text-gray-500 text-sm">
                                            Date: {new Date(event.startDate).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                                year: 'numeric'
                                            })}
                                        </div>
                                    </div>
                                    <span className={`px-4 py-2 rounded font-semibold text-white ${event.rsvpStatus === 'attending' ? 'bg-green-500' :
                                        event.rsvpStatus === 'interested' ? 'bg-blue-500' : 'bg-orange-400'
                                        }`}>
                                        {event.rsvpStatus === 'attending' ? 'Attending' :
                                            event.rsvpStatus === 'interested' ? 'Interested' : 'Upcoming'}
                                    </span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl p-8 shadow text-center">
                            <p className="text-gray-600 mb-4">You haven't shown interest in any events yet.</p>
                            <button
                                onClick={() => navigate('/discovery')}
                                className="bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
                            >
                                Discover Events
                            </button>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default InterestedEvents;
