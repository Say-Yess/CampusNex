// src/components/RSVPButton.js.new
import React, { useState } from 'react';
import { Modal, Button, Card, Toggle } from './ui';

const RSVPButton = ({ event, onConfirm, onCancel }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState({
        reminders: true,
        scheduleUpdates: true,
        emailUpdates: true
    });

    const handleToggle = (key) => {
        setNotifications(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const handleConfirm = () => {
        onConfirm(notifications);
        setIsOpen(false);
    };

    const handleCancel = () => {
        onCancel();
        setIsOpen(false);
    };

    return (
        <>
            <Button 
                variant="primary" 
                onClick={() => setIsOpen(true)}
                className="w-full"
            >
                RSVP to Event
            </Button>

            <Modal 
                isOpen={isOpen} 
                onClose={() => setIsOpen(false)}
                size="xl"
                hideCloseButton={true}
                className="p-0 rounded-3xl overflow-hidden"
            >
                {/* Header */}
                <div className="w-full bg-primary py-8 px-12 rounded-t-3xl">
                    <h2 className="text-white text-3xl font-bold mb-2">{event?.title}</h2>
                    <p className="text-white text-lg opacity-90">Join for an amazing event</p>
                </div>

                <div className="p-8">
                    {/* Event Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <Card variant="flat" padding="default" className="flex items-center space-x-4">
                            <div className="flex-shrink-0">
                                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-neutral-900">{event?.date}</h3>
                                <p className="text-neutral-600">{event?.time}</p>
                            </div>
                        </Card>

                        <Card variant="flat" padding="default" className="flex items-center space-x-4">
                            <div className="flex-shrink-0">
                                <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-secondary" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-neutral-900">{event?.venue}</h3>
                                <p className="text-neutral-600">Campus Location</p>
                            </div>
                        </Card>
                    </div>

                    {/* Google Calendar Integration */}
                    <Card variant="default" padding="default" className="mb-8 bg-primary-50 border-primary-200">
                        <div className="flex items-start space-x-4 mb-4">
                            <div className="flex-shrink-0">
                                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                                    <span className="text-white text-xl font-bold">G</span>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-neutral-900">Google Calendar Integration</h3>
                                <p className="text-neutral-700">Automatically sync this event to your Google Calendar with all details, location, and reminders.</p>
                            </div>
                        </div>
                        <Button 
                            variant="primary" 
                            className="w-full flex items-center justify-center space-x-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                            </svg>
                            <span>Add to Google Calendar</span>
                        </Button>
                    </Card>

                    {/* Notification Preferences */}
                    <Card variant="default" padding="default" className="mb-8 bg-neutral-50 border-neutral-200">
                        <h3 className="text-lg font-bold text-neutral-900 mb-4">Notification Preferences</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-neutral-700">Event reminders</span>
                                <Toggle 
                                    checked={notifications.reminders}
                                    onChange={() => handleToggle('reminders')}
                                />
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-neutral-700">Schedule updates</span>
                                <Toggle 
                                    checked={notifications.scheduleUpdates}
                                    onChange={() => handleToggle('scheduleUpdates')}
                                />
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-neutral-700">Email updates</span>
                                <Toggle 
                                    checked={notifications.emailUpdates}
                                    onChange={() => handleToggle('emailUpdates')}
                                />
                            </div>
                        </div>
                    </Card>

                    {/* Action Buttons */}
                    <div className="flex flex-col md:flex-row gap-4">
                        <Button 
                            variant="primary" 
                            size="lg"
                            onClick={handleConfirm}
                            className="flex-1"
                        >
                            I'll Attend
                        </Button>
                        <Button 
                            variant="tertiary" 
                            size="lg"
                            onClick={handleCancel}
                            className="flex-1"
                        >
                            Can't Make It
                        </Button>
                    </div>
                </div>

                {/* Close Button */}
                <button
                    className="absolute top-4 right-4 text-white hover:text-neutral-200 focus:outline-none"
                    onClick={() => setIsOpen(false)}
                    aria-label="Close"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </Modal>
        </>
    );
};

export default RSVPButton;