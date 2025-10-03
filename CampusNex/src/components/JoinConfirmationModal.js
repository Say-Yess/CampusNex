// src/components/JoinConfirmationModal.js
import React from 'react';

const JoinConfirmationModal = ({ isOpen, onClose, event, onConfirm }) => {
    if (!isOpen || !event) return null;

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const formatTime = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        return `${start.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit'
        })} - ${end.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit'
        })}`;
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-2xl relative">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold">Join Event</h2>
                            <p className="text-blue-100 text-sm">Confirm your attendance</p>
                        </div>
                    </div>
                </div>

                <div className="p-6">
                    {/* Event Details */}
                    <div className="mb-6">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">{event.title}</h3>

                        {event.imageUrl && (
                            <div className="mb-4">
                                <img
                                    src={event.imageUrl}
                                    alt={event.title}
                                    className="w-full h-48 object-cover rounded-lg"
                                />
                            </div>
                        )}

                        <div className="space-y-3">
                            {/* Date */}
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <div className="font-semibold text-gray-900">
                                        {formatDate(event.startDate)}
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        {formatTime(event.startDate, event.endDate)}
                                    </div>
                                </div>
                            </div>

                            {/* Location */}
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <div className="font-semibold text-gray-900">{event.location}</div>
                                    <div className="text-sm text-gray-600">Event Location</div>
                                </div>
                            </div>

                            {/* Category */}
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                    </svg>
                                </div>
                                <div>
                                    <div className="font-semibold text-gray-900">{event.category}</div>
                                    <div className="text-sm text-gray-600">Category</div>
                                </div>
                            </div>
                        </div>

                        {event.description && (
                            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                                <p className="text-gray-700 text-sm">{event.description}</p>
                            </div>
                        )}
                    </div>

                    {/* Confirmation Message */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                        <div className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="font-semibold text-blue-900 mb-1">Ready to join this event?</h4>
                                <p className="text-blue-800 text-sm">
                                    By confirming, you'll be added to the attendee list and receive updates about this event.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                        <button
                            onClick={() => onConfirm(event.id, 'attending')}
                            className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Yes, I'll Join!
                        </button>
                        <button
                            onClick={onClose}
                            className="flex-1 bg-gray-400 hover:bg-gray-500 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                    </div>

                    <div className="mt-4 text-center">
                        <button
                            onClick={() => onConfirm(event.id, 'not-attending')}
                            className="text-orange-600 hover:text-orange-700 text-sm font-medium underline"
                        >
                            Not interested in this event
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JoinConfirmationModal;