import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TinderCard from 'react-tinder-card';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../services/firebase';
import EventCard from './EventCard';
import EventFilters from './EventFilters';
import RSVPButton from './RSVPButton';
import RSVPResultPopup from './RSVPResultPopup';
import { Card, Badge, Alert } from './ui';

const SwipeInterface = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [lastDirection, setLastDirection] = useState();
    const [filters, setFilters] = useState({
        category: 'All',
        campus: 'All',
        date: 'All',
    });
    const [showRSVP, setShowRSVP] = useState(false);
    const [rsvpResult, setRsvpResult] = useState(null); // null, true (confirmed), false (cancelled)
    const [selectedEvent, setSelectedEvent] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchEvents() {
            setLoading(true);
            try {
                const querySnapshot = await getDocs(collection(db, 'events'));
                const eventList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setEvents(eventList);
            } catch (error) {
                console.error("Error fetching events:", error);
                // Use sample data as fallback
                setEvents(sampleEvents);
            } finally {
                setLoading(false);
            }
        }
        fetchEvents();
    }, []);

    const swiped = (direction, eventId) => {
        setLastDirection(direction);
        const event = events.find(e => e.id === eventId);
        if (direction === 'right') {
            setSelectedEvent(event);
            setShowRSVP(true);
        }
        if (direction === 'left') {
            setSelectedEvent(event);
            setRsvpResult(false);
        }
    };

    const outOfFrame = (eventId) => {
        // Remove the event from the stack once it's been swiped
        console.log(`${eventId} left the screen`);
    };

    const handleDetails = (eventId) => {
        const event = events.find(e => e.id === eventId);
        navigate(`/event/${eventId}`, { state: { event } });
    };

    const handleJoin = (eventId) => {
        const event = events.find(e => e.id === eventId);
        setSelectedEvent(event);
        setShowRSVP(true);
    };

    const handleConfirm = () => {
        setShowRSVP(false);
        setRsvpResult(true);
    };

    const handleCancel = () => {
        setShowRSVP(false);
        setRsvpResult(false);
    };

    const handleResultClose = () => setRsvpResult(null);

    // Filtering logic
    const filteredEvents = events.filter(event => {
        const categoryMatch = filters.category === 'All' || event.category === filters.category;
        const campusMatch = filters.campus === 'All' || event.location === filters.campus;
        let dateMatch = true;
        // You can add more robust date filtering here
        return categoryMatch && campusMatch && dateMatch;
    });

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[700px]">
                <div className="animate-pulse">
                    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <p className="mt-4 text-lg text-gray-600">Loading events...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center py-8">
            <div className="w-full max-w-2xl mb-8">
                <EventFilters filters={filters} setFilters={setFilters} />
            </div>

            <div className="relative w-full max-w-xl h-[700px]">
                {filteredEvents.length > 0 ? (
                    filteredEvents.map((event, idx) => (
                        <div
                            key={event.id}
                            className="absolute w-full h-full"
                            style={{ zIndex: filteredEvents.length - idx }}
                        >
                            <TinderCard
                                className="swipe"
                                onSwipe={(dir) => swiped(dir, event.id)}
                                onCardLeftScreen={() => outOfFrame(event.id)}
                                preventSwipe={['up', 'down']}
                            >
                                <EventCard
                                    {...event}
                                    onDetails={() => handleDetails(event.id)}
                                    onJoin={() => handleJoin(event.id)}
                                />
                            </TinderCard>
                        </div>
                    ))
                ) : (
                    <Card className="w-full h-full flex items-center justify-center">
                        <div className="text-center p-8">
                            <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <h3 className="text-xl font-semibold mb-2">No events found</h3>
                            <p className="text-gray-500 mb-4">
                                No events match your current filters. Try adjusting your search criteria.
                            </p>
                            <button
                                onClick={() => setFilters({ category: 'All', campus: 'All', date: 'All' })}
                                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                            >
                                Reset Filters
                            </button>
                        </div>
                    </Card>
                )}
            </div>

            {/* Swipe instructions */}
            <div className="flex justify-center items-center mt-6 space-x-8">
                <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-2">
                        <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </div>
                    <p className="text-sm text-gray-600">Swipe left to pass</p>
                </div>

                <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-2">
                        <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                    </div>
                    <p className="text-sm text-gray-600">Swipe right to join</p>
                </div>
            </div>

            {lastDirection && (
                <Alert
                    type={lastDirection === 'right' ? 'success' : 'info'}
                    className="mt-6"
                >
                    You swiped {lastDirection === 'right' ? 'right (Join)' : 'left (Pass)'}
                </Alert>
            )}

            {/* RSVP Modals */}
            {showRSVP && selectedEvent && (
                <RSVPButton
                    event={selectedEvent}
                    onConfirm={handleConfirm}
                    onCancel={handleCancel}
                />
            )}

            {rsvpResult !== null && selectedEvent && (
                <RSVPResultPopup
                    confirmed={rsvpResult}
                    onClose={handleResultClose}
                />
            )}
        </div>
    );
};

// Sample event data as fallback
const sampleEvents = [
    {
        id: 'event1',
        title: 'Hackathon 2025',
        date: '2025-04-15',
        time: '10:00 AM - 6:00 PM',
        location: 'Main Campus',
        category: 'Technology',
        description: 'Join us for the annual campus hackathon! Build innovative solutions in 24 hours.',
        image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3',
        organizer: 'Computer Science Society'
    },
    {
        id: 'event2',
        title: 'Spring Music Festival',
        date: '2025-05-20',
        time: '5:00 PM - 11:00 PM',
        location: 'West Campus',
        category: 'Arts',
        description: 'Annual spring music festival featuring student bands and performers.',
        image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3',
        organizer: 'Student Union'
    },
    {
        id: 'event3',
        title: 'Career Fair 2025',
        date: '2025-03-10',
        time: '9:00 AM - 3:00 PM',
        location: 'Business School',
        category: 'Career',
        description: 'Meet with over 50 companies hiring for internships and full-time positions.',
        image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3',
        organizer: 'Career Services'
    }
];

export default SwipeInterface;
