// src/pages/Settings/components/SecuritySettings.js
import React, { useState } from 'react';

const SecuritySettings = ({
    securitySettings,
    handleSecuritySubmit,
    loading,
    successMessage,
    errorMessage
}) => {
    const [passwords, setPasswords] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [showPasswords, setShowPasswords] = useState({
        current: false,
        new: false,
        confirm: false
    });

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswords(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const togglePasswordVisibility = (field) => {
        setShowPasswords(prev => ({
            ...prev,
            [field]: !prev[field]
        }));
    };

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        if (passwords.newPassword !== passwords.confirmPassword) {
            alert('New passwords do not match');
            return;
        }
        handleSecuritySubmit(e, { type: 'password', data: passwords });
    };

    const sessions = [
        {
            id: 1,
            device: 'Chrome on MacBook Pro',
            location: 'San Francisco, CA',
            lastActive: '2 minutes ago',
            current: true
        },
        {
            id: 2,
            device: 'Safari on iPhone',
            location: 'San Francisco, CA',
            lastActive: '1 hour ago',
            current: false
        },
        {
            id: 3,
            device: 'Firefox on Windows',
            location: 'New York, NY',
            lastActive: '2 days ago',
            current: false
        }
    ];

    return (
        <div className="p-6">
            <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Security Settings</h2>
                <p className="text-gray-600">Manage your account security and login preferences</p>
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

            <div className="space-y-8">
                {/* Change Password */}
                <div className="border border-gray-200 rounded-lg p-6">
                    <div className="mb-4">
                        <h3 className="text-lg font-medium text-gray-900">Change Password</h3>
                        <p className="text-sm text-gray-600">Update your password to keep your account secure</p>
                    </div>

                    <form onSubmit={handlePasswordSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-2">
                                Current Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPasswords.current ? 'text' : 'password'}
                                    id="currentPassword"
                                    name="currentPassword"
                                    value={passwords.currentPassword}
                                    onChange={handlePasswordChange}
                                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter current password"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => togglePasswordVisibility('current')}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                                >
                                    {showPasswords.current ? '👁️' : '👁️‍🗨️'}
                                </button>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
                                New Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPasswords.new ? 'text' : 'password'}
                                    id="newPassword"
                                    name="newPassword"
                                    value={passwords.newPassword}
                                    onChange={handlePasswordChange}
                                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter new password"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => togglePasswordVisibility('new')}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                                >
                                    {showPasswords.new ? '👁️' : '👁️‍🗨️'}
                                </button>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                                Must be at least 8 characters with letters, numbers and symbols
                            </p>
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                                Confirm New Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPasswords.confirm ? 'text' : 'password'}
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={passwords.confirmPassword}
                                    onChange={handlePasswordChange}
                                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Confirm new password"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => togglePasswordVisibility('confirm')}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                                >
                                    {showPasswords.confirm ? '👁️' : '👁️‍🗨️'}
                                </button>
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                {loading ? 'Updating...' : 'Update Password'}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Two-Factor Authentication */}
                <div className="border border-gray-200 rounded-lg p-6">
                    <div className="mb-4">
                        <h3 className="text-lg font-medium text-gray-900">Two-Factor Authentication</h3>
                        <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                            <h4 className="text-sm font-medium text-gray-900">
                                {securitySettings?.twoFactorEnabled ? 'Two-factor authentication is enabled' : 'Two-factor authentication is disabled'}
                            </h4>
                            <p className="text-xs text-gray-500 mt-1">
                                {securitySettings?.twoFactorEnabled
                                    ? 'Your account is protected with 2FA'
                                    : 'Secure your account with SMS or authenticator app'
                                }
                            </p>
                        </div>
                        <button
                            onClick={() => handleSecuritySubmit(null, { type: 'twoFactor', enabled: !securitySettings?.twoFactorEnabled })}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${securitySettings?.twoFactorEnabled
                                    ? 'bg-red-100 text-red-700 hover:bg-red-200'
                                    : 'bg-blue-600 text-white hover:bg-blue-700'
                                }`}
                        >
                            {securitySettings?.twoFactorEnabled ? 'Disable' : 'Enable'}
                        </button>
                    </div>
                </div>

                {/* Login Sessions */}
                <div className="border border-gray-200 rounded-lg p-6">
                    <div className="mb-4">
                        <h3 className="text-lg font-medium text-gray-900">Active Sessions</h3>
                        <p className="text-sm text-gray-600">Manage devices that are currently signed in to your account</p>
                    </div>

                    <div className="space-y-3">
                        {sessions.map((session) => (
                            <div key={session.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center">
                                        {session.current ? '💻' : '📱'}
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-900">
                                            {session.device}
                                            {session.current && <span className="text-green-600 ml-2">(Current)</span>}
                                        </h4>
                                        <p className="text-xs text-gray-500">
                                            {session.location} • Last active {session.lastActive}
                                        </p>
                                    </div>
                                </div>
                                {!session.current && (
                                    <button
                                        onClick={() => handleSecuritySubmit(null, { type: 'revokeSession', sessionId: session.id })}
                                        className="text-red-600 hover:text-red-700 text-sm font-medium"
                                    >
                                        Sign out
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-200">
                        <button
                            onClick={() => handleSecuritySubmit(null, { type: 'revokeAllSessions' })}
                            className="text-red-600 hover:text-red-700 text-sm font-medium"
                        >
                            Sign out all other sessions
                        </button>
                    </div>
                </div>

                {/* Account Recovery */}
                <div className="border border-gray-200 rounded-lg p-6">
                    <div className="mb-4">
                        <h3 className="text-lg font-medium text-gray-900">Account Recovery</h3>
                        <p className="text-sm text-gray-600">Backup options to recover your account if you lose access</p>
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div>
                                <h4 className="text-sm font-medium text-gray-900">Recovery Email</h4>
                                <p className="text-xs text-gray-500">backup-email@example.com</p>
                            </div>
                            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                                Update
                            </button>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div>
                                <h4 className="text-sm font-medium text-gray-900">Recovery Codes</h4>
                                <p className="text-xs text-gray-500">Download backup codes for account recovery</p>
                            </div>
                            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                                Generate
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SecuritySettings;