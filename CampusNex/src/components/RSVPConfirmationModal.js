// src/components/RSVPConfirmationModal.js
import React, { useState } from 'react';
import { addToGoogleCalendar, getCalendarProviders } from '../utils/googleCalendar';

const RSVPConfirmationModal = ({ isOpen, onClose, event, onConfirm, onCancel }) => {
    const [notifications, setNotifications] = useState({
        eventReminders: true,
        scheduleUpdate: true,
        emailUpdate: true
    });

    const [addToCalendar, setAddToCalendar] = useState(true);
    const [showCalendarOptions, setShowCalendarOptions] = useState(false);

    const handleToggle = (key) => {
        setNotifications(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const handleConfirm = () => {
        // If user wants to add to calendar, open Google Calendar
        if (addToCalendar && event) {
            addToGoogleCalendar(event);
        }
        onConfirm({ notifications, addToCalendar });
    };

    const handleCalendarAction = (provider) => {
        provider.action();
        setShowCalendarOptions(false);
    };

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'short',
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

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="bg-blue-600 text-white p-6 rounded-t-2xl relative">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <h2 className="text-xl font-bold mb-1">{event?.title}</h2>
                    <p className="text-blue-100 text-sm">Join For An Amazing Event</p>
                </div>

                <div className="p-6">
                    {/* Event Details */}
                    <div className="space-y-4 mb-6">
                        {/* Date */}
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div>
                                <div className="font-semibold text-gray-900">
                                    {formatDate(event?.startDate)}
                                </div>
                                <div className="text-sm text-gray-600">
                                    {formatTime(event?.startDate, event?.endDate)}
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
                                <div className="font-semibold text-gray-900">{event?.location}</div>
                                <div className="text-sm text-gray-600">Event Location</div>
                            </div>
                        </div>
                    </div>

                    {/* Calendar Integration */}
                    <div className="bg-blue-50 rounded-lg p-4 mb-6">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div>
                                <div className="font-semibold text-gray-900">Add to Calendar</div>
                                <div className="text-xs text-gray-600">
                                    Save this event to your calendar with all details and reminders
                                </div>
                            </div>
                        </div>

                        {!showCalendarOptions ? (
                            <button
                                onClick={() => setShowCalendarOptions(true)}
                                className="w-full py-2 px-4 rounded-lg font-medium transition-colors bg-blue-600 text-white hover:bg-blue-700"
                            >
                                <div className="flex items-center justify-center gap-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    Choose Calendar
                                </div>
                            </button>
                        ) : (
                            <div className="space-y-2">
                                {getCalendarProviders(event).map((provider, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleCalendarAction(provider)}
                                        className={`w-full py-2 px-4 rounded-lg font-medium transition-colors text-white ${provider.color} flex items-center justify-center gap-2`}
                                    >
                                        <span>{provider.icon}</span>
                                        {provider.name}
                                    </button>
                                ))}
                                <button
                                    onClick={() => setShowCalendarOptions(false)}
                                    className="w-full py-1 px-4 rounded-lg font-medium transition-colors bg-gray-200 text-gray-700 hover:bg-gray-300 text-sm"
                                >
                                    Cancel
                                </button>
                            </div>
                        )}

                        <div className="flex items-center gap-2 mt-3">
                            <input
                                type="checkbox"
                                id="addToCalendar"
                                checked={addToCalendar}
                                onChange={(e) => setAddToCalendar(e.target.checked)}
                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <label htmlFor="addToCalendar" className="text-sm text-gray-700">
                                Automatically open calendar when confirming RSVP
                            </label>
                        </div>
                    </div>

                    {/* Notification Preferences */}
                    <div className="mb-6">
                        <h3 className="font-semibold text-gray-900 mb-4">Notification Preference</h3>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-gray-700">Event Reminders</span>
                                <button
                                    onClick={() => handleToggle('eventReminders')}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${notifications.eventReminders ? 'bg-green-500' : 'bg-gray-300'
                                        }`}
                                >
                                    <span
                                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${notifications.eventReminders ? 'translate-x-6' : 'translate-x-1'
                                            }`}
                                    />
                                </button>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-700">Schedule Update</span>
                                <button
                                    onClick={() => handleToggle('scheduleUpdate')}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${notifications.scheduleUpdate ? 'bg-green-500' : 'bg-gray-300'
                                        }`}
                                >
                                    <span
                                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${notifications.scheduleUpdate ? 'translate-x-6' : 'translate-x-1'
                                            }`}
                                    />
                                </button>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-700">Email Update</span>
                                <button
                                    onClick={() => handleToggle('emailUpdate')}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${notifications.emailUpdate ? 'bg-green-500' : 'bg-gray-300'
                                        }`}
                                >
                                    <span
                                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${notifications.emailUpdate ? 'translate-x-6' : 'translate-x-1'
                                            }`}
                                    />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                        <button
                            onClick={handleConfirm}
                            className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Yes, I'll Attend
                        </button>
                        <button
                            onClick={() => onCancel('not-attending')}
                            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                            Can't Make It
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RSVPConfirmationModal;