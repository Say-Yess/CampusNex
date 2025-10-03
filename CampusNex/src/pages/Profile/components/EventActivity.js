// src/pages/Profile/components/EventActivity.js
import React from 'react';
import { Link } from 'react-router-dom';

const EventActivity = ({ events, handleEventClick }) => {
    return (
        <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Event Activity</h2>
            {events.length > 0 ? (
                <div className="space-y-4">
                    {events.map(event => (
                        <EventItem
                            key={event.id}
                            event={event}
                            onClick={() => handleEventClick(event.id)}
                        />
                    ))}
                </div>
            ) : (
                <EmptyEventState />
            )}
        </div>
    );
};

const EventItem = ({ event, onClick }) => (
    <div
        onClick={onClick}
        className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-gray-300 cursor-pointer transition-colors duration-200"
    >
        <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                </div>
            </div>
            <div>
                <p className="text-sm font-medium text-gray-900">{event.title}</p>
                <p className="text-sm text-gray-500">
                    {new Date(event.startDate || event.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })}
                </p>
            </div>
        </div>
        <div className="flex items-center space-x-2">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${event.rsvpStatus === 'attending'
                    ? 'bg-green-100 text-green-800'
                    : event.rsvpStatus === 'interested'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                }`}>
                {event.rsvpStatus === 'attending' ? 'Attending' :
                    event.rsvpStatus === 'interested' ? 'Interested' : 'Not Attending'}
            </span>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
        </div>
    </div>
);

const EmptyEventState = () => (
    <div className="text-center py-8">
        <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <p className="text-gray-500">No events found</p>
        <p className="text-sm text-gray-400 mt-1">You haven't RSVP'd to any events yet.</p>
        <Link
            to="/discovery"
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700"
        >
            Discover Events
        </Link>
    </div>
);

export default EventActivity;