// src/pages/OrganizerDashboard/components/MyEvents.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const MyEvents = ({
    events,
    handleEditEvent,
    handleViewAttendees,
    handleDeleteEvent,
    getEventStatus,
    formatEventDate
}) => {
    const navigate = useNavigate();

    if (events.length === 0) {
        return (
            <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-gray-900">My Events</h2>
                    <CreateEventButton onClick={() => navigate('/create-event')} />
                </div>
                <EmptyEventsState onCreateEvent={() => navigate('/create-event')} />
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">My Events</h2>
                <CreateEventButton onClick={() => navigate('/create-event')} />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {events.map((event) => (
                    <EventCard
                        key={event.id}
                        event={event}
                        onEdit={() => handleEditEvent(event)}
                        onViewAttendees={() => handleViewAttendees(event)}
                        onDelete={() => handleDeleteEvent(event.id)}
                        onViewDetails={() => navigate(`/event/${event.id}`)}
                        getEventStatus={getEventStatus}
                        formatEventDate={formatEventDate}
                    />
                ))}
            </div>
        </div>
    );
};

const CreateEventButton = ({ onClick }) => (
    <button
        onClick={onClick}
        className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors duration-200 flex items-center gap-2"
    >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Create New Event
    </button>
);

const EmptyEventsState = ({ onCreateEvent }) => (
    <div className="text-center py-12">
        <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No events yet</h3>
        <p className="text-gray-500 mb-4">Get started by creating your first event</p>
        <button
            onClick={onCreateEvent}
            className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors duration-200"
        >
            Create Event
        </button>
    </div>
);

const EventCard = ({
    event,
    onEdit,
    onViewAttendees,
    onDelete,
    onViewDetails,
    getEventStatus,
    formatEventDate
}) => {
    const { status, color } = getEventStatus(event.startDate, event.endDate);

    return (
        <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{event.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {formatEventDate(event.startDate)}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {event.location}
                    </div>
                    <div className="flex items-center gap-3 mb-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${color === 'blue' ? 'bg-blue-100 text-blue-800' :
                                color === 'green' ? 'bg-green-100 text-green-800' :
                                    'bg-gray-100 text-gray-800'
                            }`}>
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                        </span>
                        <span className="text-xs text-gray-500">
                            {event.attendees?.length || event.capacity || 0} attendees
                        </span>
                    </div>
                </div>
                {event.imageUrl && (
                    <img
                        src={event.imageUrl}
                        alt={event.title}
                        className="w-16 h-16 rounded-lg object-cover ml-4"
                    />
                )}
            </div>

            <EventActions
                onEdit={onEdit}
                onViewAttendees={onViewAttendees}
                onDelete={onDelete}
                onViewDetails={onViewDetails}
            />
        </div>
    );
};

const EventActions = ({ onEdit, onViewAttendees, onDelete, onViewDetails }) => (
    <div className="space-y-2">
        <div className="flex items-center gap-2">
            <button
                onClick={onEdit}
                className="flex-1 bg-orange-50 text-orange-700 px-3 py-2 rounded-lg hover:bg-orange-100 transition-colors duration-200 flex items-center justify-center gap-1 text-sm"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit
            </button>
            <button
                onClick={onViewAttendees}
                className="flex-1 bg-green-50 text-green-700 px-3 py-2 rounded-lg hover:bg-green-100 transition-colors duration-200 flex items-center justify-center gap-1 text-sm"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Attendees
            </button>
            <button
                onClick={onDelete}
                className="bg-red-50 text-red-700 px-3 py-2 rounded-lg hover:bg-red-100 transition-colors duration-200"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 01 16.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            </button>
        </div>
        <button
            onClick={onViewDetails}
            className="w-full bg-blue-50 text-blue-700 px-3 py-2 rounded-lg hover:bg-blue-100 transition-colors duration-200 flex items-center justify-center gap-2 text-sm"
        >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            View Event Details
        </button>
    </div>
);

export default MyEvents;