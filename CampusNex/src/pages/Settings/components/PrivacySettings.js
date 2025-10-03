// src/pages/Settings/components/PrivacySettings.js
import React from 'react';

const PrivacySettings = ({
    privacySettings,
    handlePrivacyChange,
    handlePrivacySubmit,
    loading,
    successMessage,
    errorMessage
}) => {
    const privacyOptions = [
        {
            id: 'profileVisibility',
            title: 'Profile Visibility',
            description: 'Control who can see your profile information',
            type: 'radio',
            options: [
                { value: 'public', label: 'Public - Anyone can see your profile' },
                { value: 'campus', label: 'Campus only - Only users from your campus' },
                { value: 'private', label: 'Private - Only you can see your profile' }
            ]
        },
        {
            id: 'eventVisibility',
            title: 'Event Attendance Visibility',
            description: 'Control who can see events you\'re attending',
            type: 'radio',
            options: [
                { value: 'public', label: 'Public - Anyone can see your events' },
                { value: 'friends', label: 'Friends only - Only your connections' },
                { value: 'private', label: 'Private - Only you can see your events' }
            ]
        }
    ];

    const dataOptions = [
        {
            key: 'allowSearch',
            label: 'Allow others to find me by email',
            description: 'Let other users find your profile using your email address'
        },
        {
            key: 'showOnlineStatus',
            label: 'Show online status',
            description: 'Display when you\'re actively using the platform'
        },
        {
            key: 'allowEventRecommendations',
            label: 'Receive personalized event recommendations',
            description: 'Use your activity to suggest relevant events'
        },
        {
            key: 'allowAnalytics',
            label: 'Help improve our service',
            description: 'Share anonymous usage data to help us improve the platform'
        }
    ];

    return (
        <div className="p-6">
            <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Privacy Settings</h2>
                <p className="text-gray-600">Control your privacy and data sharing preferences</p>
            </div>

            {successMessage && (
                <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-700">{successMessage}</p>
                </div>
            )}

            {errorMessage && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-700">{errorMessage}</p>
                </div>
            )}

            <form onSubmit={handlePrivacySubmit} className="space-y-8">
                {/* Visibility Settings */}
                {privacyOptions.map((section) => (
                    <div key={section.id} className="border border-gray-200 rounded-lg p-6">
                        <div className="mb-4">
                            <h3 className="text-lg font-medium text-gray-900">{section.title}</h3>
                            <p className="text-sm text-gray-600">{section.description}</p>
                        </div>

                        <div className="space-y-3">
                            {section.options.map((option) => (
                                <div key={option.value} className="flex items-start">
                                    <input
                                        type="radio"
                                        id={`${section.id}-${option.value}`}
                                        name={section.id}
                                        value={option.value}
                                        checked={privacySettings[section.id] === option.value}
                                        onChange={handlePrivacyChange}
                                        className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                    />
                                    <label
                                        htmlFor={`${section.id}-${option.value}`}
                                        className="ml-3 text-sm text-gray-700"
                                    >
                                        <span className="font-medium">{option.label.split(' - ')[0]}</span>
                                        {option.label.includes(' - ') && (
                                            <span className="text-gray-500"> - {option.label.split(' - ')[1]}</span>
                                        )}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                {/* Data & Permissions */}
                <div className="border border-gray-200 rounded-lg p-6">
                    <div className="mb-4">
                        <h3 className="text-lg font-medium text-gray-900">Data & Permissions</h3>
                        <p className="text-sm text-gray-600">Control how your data is used and shared</p>
                    </div>

                    <div className="space-y-4">
                        {dataOptions.map((option) => (
                            <div key={option.key} className="flex items-start">
                                <input
                                    type="checkbox"
                                    id={option.key}
                                    name={option.key}
                                    checked={privacySettings[option.key] || false}
                                    onChange={handlePrivacyChange}
                                    className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <div className="ml-3">
                                    <label htmlFor={option.key} className="text-sm font-medium text-gray-700">
                                        {option.label}
                                    </label>
                                    <p className="text-xs text-gray-500 mt-1">{option.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Data Management */}
                <div className="border border-gray-200 rounded-lg p-6">
                    <div className="mb-4">
                        <h3 className="text-lg font-medium text-gray-900">Data Management</h3>
                        <p className="text-sm text-gray-600">Manage your personal data and account</p>
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <div>
                                <h4 className="text-sm font-medium text-gray-900">Download My Data</h4>
                                <p className="text-xs text-gray-500">Get a copy of all your data</p>
                            </div>
                            <button
                                type="button"
                                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                            >
                                Download
                            </button>
                        </div>

                        <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                            <div>
                                <h4 className="text-sm font-medium text-red-900">Delete My Account</h4>
                                <p className="text-xs text-red-600">Permanently delete your account and all data</p>
                            </div>
                            <button
                                type="button"
                                className="text-red-600 hover:text-red-700 text-sm font-medium"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        {loading ? 'Saving...' : 'Save Privacy Settings'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PrivacySettings;