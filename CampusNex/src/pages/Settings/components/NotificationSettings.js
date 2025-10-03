// src/pages/Settings/components/NotificationSettings.js
import React from 'react';

const NotificationSettings = ({
    notificationSettings,
    handleNotificationChange,
    handleNotificationSubmit,
    loading,
    successMessage,
    errorMessage
}) => {
    const notificationOptions = [
        {
            id: 'emailNotifications',
            title: 'Email Notifications',
            description: 'Receive notifications via email',
            options: [
                { key: 'eventUpdates', label: 'Event updates and changes' },
                { key: 'eventReminders', label: 'Event reminders (24h before)' },
                { key: 'newEvents', label: 'New events in your interests' },
                { key: 'rsvpConfirmations', label: 'RSVP confirmations' }
            ]
        },
        {
            id: 'pushNotifications',
            title: 'Push Notifications',
            description: 'Receive push notifications on your device',
            options: [
                { key: 'eventUpdates', label: 'Event updates and changes' },
                { key: 'eventReminders', label: 'Event reminders (1h before)' },
                { key: 'newEvents', label: 'New events matching your interests' },
                { key: 'socialActivity', label: 'Social activity (likes, comments)' }
            ]
        }
    ];

    return (
        <div className="p-6">
            <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Notification Preferences</h2>
                <p className="text-gray-600">Choose how you want to be notified about events and activities</p>
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

            <form onSubmit={handleNotificationSubmit} className="space-y-8">
                {notificationOptions.map((section) => (
                    <div key={section.id} className="border border-gray-200 rounded-lg p-6">
                        <div className="mb-4">
                            <h3 className="text-lg font-medium text-gray-900">{section.title}</h3>
                            <p className="text-sm text-gray-600">{section.description}</p>
                        </div>

                        <div className="space-y-4">
                            {section.options.map((option) => (
                                <div key={option.key} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id={`${section.id}-${option.key}`}
                                        name={`${section.id}.${option.key}`}
                                        checked={notificationSettings[section.id]?.[option.key] || false}
                                        onChange={handleNotificationChange}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    />
                                    <label
                                        htmlFor={`${section.id}-${option.key}`}
                                        className="ml-3 text-sm text-gray-700"
                                    >
                                        {option.label}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                <div className="border border-gray-200 rounded-lg p-6">
                    <div className="mb-4">
                        <h3 className="text-lg font-medium text-gray-900">Frequency Settings</h3>
                        <p className="text-sm text-gray-600">Control how often you receive notifications</p>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label htmlFor="digestFrequency" className="block text-sm font-medium text-gray-700 mb-2">
                                Email Digest Frequency
                            </label>
                            <select
                                id="digestFrequency"
                                name="digestFrequency"
                                value={notificationSettings.digestFrequency || 'weekly'}
                                onChange={handleNotificationChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="realtime">Real-time</option>
                                <option value="daily">Daily digest</option>
                                <option value="weekly">Weekly digest</option>
                                <option value="never">Never</option>
                            </select>
                        </div>

                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="quietHours"
                                name="quietHours"
                                checked={notificationSettings.quietHours || false}
                                onChange={handleNotificationChange}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label htmlFor="quietHours" className="ml-3 text-sm text-gray-700">
                                Enable quiet hours (10 PM - 8 AM)
                            </label>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        {loading ? 'Saving...' : 'Save Preferences'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default NotificationSettings;