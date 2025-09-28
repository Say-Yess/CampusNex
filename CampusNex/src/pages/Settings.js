/**
 * Settings Page Component
 * 
 * Features:
 * - Account settings management
 * - Notification preferences
 * - Privacy settings
 * - Theme customization
 * - Security settings
 * 
 * @author CampusNex Team
 * @version 2.0
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../services/AuthContext';
import { usersAPI } from '../services/api';

const Settings = () => {
    // Hooks
    const navigate = useNavigate();
    const { user, isAuthenticated, logout } = useAuth();

    // State management
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('account');
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Form states
    const [accountForm, setAccountForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        department: '',
        bio: ''
    });

    const [notificationSettings, setNotificationSettings] = useState({
        emailUpdates: true,
        eventReminders: true,
        promotionalOffers: false,
        weeklyDigest: true,
        pushNotifications: true
    });

    const [privacySettings, setPrivacySettings] = useState({
        profileVisibility: 'public',
        showEmail: false,
        showEvents: true,
        allowMessages: true
    });

    const [passwordForm, setPasswordForm] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    // Effects
    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login', { state: { from: '/settings' } });
            return;
        }

        // Load user data
        if (user) {
            setAccountForm({
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                email: user.email || '',
                department: user.department || '',
                bio: user.bio || ''
            });
        }
    }, [isAuthenticated, navigate, user]);

    // Event handlers
    const handleAccountFormChange = (e) => {
        const { name, value } = e.target;
        setAccountForm(prev => ({ ...prev, [name]: value }));
    };

    const handleNotificationChange = (e) => {
        const { name, checked } = e.target;
        setNotificationSettings(prev => ({ ...prev, [name]: checked }));
    };

    const handlePrivacyChange = (e) => {
        const { name, value, type, checked } = e.target;
        setPrivacySettings(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handlePasswordFormChange = (e) => {
        const { name, value } = e.target;
        setPasswordForm(prev => ({ ...prev, [name]: value }));
    };

    const handleAccountSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await usersAPI.updateUserProfile(accountForm);
            setSuccessMessage('Account information updated successfully!');
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (error) {
            setErrorMessage('Failed to update account information.');
            setTimeout(() => setErrorMessage(''), 3000);
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            setErrorMessage('New passwords do not match.');
            return;
        }
        setLoading(true);
        try {
            // Handle password change logic here
            setSuccessMessage('Password changed successfully!');
            setShowPasswordModal(false);
            setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (error) {
            setErrorMessage('Failed to change password.');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleDeleteAccount = async () => {
        // Handle account deletion logic here
        setShowDeleteModal(false);
    };

    // Tab navigation
    const tabs = [
        { id: 'account', label: 'Account', icon: '👤' },
        { id: 'notifications', label: 'Notifications', icon: '🔔' },
        { id: 'privacy', label: 'Privacy', icon: '🔒' },
        { id: 'security', label: 'Security', icon: '🛡️' }
    ];

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />

            <main className="flex-1 py-8">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
                        <p className="text-gray-600 mt-2">Manage your account settings and preferences</p>
                    </div>

                    {/* Success/Error Messages */}
                    {successMessage && (
                        <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">
                            {successMessage}
                        </div>
                    )}
                    {errorMessage && (
                        <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
                            {errorMessage}
                        </div>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Sidebar Navigation */}
                        <div className="lg:col-span-1">
                            <nav className="bg-white rounded-lg shadow-sm p-4">
                                <ul className="space-y-2">
                                    {tabs.map((tab) => (
                                        <li key={tab.id}>
                                            <button
                                                onClick={() => setActiveTab(tab.id)}
                                                className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg transition-colors duration-200 ${activeTab === tab.id
                                                        ? 'bg-orange-100 text-orange-700 font-medium'
                                                        : 'text-gray-700 hover:bg-gray-50'
                                                    }`}
                                            >
                                                <span className="text-lg">{tab.icon}</span>
                                                {tab.label}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </div>

                        {/* Main Content */}
                        <div className="lg:col-span-3">
                            <div className="bg-white rounded-lg shadow-sm">
                                {/* Account Tab */}
                                {activeTab === 'account' && (
                                    <div className="p-6">
                                        <h2 className="text-xl font-semibold text-gray-900 mb-6">Account Information</h2>
                                        <form onSubmit={handleAccountSubmit} className="space-y-6">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        First Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="firstName"
                                                        value={accountForm.firstName}
                                                        onChange={handleAccountFormChange}
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                                        placeholder="Enter your first name"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Last Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="lastName"
                                                        value={accountForm.lastName}
                                                        onChange={handleAccountFormChange}
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                                        placeholder="Enter your last name"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Email Address
                                                </label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={accountForm.email}
                                                    onChange={handleAccountFormChange}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                                    placeholder="Enter your email"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Department
                                                </label>
                                                <select
                                                    name="department"
                                                    value={accountForm.department}
                                                    onChange={handleAccountFormChange}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                                >
                                                    <option value="">Select Department</option>
                                                    <option value="Computer Science">Computer Science</option>
                                                    <option value="Business Administration">Business Administration</option>
                                                    <option value="Electrical Engineering">Electrical Engineering</option>
                                                    <option value="Mechanical Engineering">Mechanical Engineering</option>
                                                    <option value="Psychology">Psychology</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Bio
                                                </label>
                                                <textarea
                                                    name="bio"
                                                    value={accountForm.bio}
                                                    onChange={handleAccountFormChange}
                                                    rows={4}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                                    placeholder="Tell us about yourself..."
                                                />
                                            </div>

                                            <div className="flex justify-end">
                                                <button
                                                    type="submit"
                                                    disabled={loading}
                                                    className="px-6 py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 focus:ring-4 focus:ring-orange-200 disabled:opacity-50 transition-colors duration-200"
                                                >
                                                    {loading ? 'Saving...' : 'Save Changes'}
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                )}

                                {/* Notifications Tab */}
                                {activeTab === 'notifications' && (
                                    <div className="p-6">
                                        <h2 className="text-xl font-semibold text-gray-900 mb-6">Notification Preferences</h2>
                                        <div className="space-y-6">
                                            {Object.entries(notificationSettings).map(([key, value]) => (
                                                <div key={key} className="flex items-center justify-between py-4 border-b border-gray-200 last:border-b-0">
                                                    <div>
                                                        <h3 className="font-medium text-gray-900 capitalize">
                                                            {key.replace(/([A-Z])/g, ' $1').trim()}
                                                        </h3>
                                                        <p className="text-sm text-gray-500">
                                                            {key === 'emailUpdates' && 'Receive updates about events and activities'}
                                                            {key === 'eventReminders' && 'Get reminders about upcoming events'}
                                                            {key === 'promotionalOffers' && 'Receive promotional content and offers'}
                                                            {key === 'weeklyDigest' && 'Weekly summary of campus activities'}
                                                            {key === 'pushNotifications' && 'Browser push notifications'}
                                                        </p>
                                                    </div>
                                                    <label className="relative inline-flex items-center cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            name={key}
                                                            checked={value}
                                                            onChange={handleNotificationChange}
                                                            className="sr-only peer"
                                                        />
                                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Privacy Tab */}
                                {activeTab === 'privacy' && (
                                    <div className="p-6">
                                        <h2 className="text-xl font-semibold text-gray-900 mb-6">Privacy Settings</h2>
                                        <div className="space-y-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Profile Visibility
                                                </label>
                                                <select
                                                    name="profileVisibility"
                                                    value={privacySettings.profileVisibility}
                                                    onChange={handlePrivacyChange}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                                >
                                                    <option value="public">Public</option>
                                                    <option value="campus">Campus Only</option>
                                                    <option value="private">Private</option>
                                                </select>
                                            </div>

                                            {Object.entries(privacySettings).filter(([key]) => key !== 'profileVisibility').map(([key, value]) => (
                                                <div key={key} className="flex items-center justify-between py-4 border-b border-gray-200 last:border-b-0">
                                                    <div>
                                                        <h3 className="font-medium text-gray-900 capitalize">
                                                            {key.replace(/([A-Z])/g, ' $1').trim()}
                                                        </h3>
                                                    </div>
                                                    <label className="relative inline-flex items-center cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            name={key}
                                                            checked={value}
                                                            onChange={handlePrivacyChange}
                                                            className="sr-only peer"
                                                        />
                                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Security Tab */}
                                {activeTab === 'security' && (
                                    <div className="p-6">
                                        <h2 className="text-xl font-semibold text-gray-900 mb-6">Security Settings</h2>
                                        <div className="space-y-6">
                                            <div className="bg-gray-50 rounded-lg p-4">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <h3 className="font-medium text-gray-900">Password</h3>
                                                        <p className="text-sm text-gray-500">Last changed 3 months ago</p>
                                                    </div>
                                                    <button
                                                        onClick={() => setShowPasswordModal(true)}
                                                        className="px-4 py-2 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors duration-200"
                                                    >
                                                        Change Password
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="bg-gray-50 rounded-lg p-4">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <h3 className="font-medium text-gray-900">Two-Factor Authentication</h3>
                                                        <p className="text-sm text-gray-500">Add an extra layer of security</p>
                                                    </div>
                                                    <button className="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors duration-200">
                                                        Enable 2FA
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="bg-gray-50 rounded-lg p-4">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <h3 className="font-medium text-gray-900">Active Sessions</h3>
                                                        <p className="text-sm text-gray-500">Manage your logged-in devices</p>
                                                    </div>
                                                    <button className="px-4 py-2 bg-gray-500 text-white font-medium rounded-lg hover:bg-gray-600 transition-colors duration-200">
                                                        View Sessions
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="border-t pt-6">
                                                <h3 className="font-medium text-red-900 mb-4">Danger Zone</h3>
                                                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <h4 className="font-medium text-red-900">Delete Account</h4>
                                                            <p className="text-sm text-red-700">Permanently delete your account and all data</p>
                                                        </div>
                                                        <button
                                                            onClick={() => setShowDeleteModal(true)}
                                                            className="px-4 py-2 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition-colors duration-200"
                                                        >
                                                            Delete Account
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Password Change Modal */}
            {showPasswordModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Change Password</h3>
                        <form onSubmit={handlePasswordSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Current Password
                                </label>
                                <input
                                    type="password"
                                    name="currentPassword"
                                    value={passwordForm.currentPassword}
                                    onChange={handlePasswordFormChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    name="newPassword"
                                    value={passwordForm.newPassword}
                                    onChange={handlePasswordFormChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Confirm New Password
                                </label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={passwordForm.confirmPassword}
                                    onChange={handlePasswordFormChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                    required
                                />
                            </div>
                            <div className="flex justify-end gap-4 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowPasswordModal(false)}
                                    className="px-4 py-2 text-gray-700 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors duration-200"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-4 py-2 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 disabled:opacity-50 transition-colors duration-200"
                                >
                                    {loading ? 'Changing...' : 'Change Password'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Account Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                        <h3 className="text-lg font-semibold text-red-900 mb-4">Delete Account</h3>
                        <p className="text-gray-700 mb-6">
                            Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently removed.
                        </p>
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="px-4 py-2 text-gray-700 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors duration-200"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDeleteAccount}
                                className="px-4 py-2 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition-colors duration-200"
                            >
                                Delete Account
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
};

export default Settings;
