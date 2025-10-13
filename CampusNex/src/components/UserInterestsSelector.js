// src/components/UserInterestsSelector.js
import React, { useState, useEffect } from 'react';
import { Check, X } from 'lucide-react';

const UserInterestsSelector = ({ currentInterests = [], onSave, onCancel }) => {
    const [selectedInterests, setSelectedInterests] = useState(currentInterests);
    const [loading, setLoading] = useState(false);

    const availableInterests = [
        'Academic',
        'Sports',
        'Cultural',
        'Social',
        'Career',
        'Workshop',
        'Technology',
        'Arts',
        'Music',
        'Business',
        'Volunteer',
        'Health & Wellness',
        'Gaming',
        'Research',
        'Language'
    ];

    const handleInterestToggle = (interest) => {
        setSelectedInterests(prev =>
            prev.includes(interest)
                ? prev.filter(i => i !== interest)
                : [...prev, interest]
        );
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            await onSave(selectedInterests);
        } catch (error) {
            console.error('Error saving interests:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
                Select Your Interests
            </h3>
            <p className="text-gray-600 mb-6">
                Choose categories you're interested in to get personalized event recommendations.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                {availableInterests.map(interest => (
                    <button
                        key={interest}
                        onClick={() => handleInterestToggle(interest)}
                        className={`p-3 rounded-lg border-2 transition-all duration-200 text-sm font-medium ${selectedInterests.includes(interest)
                                ? 'border-blue-500 bg-blue-50 text-blue-700'
                                : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                            }`}
                    >
                        <div className="flex items-center justify-between">
                            <span>{interest}</span>
                            {selectedInterests.includes(interest) && (
                                <Check size={16} className="text-blue-600" />
                            )}
                        </div>
                    </button>
                ))}
            </div>

            <div className="flex gap-3 justify-end">
                <button
                    onClick={onCancel}
                    className="flex items-center gap-2 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    disabled={loading}
                >
                    <X size={16} />
                    Cancel
                </button>
                <button
                    onClick={handleSave}
                    disabled={loading}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                    <Check size={16} />
                    {loading ? 'Saving...' : `Save Interests (${selectedInterests.length})`}
                </button>
            </div>
        </div>
    );
};

export default UserInterestsSelector;