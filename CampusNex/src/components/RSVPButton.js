import React from 'react';

const RSVPButton = ({ event, onConfirm, onCancel }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="relative w-[980px] bg-white rounded-[60px] shadow-2xl p-0 overflow-hidden">
                {/* Header */}
                <div className="w-full h-[190px] bg-royal-blue rounded-t-[60px] flex flex-col justify-center px-16">
                    <h2 className="text-white text-5xl font-poppins font-bold mb-2 mt-8">{event.title}</h2>
                    <p className="text-white text-2xl font-poppins font-medium">join for an amazing event</p>
                </div>
                {/* Event Info */}
                <div className="flex gap-8 px-16 py-8">
                    <div className="flex flex-col items-center">
                        <div className="w-[129px] h-[129px] bg-[#A9BBED] rounded-full mb-2" />
                        <div className="w-[73px] h-[73px] outline outline-4 outline-black rounded-full" />
                    </div>
                    <div>
                        <div className="text-black text-3xl font-inter font-bold mb-2">{event.date}</div>
                        <div className="text-[#646464] text-2xl font-inter font-medium mb-4">{event.time}</div>
                    </div>
                </div>
                <div className="flex gap-8 px-16 pb-8">
                    <div className="flex flex-col items-center">
                        <div className="w-[129px] h-[129px] bg-[#A9EDBE] rounded-full mb-2" />
                        <div className="w-[58px] h-[74px] bg-[#A60000] rounded-lg" />
                    </div>
                    <div>
                        <div className="text-black text-3xl font-inter font-bold mb-2">{event.venue}</div>
                        <div className="text-black text-2xl font-inter font-light">Russian Federation Blvd (110)</div>
                    </div>
                </div>
                {/* Google Calendar Integration */}
                <div className="mx-16 mb-8 bg-[#DDEBFF] rounded-2xl border border-[#7EB3FF] p-8 flex flex-col gap-4">
                    <div className="flex items-center gap-4 mb-2">
                        <div className="w-[82px] h-[82px] bg-[#3A66E2] rounded-full flex items-center justify-center">
                            <span className="text-white text-5xl font-inter font-bold">G</span>
                        </div>
                        <div>
                            <div className="text-black text-2xl font-inter font-bold">google calendar integrate</div>
                            <div className="text-black text-base font-inter font-normal">Automatically sync this event to your Google Calendar with all details, location, and reminders.</div>
                        </div>
                    </div>
                    <button className="w-full h-[60px] bg-[#4894FF] rounded-xl shadow text-white text-2xl font-inter font-bold flex items-center justify-center gap-4">
                        <span className="w-[50px] h-[50px] outline outline-4 outline-white rounded-full" />
                        add to google calendar
                    </button>
                </div>
                {/* Notification Preferences */}
                <div className="mx-16 mb-8 bg-[#F0F0F0] rounded-2xl border border-[#CFCFCF] p-8">
                    <div className="text-black text-2xl font-inter font-bold mb-4">notification preference</div>
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-[#434343] text-xl font-inter font-medium">Event reminders</span>
                        <div className="w-[74px] h-[28px] bg-[#34C759] rounded-full flex items-center">
                            <div className="w-[39px] h-[24px] bg-white rounded-full ml-auto" />
                        </div>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-[#434343] text-xl font-inter font-medium">schedule Update</span>
                        <div className="w-[74px] h-[28px] bg-[#34C759] rounded-full flex items-center">
                            <div className="w-[39px] h-[24px] bg-white rounded-full ml-auto" />
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-[#434343] text-xl font-inter font-medium">Email Update</span>
                        <div className="w-[74px] h-[28px] bg-[#34C759] rounded-full flex items-center">
                            <div className="w-[39px] h-[24px] bg-white rounded-full ml-auto" />
                        </div>
                    </div>
                </div>
                {/* Confirm/Cancel Buttons */}
                <div className="flex gap-8 mx-16 mb-8">
                    <button
                        className="w-[404px] h-[95px] bg-[#00C684] rounded-xl border-2 border-[#10B981] text-white text-3xl font-inter font-bold"
                        onClick={onConfirm}
                    >
                        i’ll attend
                    </button>
                    <button
                        className="w-[404px] h-[95px] bg-[#A7A7A7] rounded-xl border border-[#6C6C6C] text-white text-3xl font-inter font-bold"
                        onClick={onCancel}
                    >
                        can’t make it
                    </button>
                </div>
                {/* Close Icon */}
                <button
                    className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center"
                    onClick={onCancel}
                    aria-label="Close"
                >
                    <span className="block w-8 h-1 bg-gray-400 rotate-45 absolute"></span>
                    <span className="block w-8 h-1 bg-gray-400 -rotate-45 absolute"></span>
                </button>
            </div>
        </div>
    );
};

export default RSVPButton;
