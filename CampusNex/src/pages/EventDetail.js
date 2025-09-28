// src/pages/EventDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { eventsAPI } from '../services/api';
import { useAuth } from '../services/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RSVPResultPopup from '../components/RSVPResultPopup';

// Mock event data for when API is not available
const mockEvents = {
    '1': {
        id: '1',
        title: 'Tech Conference 2025',
        description: 'Join us for the biggest tech conference of the year! Learn about the latest trends in AI, machine learning, and web development from industry experts. This conference will feature keynote speeches from tech leaders, hands-on workshops, networking sessions, and exhibitions from top tech companies. Whether you\'re a developer, designer, product manager, or entrepreneur, you\'ll find valuable insights and connections to advance your career.',
        category: 'Technology',
        location: 'San Francisco Convention Center',
        startDate: new Date('2025-10-15T09:00:00'),
        endDate: new Date('2025-10-15T17:00:00'),
        imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop',
        RSVPs: [
            { userId: 'user1', status: 'attending' },
            { userId: 'user2', status: 'attending' },
            { userId: 'user3', status: 'interested' }
        ],
        organizer: {
            name: 'Tech Events Inc.',
            email: 'info@techevents.com'
        }
    },
    '2': {
        id: '2',
        title: 'Startup Weekend',
        description: 'A 54-hour weekend event where entrepreneurs, developers, designers, and business people come together to build amazing startups. Form teams, validate ideas, and pitch your startup to a panel of judges. With mentorship from successful entrepreneurs and investors, this is your chance to turn your idea into reality. Prizes include funding opportunities and incubation programs.',
        category: 'Business',
        location: 'Innovation Hub',
        startDate: new Date('2025-10-20T18:00:00'),
        endDate: new Date('2025-10-22T20:00:00'),
        imageUrl: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=2070&auto=format&fit=crop',
        RSVPs: [
            { userId: 'user1', status: 'attending' },
            { userId: 'user4', status: 'attending' }
        ],
        organizer: {
            name: 'Startup Community',
            email: 'hello@startupcommunity.org'
        }
    },
    '3': {
        id: '3',
        title: 'AI Workshop: Building Chatbots',
        description: 'Learn how to build intelligent chatbots using modern AI technologies. This hands-on workshop covers natural language processing, machine learning models, and practical implementation using popular frameworks. Perfect for beginners and intermediate developers who want to add AI capabilities to their applications. All materials and code examples will be provided.',
        category: 'Technology',
        location: 'University Tech Lab',
        startDate: new Date('2025-10-25T14:00:00'),
        endDate: new Date('2025-10-25T18:00:00'),
        imageUrl: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2069&auto=format&fit=crop',
        RSVPs: [
            { userId: 'user2', status: 'attending' }
        ],
        organizer: {
            name: 'AI Learning Lab',
            email: 'workshops@ailearninglab.edu'
        }
    }
};

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
                console.log('Attempting to fetch event from API...');
                const response = await eventsAPI.getEventById(id);
                setEvent(response.event);

                // Check if user has already RSVPed
                if (isAuthenticated && response.event.RSVPs) {
                    const userRsvp = response.event.RSVPs.find(
                        rsvp => rsvp.userId === user?.id
                    );
                    if (userRsvp) {
                        setRsvpStatus(userRsvp.status);
                    }
                }
                console.log('Successfully loaded event from API');
            } catch (error) {
                console.error('Error fetching event from API:', error);
                console.log('Using mock event data...');

                // Use mock data when API fails
                const mockEvent = mockEvents[id];
                if (mockEvent) {
                    setEvent(mockEvent);

                    // Check if user has already RSVPed (mock check)
                    if (isAuthenticated && mockEvent.RSVPs) {
                        const userRsvp = mockEvent.RSVPs.find(
                            rsvp => rsvp.userId === user?.id
                        );
                        if (userRsvp) {
                            setRsvpStatus(userRsvp.status);
                        }
                    }
                    setError(''); // Clear error since we have mock data
                } else {
                    setError('Event not found.');
                }
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
            console.log('RSVP failed, showing demo success:', error);
            // Show demo success for mock data scenario
            setRsvpStatus(status);
            setRsvpResult({
                success: true,
                message: status === 'attending'
                    ? 'You are now attending this event! (Demo mode)'
                    : status === 'interested'
                        ? "You've marked interest in this event! (Demo mode)"
                        : "You've declined this event. (Demo mode)"
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
                {/* Authentication Notice for Non-authenticated Users */}
                {!isAuthenticated && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 w-full max-w-3xl">
                        <p className="text-blue-800">
                            <span className="font-semibold">Want to join this event?</span>
                            <span className="ml-1">
                                <a href="/login" className="text-blue-600 hover:text-blue-800 underline">Sign in</a> or
                                <a href="/signup" className="text-blue-600 hover:text-blue-800 underline ml-1">create an account</a> to RSVP.
                            </span>
                        </p>
                    </div>
                )}

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
                            } rounded-xl px-8 py-3 text-white text-lg font-inter font-bold ${!isAuthenticated ? 'opacity-75' : ''}`}
                        onClick={() => handleRSVP(rsvpStatus === 'attending' ? 'not_attending' : 'attending')}
                        title={!isAuthenticated ? "Please login to RSVP" : ""}
                    >
                        {rsvpStatus === 'attending' ? 'Attending ✓' : (isAuthenticated ? 'RSVP Now' : 'RSVP (Login Required)')}
                    </button>
                    {rsvpStatus !== 'attending' && (
                        <button
                            className={`bg-gray-200 rounded-xl px-8 py-3 text-gray-700 text-lg font-inter font-bold ${!isAuthenticated ? 'opacity-75' : ''}`}
                            onClick={() => handleRSVP('interested')}
                            title={!isAuthenticated ? "Please login to show interest" : ""}
                        >
                            {rsvpStatus === 'interested' ? 'Interested ✓' : (isAuthenticated ? 'Interested' : 'Interested (Login Required)')}
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
