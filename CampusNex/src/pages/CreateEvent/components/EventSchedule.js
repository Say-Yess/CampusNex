// src/pages/CreateEvent/components/EventSchedule.js
import React from 'react';

const EventSchedule = ({ form = {}, onChange = () => { } }) => {
    const calculateDuration = () => {
        if (!form.startDate || !form.endDate) return null;

        const start = new Date(form.startDate);
        const end = new Date(form.endDate);
        const diffMs = end - start;

        if (diffMs <= 0) {
            return "End time must be after start time";
        }

        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

        if (diffHours === 0) {
            return `${diffMinutes} minutes`;
        } else if (diffMinutes === 0) {
            return `${diffHours} hour${diffHours > 1 ? 's' : ''}`;
        } else {
            return `${diffHours} hour${diffHours > 1 ? 's' : ''} ${diffMinutes} minutes`;
        }
    };

    return (
        <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Event Schedule
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DateTimeInput
                    label="Start Date & Time"
                    name="startDate"
                    value={form.startDate || ''}
                    onChange={onChange}
                    helpText="When does your event start?"
                    min={new Date().toISOString().slice(0, 16)}
                />
                <DateTimeInput
                    label="End Date & Time"
                    name="endDate"
                    value={form.endDate || ''}
                    onChange={onChange}
                    helpText="When does your event end?"
                    min={form.startDate || new Date().toISOString().slice(0, 16)}
                />
            </div>
            {form.startDate && form.endDate && (
                <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-2 text-sm text-blue-800">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Duration: {calculateDuration()}
                    </div>
                </div>
            )}
        </div>
    );
};

const DateTimeInput = ({ label = '', name = '', value = '', onChange = () => { }, helpText = '', min = '' }) => (
    <div>
        <label className="block text-gray-700 font-semibold mb-2">{label}</label>
        <div className="relative">
            <input
                type="datetime-local"
                name={name}
                value={value}
                onChange={onChange}
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                required
                min={min}
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>
        </div>
        <p className="text-xs text-gray-500 mt-1">{helpText}</p>
    </div>
);

export default EventSchedule;