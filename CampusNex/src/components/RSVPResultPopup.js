import React from 'react';
import { Modal, Button, Alert } from './ui';

const RSVPResultPopup = ({ confirmed, onClose }) => {
    return (
        <Modal 
            isOpen={true} 
            onClose={onClose}
            size="md"
            className="p-6"
        >
            <div className="text-center">
                {confirmed ? (
                    <>
                        <div className="w-20 h-20 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">RSVP Confirmed!</h3>
                        <p className="text-gray-600 mb-6">
                            You're all set! We've added this event to your calendar and will send you reminders as the date approaches.
                        </p>
                        <Alert type="success" className="mb-6">
                            Your spot has been reserved.
                        </Alert>
                    </>
                ) : (
                    <>
                        <div className="w-20 h-20 bg-gray-100 rounded-full mx-auto flex items-center justify-center mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">RSVP Cancelled</h3>
                        <p className="text-gray-600 mb-6">
                            You've declined this event. You can always RSVP again if your plans change.
                        </p>
                        <Alert type="info" className="mb-6">
                            Your response has been recorded.
                        </Alert>
                    </>
                )}
                
                <div className="flex justify-center gap-4">
                    <Button 
                        variant="primary" 
                        onClick={onClose}
                    >
                        {confirmed ? 'Great!' : 'Close'}
                    </Button>
                    {confirmed && (
                        <Button 
                            variant="secondary" 
                            onClick={onClose}
                        >
                            View Event Details
                        </Button>
                    )}
                </div>
            </div>
        </Modal>
    );
};

export default RSVPResultPopup;