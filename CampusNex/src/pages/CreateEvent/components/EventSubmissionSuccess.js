// src/pages/CreateEvent/components/EventSubmissionSuccess.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const EventSubmissionSuccess = () => {
    const navigate = useNavigate();

    return (
        <div className="w-full max-w-xl rounded-3xl bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 p-10 shadow-lg flex flex-col items-center">
            <h1 className="text-blue-900 text-4xl font-bold mb-6 text-center">Event Submitted!</h1>
            <div className="w-full bg-blue-200 rounded-xl p-6 mb-8">
                <h2 className="text-xl font-semibold text-center mb-4">What happens next?</h2>
                <ul className="list-disc pl-6 text-gray-700 text-base">
                    <li>Your event has been published and is now visible to everyone</li>
                    <li>You can manage your event from your organizer dashboard</li>
                    <li>You'll receive notifications when people RSVP to your event</li>
                </ul>
            </div>
            <div className="flex gap-4">
                <button
                    onClick={() => navigate('/organizer-dashboard')}
                    className="bg-blue-500 text-white px-8 py-3 rounded font-semibold text-lg hover:bg-blue-600 transition-colors duration-200"
                >
                    Go to Dashboard
                </button>
                <button
                    onClick={() => navigate('/create-event')}
                    className="bg-orange-500 text-white px-8 py-3 rounded font-semibold text-lg hover:bg-orange-600 transition-colors duration-200"
                >
                    Create Another Event
                </button>
            </div>
        </div>
    );
};

export default EventSubmissionSuccess;