import React, { useState } from 'react';

import EventCard from './EventCard';
import EventFilters from './EventFilters';
import { useNavigate } from 'react-router-dom';
import RSVPButton from './RSVPButton';
import RSVPResultPopup from './RSVPResultPopup';

const mockEvents = [
    {
        id: 1,
        title: 'IT COMPETITION',
        date: 'Monday, Aug 25, 2025',
        time: '2:00 PM - 4:00 PM',
        venue: 'CJCC',
        category: 'Educational & Business',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vestibulum rhoncus nibh. Quisque viverra est vitae nibh commodo gravida. Pellentesque sed dolor eget leo interdum dictum sit amet et justo. Aliquam erat volutpat. Donec hendrerit',
        registered: 102,
        image: '',
    },
    {
        id: 2,
        title: 'Tech Career Fair',
        date: 'Friday, Sep 19, 2025',
        time: '9:00 AM - 12:00 PM',
        venue: 'Phnom Penh',
        category: 'Career',
        description: 'Meet top employers and discover tech jobs!',
        registered: 87,
        image: '',
    },
    {
        id: 3,
        title: 'Startup Pitch Night',
        date: 'Saturday, Sep 20, 2025',
        time: '6:00 PM - 9:00 PM',
        venue: 'RUPP',
        category: 'Entrepreneurship',
        description: 'Pitch your startup idea and win prizes!',
        registered: 54,
        image: '',
    },
];

const SwipeInterface = () => {
    const [events, setEvents] = React.useState(mockEvents);
    const [lastDirection, setLastDirection] = React.useState();
    const [filters, setFilters] = React.useState({
        category: 'All',
        campus: 'All',
        date: 'All',
    });
    const [showRSVP, setShowRSVP] = useState(false);
    const [rsvpResult, setRsvpResult] = useState(null); // null, true (confirmed), false (cancelled)
    const [selectedEvent, setSelectedEvent] = useState(null);
    const navigate = useNavigate();

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
        // Optionally handle when card leaves screen
    };

    const handleDetails = (eventId) => {
        const event = events.find(e => e.id === eventId);
        navigate('/event-detail', { state: { event } });
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
        const campusMatch = filters.campus === 'All' || event.venue === filters.campus;
        let dateMatch = true;
        if (filters.date === 'Today') {
            // For demo, match today's date
            const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
            dateMatch = event.date.includes(today);
        } else if (filters.date === 'This Week') {
            // For demo, match any event in the same week as today
            dateMatch = true; // Implement week logic as needed
        } else if (filters.date === 'This Month') {
            // For demo, match any event in the same month as today
            dateMatch = true; // Implement month logic as needed
        }
        return categoryMatch && campusMatch && dateMatch;
    });

    return (
        <div className="flex flex-col items-center justify-center mt-6">
            <EventFilters filters={filters} setFilters={setFilters} />
            <div className="relative w-full max-w-xl h-[700px]">
                {filteredEvents.length > 0 ? (
                    filteredEvents.map((event, idx) => (
                        <div key={event.id} className="absolute w-full h-full" style={{ zIndex: filteredEvents.length - idx }}>
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
                    <div className="flex items-center justify-center h-full">
                        <p className="text-xl text-gray-500">No events match your filters.</p>
                    </div>
                )}
            </div>
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
            {lastDirection ? (
                <p className="mt-4 text-lg text-warm-coral">You swiped {lastDirection === 'right' ? 'right (Join)' : 'left (Pass)'}</p>
            ) : (
                <p className="mt-4 text-gray-500">Swipe a card to get started!</p>
            )}
        </div>
    );
};

export default SwipeInterface;
