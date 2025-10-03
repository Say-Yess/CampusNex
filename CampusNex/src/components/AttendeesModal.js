// src/components/AttendeesModal.js
import React, { useState, useEffect } from 'react';

const AttendeesModal = ({ isOpen, onClose, event }) => {
    const [attendees, setAttendees] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (isOpen && event) {
            fetchAttendees();
        }
    }, [isOpen, event]);

    const fetchAttendees = async () => {
        setLoading(true);
        setError('');
        try {
            // For demo purposes, we'll use mock data since the API might not be available
            const mockAttendees = [
                {
                    id: 1,
                    name: 'Sarah Johnson',
                    email: 'sarah.johnson@example.com',
                    status: 'attending',
                    rsvpDate: new Date('2025-09-15'),
                    profileImage: null
                },
                {
                    id: 2,
                    name: 'Michael Chen',
                    email: 'michael.chen@example.com',
                    status: 'attending',
                    rsvpDate: new Date('2025-09-16'),
                    profileImage: null
                },
                {
                    id: 3,
                    name: 'Emma Rodriguez',
                    email: 'emma.rodriguez@example.com',
                    status: 'attending',
                    rsvpDate: new Date('2025-09-18'),
                    profileImage: null
                },
                {
                    id: 4,
                    name: 'David Patel',
                    email: 'david.patel@example.com',
                    status: 'interested',
                    rsvpDate: new Date('2025-09-20'),
                    profileImage: null
                },
                {
                    id: 5,
                    name: 'Lisa Wong',
                    email: 'lisa.wong@example.com',
                    status: 'attending',
                    rsvpDate: new Date('2025-09-22'),
                    profileImage: null
                }
            ];

            // Use mock data for demo (API method getEventAttendees not implemented yet)
            setAttendees(mockAttendees);
        } catch (err) {
            setError('Failed to load attendees');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen || !event) return null;

    const attendingCount = attendees.filter(a => a.status === 'attending').length;
    const interestedCount = attendees.filter(a => a.status === 'interested').length;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-6 rounded-t-2xl relative">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <h2 className="text-2xl font-bold mb-2">Event Attendees</h2>
                    <p className="text-blue-100 text-sm">{event.title}</p>
                </div>

                <div className="p-6">
                    {/* Statistics */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                            <div className="text-2xl font-bold text-green-600">{attendingCount}</div>
                            <div className="text-sm text-green-700">Attending</div>
                        </div>
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                            <div className="text-2xl font-bold text-blue-600">{interestedCount}</div>
                            <div className="text-sm text-blue-700">Interested</div>
                        </div>
                    </div>

                    {loading ? (
                        <div className="text-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                            <p className="mt-4 text-gray-600">Loading attendees...</p>
                        </div>
                    ) : error ? (
                        <div className="text-center py-12">
                            <div className="text-red-500 mb-4">
                                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                </svg>
                            </div>
                            <p className="text-red-600">{error}</p>
                        </div>
                    ) : attendees.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="text-gray-400 mb-4">
                                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <p className="text-gray-500">No attendees yet</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                Attendee List ({attendees.length})
                            </h3>
                            {attendees.map((attendee) => (
                                <div key={attendee.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                                            {attendee.profileImage ? (
                                                <img
                                                    src={attendee.profileImage}
                                                    alt={attendee.name}
                                                    className="w-10 h-10 rounded-full object-cover"
                                                />
                                            ) : (
                                                <span className="text-white font-semibold text-sm">
                                                    {attendee.name.split(' ').map(n => n[0]).join('')}
                                                </span>
                                            )}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">{attendee.name}</p>
                                            <p className="text-sm text-gray-500">{attendee.email}</p>
                                            <p className="text-xs text-gray-400">
                                                RSVP'd on {attendee.rsvpDate.toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                    <div>
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${attendee.status === 'attending'
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-blue-100 text-blue-800'
                                            }`}>
                                            {attendee.status === 'attending' ? '✓ Attending' : '★ Interested'}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {attendees.length > 0 && (
                        <div className="mt-6 pt-4 border-t border-gray-200">
                            <div className="flex gap-3">
                                <button
                                    onClick={() => {
                                        const csvContent = "data:text/csv;charset=utf-8,"
                                            + "Name,Email,Status,RSVP Date\n"
                                            + attendees.map(a => `${a.name},${a.email},${a.status},${a.rsvpDate.toLocaleDateString()}`).join("\n");
                                        const encodedUri = encodeURI(csvContent);
                                        const link = document.createElement("a");
                                        link.setAttribute("href", encodedUri);
                                        link.setAttribute("download", `${event.title}_attendees.csv`);
                                        document.body.appendChild(link);
                                        link.click();
                                        document.body.removeChild(link);
                                    }}
                                    className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center gap-2"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    Export CSV
                                </button>
                                <button
                                    onClick={onClose}
                                    className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AttendeesModal;