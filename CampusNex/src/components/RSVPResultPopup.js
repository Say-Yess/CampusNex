import React from 'react';

const RSVPResultPopup = ({ result, onClose }) => {
    if (!result || !result.success) return null;

    const isAttending = result.type === 'attending';

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl max-w-md w-full">
                <div className="p-8 text-center">
                    {/* Success Icon */}
                    <div className={`w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center ${isAttending ? 'bg-green-100' : 'bg-orange-100'
                        }`}>
                        {isAttending ? (
                            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        ) : (
                            <svg className="w-10 h-10 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                        )}
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                        {isAttending ? 'RSVP Confirmed!' : 'Response Recorded'}
                    </h3>

                    {/* Message */}
                    <div className={`border rounded-lg p-4 mb-6 ${isAttending
                            ? 'bg-green-50 border-green-200'
                            : 'bg-orange-50 border-orange-200'
                        }`}>
                        <p className={`text-lg font-medium ${isAttending ? 'text-green-800' : 'text-orange-800'
                            }`}>
                            {result.message}
                        </p>
                    </div>

                    {isAttending && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-6">
                            <p className="text-sm text-blue-800">
                                📅 Don't forget to add this event to your calendar!
                            </p>
                        </div>
                    )}

                    <button
                        onClick={onClose}
                        className={`w-full font-semibold py-3 px-6 rounded-lg transition-colors ${isAttending
                                ? 'bg-green-600 hover:bg-green-700 text-white'
                                : 'bg-orange-600 hover:bg-orange-700 text-white'
                            }`}
                    >
                        {isAttending ? 'Great, See You There!' : 'Got It'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RSVPResultPopup;