// src/pages/EventDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { eventsAPI } from '../services/api';
import { useAuth } from '../services/AuthContext';
import { getMockEventById } from '../data/mockEvents';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RSVPConfirmationModal from '../components/RSVPConfirmationModal';
import RSVPSuccessModal from '../components/RSVPSuccessModal';

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
    const [showConfirmModal, setShowConfirmModal] = useState(false);

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
                const mockEvent = getMockEventById(id);
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

    // Handle RSVP button click - show confirmation modal
    const handleRSVP = (status) => {
        if (!isAuthenticated) {
            navigate('/login', { state: { from: `/events/${id}` } });
            return;
        }

        if (status === 'attending' && rsvpStatus !== 'attending') {
            // Show confirmation modal for new attendances
            setShowConfirmModal(true);
        } else {
            // Handle other statuses directly
            processRSVP(status);
        }
    };

    // Process RSVP after confirmation
    const processRSVP = async (status, preferences = {}) => {
        try {
            await eventsAPI.rsvpToEvent(id, status);
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

            // Handle calendar integration if requested
            if (preferences.addToCalendar && status === 'attending') {
                // Add to Google Calendar functionality
                console.log('Adding to Google Calendar with preferences:', preferences.notifications);
            }
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

    // Handle confirmation modal responses
    const handleConfirmRSVP = (preferences) => {
        setShowConfirmModal(false);
        processRSVP('attending', preferences);
    };

    const handleCancelRSVP = () => {
        setShowConfirmModal(false);
        processRSVP('not_attending');
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
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            <main className="flex-1 py-8 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column - Event Info */}
                        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-8">
                            {/* Title */}
                            <h1 className="text-3xl font-bold text-gray-900 mb-4">{event.title}</h1>

                            {/* Date & Time */}
                            <div className="flex items-center mb-4">
                                <div className="w-2 h-2 bg-gray-900 rounded-full mr-3"></div>
                                <div className="text-gray-900">
                                    <div className="font-semibold">
                                        {new Date(event.startDate).toLocaleDateString('en-US', {
                                            weekday: 'long',
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric'
                                        })}
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        {new Date(event.startDate).toLocaleTimeString('en-US', {
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })} - {new Date(event.endDate).toLocaleTimeString('en-US', {
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </div>
                                </div>
                            </div>

                            {/* Location */}
                            <div className="text-gray-600 mb-6">
                                Located in <span className="font-medium text-gray-900">{event.location}</span>
                            </div>

                            {/* RSVP Button - Mobile */}
                            <div className="lg:hidden mb-6">
                                <button
                                    className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${rsvpStatus === 'attending'
                                        ? 'bg-green-600 text-white'
                                        : 'bg-orange-500 hover:bg-orange-600 text-white'
                                        } ${!isAuthenticated ? 'opacity-75' : ''}`}
                                    onClick={() => handleRSVP(rsvpStatus === 'attending' ? 'not_attending' : 'attending')}
                                    title={!isAuthenticated ? "Please login to RSVP" : ""}
                                >
                                    {rsvpStatus === 'attending' ? 'Attending ✓' : (isAuthenticated ? 'Join Now' : 'Join Now (Login Required)')}
                                </button>
                            </div>

                            {/* About Section */}
                            <div className="mb-8">
                                <h2 className="text-xl font-bold text-gray-900 mb-4">About</h2>
                                <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                                    {event.description}
                                </div>
                            </div>

                            {/* Requirements Section */}
                            {event.requirements && event.requirements.length > 0 && (
                                <div className="mb-8">
                                    <h2 className="text-xl font-bold text-gray-900 mb-4">Requirements</h2>
                                    <ul className="space-y-2">
                                        {event.requirements.map((requirement, idx) => (
                                            <li key={idx} className="text-gray-700">{requirement}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Benefits Section */}
                            {event.benefits && event.benefits.length > 0 && (
                                <div className="mb-8">
                                    <h2 className="text-xl font-bold text-gray-900 mb-4">Benefit</h2>
                                    <ul className="space-y-2">
                                        {event.benefits.map((benefit, idx) => (
                                            <li key={idx} className="text-gray-700">{benefit}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Organizer Section */}
                            <div className="border-t pt-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-4">Organizer</h2>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                                        <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="font-semibold text-gray-900">
                                            {event.organizer ? `${event.organizer.firstName || ''} ${event.organizer.lastName || ''}`.trim() || event.organizer.name : 'CampusNex Organizer'}
                                        </div>
                                        <div className="text-sm text-gray-600">Event Organizer</div>
                                    </div>
                                </div>
                                <button className="mt-4 text-blue-600 hover:text-blue-800 font-medium">
                                    Contact Us
                                </button>
                            </div>
                        </div>

                        {/* Right Column - Image & Actions */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-lg shadow-sm overflow-hidden sticky top-8">
                                {/* Event Image */}
                                <div className="aspect-video bg-gray-200">
                                    {event.imageUrl ? (
                                        <img
                                            src={event.imageUrl}
                                            alt={event.title}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                            <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                    )}
                                </div>

                                {/* Action Panel */}
                                <div className="p-6">
                                    {/* Authentication Notice */}
                                    {!isAuthenticated && (
                                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                                            <p className="text-sm text-blue-800">
                                                <a href="/login" className="font-medium text-blue-600 hover:text-blue-800 underline">Sign in</a> or
                                                <a href="/signup" className="font-medium text-blue-600 hover:text-blue-800 underline ml-1">create account</a> to RSVP
                                            </p>
                                        </div>
                                    )}

                                    {/* Spots Left */}
                                    {event.capacity && (
                                        <div className="mb-4 text-center">
                                            <div className="text-2xl font-bold text-orange-500">
                                                {event.capacity - (event.RSVPs?.filter(r => r.status === 'attending').length || 0)}
                                            </div>
                                            <div className="text-sm text-gray-600">Spots Left</div>
                                        </div>
                                    )}

                                    {/* RSVP Buttons */}
                                    <div className="space-y-3">
                                        <button
                                            className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${rsvpStatus === 'attending'
                                                ? 'bg-green-600 text-white'
                                                : 'bg-orange-500 hover:bg-orange-600 text-white'
                                                } ${!isAuthenticated ? 'opacity-75' : ''}`}
                                            onClick={() => handleRSVP(rsvpStatus === 'attending' ? 'not_attending' : 'attending')}
                                            title={!isAuthenticated ? "Please login to RSVP" : ""}
                                        >
                                            {rsvpStatus === 'attending' ? 'Attending ✓' : (isAuthenticated ? 'Join Now' : 'Join Now (Login Required)')}
                                        </button>

                                        {rsvpStatus !== 'attending' && (
                                            <button
                                                className={`w-full py-2 px-6 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors ${!isAuthenticated ? 'opacity-75' : ''}`}
                                                onClick={() => handleRSVP('interested')}
                                                title={!isAuthenticated ? "Please login to show interest" : ""}
                                            >
                                                {rsvpStatus === 'interested' ? 'Interested ✓' : (isAuthenticated ? 'Interested' : 'Interested (Login Required)')}
                                            </button>
                                        )}
                                    </div>

                                    {/* Category Tag */}
                                    <div className="mt-4 pt-4 border-t">
                                        <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                                            {event.category}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {showRsvpResult && (
                    <RSVPSuccessModal
                        isOpen={showRsvpResult}
                        onClose={handleCloseRsvpResult}
                        event={event}
                        result={rsvpResult}
                    />
                )}

                {showConfirmModal && (
                    <RSVPConfirmationModal
                        isOpen={showConfirmModal}
                        onClose={() => setShowConfirmModal(false)}
                        event={event}
                        onConfirm={handleConfirmRSVP}
                        onCancel={handleCancelRSVP}
                    />
                )}
            </main>
            <Footer />
        </div>
    );
};

export default EventDetail;
