// src/pages/EventDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { eventsAPI } from '../services/api';
import { useAuth } from '../services/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RSVPResultPopup from '../components/RSVPResultPopup';

const EventDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, isAuthenticated } = useAuth();

    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [rsvpStatus, setRsvpStatus] = useState('');
    const [showRsvpResult, setShowRsvpResult] = useState(false);
    const [rsvpResult, setRsvpResult] = useState({ success: false, message: '' });

    // Fetch event data
    useEffect(() => {
        const fetchEvent = async () => {
            try {
                setLoading(true);
                const response = await eventsAPI.getEventById(id);
                setEvent(response.event);

                // Check if user has already RSVPed
                if (isAuthenticated && response.event.RSVPs) {
                    const userRsvp = response.event.RSVPs.find(
                        rsvp => rsvp.userId === user.id
                    );
                    if (userRsvp) {
                        setRsvpStatus(userRsvp.status);
                    }
                }
            } catch (error) {
                console.error('Error fetching event:', error);
                setError('Failed to load event details.');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchEvent();
        } else {
            setError('Event ID is missing.');
            setLoading(false);
        }
    }, [id, isAuthenticated, user]);

    // Handle RSVP
    const handleRSVP = async (status) => {
        if (!isAuthenticated) {
            navigate('/login', { state: { from: `/events/${id}` } });
            return;
        }

        try {
            const response = await eventsAPI.rsvpToEvent(id, status);
            setRsvpStatus(status);
            setRsvpResult({
                success: true,
                message: status === 'attending'
                    ? 'You are now attending this event!'
                    : status === 'interested'
                        ? "You've marked interest in this event!"
                        : "You've declined this event."
            });
            setShowRsvpResult(true);
        } catch (error) {
            setRsvpResult({
                success: false,
                message: 'Failed to update your RSVP. Please try again.'
            });
            setShowRsvpResult(true);
        }
    };

    const handleCloseRsvpResult = () => {
        setShowRsvpResult(false);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex flex-col">
                <Navbar />
                <div className="flex-1 flex items-center justify-center">
                    <p className="text-xl">Loading event details...</p>
                </div>
                <Footer />
            </div>
        );
    }

    if (error || !event) {
        return (
            <div className="min-h-screen bg-white flex flex-col">
                <Navbar />
                <div className="flex-1 flex flex-col items-center justify-center">
                    <p className="text-xl text-red-500 mb-4">{error || 'Event not found'}</p>
                    <button
                        onClick={() => navigate('/discovery')}
                        className="bg-orange-500 text-white px-6 py-2 rounded font-semibold"
                    >
                        Back to Events
                    </button>
                </div>
                <Footer />
            </div>
        );
    }
    return (
        <div className="min-h-screen bg-white flex flex-col">
            <Navbar />
            <main className="flex-1 flex flex-col items-center py-12 px-4">
                {/* Event Image */}
                <div className="w-full max-w-3xl h-[452px] bg-gray-300 rounded-3xl mb-8 overflow-hidden">
                    {event.imageUrl ? (
                        <img
                            src={event.imageUrl}
                            alt={event.title}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full bg-blue-100 flex items-center justify-center">
                            <p className="text-blue-500 text-xl font-semibold">No image available</p>
                        </div>
                    )}
                </div>

                {/* Title */}
                <h1 className="text-royal-blue text-5xl font-inter font-semibold mb-4 w-full max-w-3xl">{event.title}</h1>

                {/* Location */}
                <div className="text-black text-2xl font-inter font-light mb-2 w-full max-w-3xl">
                    Located at <span className="font-medium">{event.location}</span>
                </div>

                {/* Date & Time */}
                <div className="flex items-center gap-6 mb-4 w-full max-w-3xl">
                    <div className="w-5 h-5 bg-black rounded-full" />
                    <div className="text-black text-2xl font-inter font-bold">
                        {new Date(event.startDate).toLocaleDateString('en-US', {
                            weekday: 'long',
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                        })}
                        <br />
                        {new Date(event.startDate).toLocaleTimeString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit'
                        })} -
                        {new Date(event.endDate).toLocaleTimeString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit'
                        })}
                    </div>
                </div>

                {/* Category Tag */}
                <div className="bg-bright-teal rounded-lg px-4 py-2 text-poppins text-lg font-semibold text-white mb-4 w-auto">{event.category}</div>
                {/* Spots Left & RSVP Button */}
                <div className="flex items-center gap-8 mb-8 w-full max-w-3xl">
                    {event.capacity && (
                        <>
                            <div className="text-orange-500 text-xl font-inter font-bold">
                                {event.capacity - (event.RSVPs?.filter(r => r.status === 'attending').length || 0)}
                            </div>
                            <div className="text-royal-blue text-xl font-inter font-bold">spots left</div>
                        </>
                    )}
                    <button
                        className={`${rsvpStatus === 'attending' ? 'bg-green-500' :
                                rsvpStatus === 'interested' ? 'bg-blue-500' :
                                    'bg-orange-500'
                            } rounded-xl px-8 py-3 text-white text-lg font-inter font-bold`}
                        onClick={() => handleRSVP(rsvpStatus === 'attending' ? 'not_attending' : 'attending')}
                    >
                        {rsvpStatus === 'attending' ? 'Attending ✓' : 'RSVP Now'}
                    </button>
                    {rsvpStatus !== 'attending' && (
                        <button
                            className="bg-gray-200 rounded-xl px-8 py-3 text-gray-700 text-lg font-inter font-bold"
                            onClick={() => handleRSVP('interested')}
                        >
                            {rsvpStatus === 'interested' ? 'Interested ✓' : 'Interested'}
                        </button>
                    )}
                </div>

                {showRsvpResult && (
                    <RSVPResultPopup
                        result={rsvpResult}
                        onClose={handleCloseRsvpResult}
                    />
                )}

                {/* About Section */}
                <div className="w-full max-w-4xl mb-8">
                    <h2 className="text-royal-blue text-4xl font-inter font-bold mb-2">About</h2>
                    <p className="text-black text-xl font-inter font-normal whitespace-pre-line">{event.description}</p>
                </div>

                {/* Benefits Section - Only show if benefits exist */}
                {event.benefits && event.benefits.length > 0 && (
                    <div className="w-full max-w-4xl mb-8">
                        <h2 className="text-royal-blue text-4xl font-inter font-bold mb-2">Benefits</h2>
                        {event.benefits.map((benefit, idx) => (
                            <div key={idx} className="text-black text-lg font-inter font-semibold mb-1">{benefit}</div>
                        ))}
                    </div>
                )}

                {/* Organizer Section */}
                <div className="w-full max-w-4xl mb-8">
                    <h2 className="text-royal-blue text-4xl font-inter font-bold mb-2">Organizer</h2>
                    <div className="flex items-center gap-4 mb-2">
                        <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                        <div className="text-black text-xl font-inter font-semibold">
                            {event.organizer ? `${event.organizer.firstName} ${event.organizer.lastName}` : 'Unknown Organizer'}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default EventDetail;
