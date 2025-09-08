import React from 'react';

const RSVPResultPopup = ({ confirmed, onClose }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
            <div className="relative w-[700px] h-[120px] bg-[#85CEB6]/30 rounded-2xl border border-[#10B981] flex items-center px-8">
                <div className="flex items-center">
                    <div className="w-12 h-12 mr-6 flex items-center justify-center">
                        {confirmed ? (
                            <span className="block w-11 h-9 border-4 border-[#10B981] rounded-lg"></span>
                        ) : (
                            <span className="block w-10 h-10 border-4 border-[#10B981] rounded-full"></span>
                        )}
                    </div>
                    <div>
                        {confirmed ? (
                            <span className="text-[#10B981] text-2xl font-inter font-medium capitalize">RSVP confirmed! We're excited to see you there.</span>
                        ) : (
                            <span className="text-[#10B981] text-2xl font-inter font-medium capitalize">Thank you for letting us know.<br />We’ll miss you</span>
                        )}
                    </div>
                </div>
                <button
                    className="absolute top-2 right-4 text-gray-400 text-2xl font-bold"
                    onClick={onClose}
                    aria-label="Close"
                >×</button>
            </div>
        </div>
    );
};

export default RSVPResultPopup;
