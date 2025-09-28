// src/pages/Profile.js
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../services/AuthContext';
import { usersAPI, eventsAPI } from '../services/api';

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        bio: '',
        major: '',
        yearOfStudy: ''
    });
    const [notifications, setNotifications] = useState({
        emailUpdates: true,
        eventReminders: false,
        promotionalOffers: false
    });

    const navigate = useNavigate();
    const { user, isAuthenticated, logout } = useAuth();

    useEffect(() => {
        // Redirect to login if not authenticated
        if (!isAuthenticated) {
            navigate('/login', { state: { from: '/profile' } });
            return;
        }

        const fetchProfileData = async () => {
            try {
                setLoading(true);

                // Get user profile
                const profileResponse = await usersAPI.getUserProfile();
                setProfile(profileResponse.user);

                // Initialize form data with user profile
                setFormData({
                    firstName: profileResponse.user.firstName || '',
                    lastName: profileResponse.user.lastName || '',
                    bio: profileResponse.user.bio || '',
                    major: profileResponse.user.major || '',
                    yearOfStudy: profileResponse.user.yearOfStudy || ''
                });

                // Get user's events
                const eventsResponse = await eventsAPI.getUserRSVPs();
                setEvents(eventsResponse.events);

                setError('');
            } catch (err) {
                console.error('Error fetching profile data:', err);
                setError('Failed to load your profile. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchProfileData();
    }, [isAuthenticated, navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleNotificationChange = (e) => {
        const { name, checked } = e.target;
        setNotifications({
            ...notifications,
            [name]: checked
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await usersAPI.updateUserProfile(formData);
            setProfile(response.user);
            setIsEditing(false);
            // Show success message
            setError('');
        } catch (err) {
            console.error('Error updating profile:', err);
            setError('Failed to update profile. Please try again.');
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleEventClick = (eventId) => {
        navigate(`/event/${eventId}`);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex flex-col">
                <Navbar />
                <div className="flex-1 flex items-center justify-center">
                    <p className="text-xl">Loading your profile...</p>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            <main className="flex-1 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-lg shadow-sm p-6">
                                <div className="text-center mb-6">
                                    <img
                                        src={profile?.profilePicture || "/logo192.png"}
                                        alt="Profile"
                                        className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-gray-100 object-cover"
                                    />
                                    <h2 className="text-lg font-semibold text-gray-900">
                                        {profile?.firstName} {profile?.lastName}
                                    </h2>
                                    <p className="text-sm text-gray-500">{user?.email}</p>
                                    <div className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                        {user?.role || 'Student'}
                                    </div>
                                </div>

                                <nav className="space-y-2">
                                    <div className="bg-orange-50 border-l-4 border-orange-500 px-4 py-3 rounded-r-md">
                                        <div className="flex items-center">
                                            <svg className="w-5 h-5 text-orange-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                            <span className="text-orange-700 font-medium">Profile</span>
                                        </div>
                                    </div>

                                    <Link to="/interested-events" className="flex items-center px-4 py-3 text-gray-700 rounded-md hover:bg-gray-50 transition-colors duration-200">
                                        <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        My Events
                                    </Link>

                                    <Link to="/discovery" className="flex items-center px-4 py-3 text-gray-700 rounded-md hover:bg-gray-50 transition-colors duration-200">
                                        <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                        Discover Events
                                    </Link>

                                    <Link to="/settings" className="flex items-center px-4 py-3 text-gray-700 rounded-md hover:bg-gray-50 transition-colors duration-200">
                                        <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        Settings
                                    </Link>

                                    <Link to="/notifications" className="flex items-center px-4 py-3 text-gray-700 rounded-md hover:bg-gray-50 transition-colors duration-200">
                                        <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4 16h7v5l-7-5zm0-8h14v3H4V8zm0-4h14v3H4V4z" />
                                        </svg>
                                        Notifications
                                    </Link>

                                    <button className="flex items-center w-full px-4 py-3 text-gray-700 rounded-md hover:bg-gray-50 transition-colors duration-200">
                                        <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        Help & Support
                                    </button>

                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center w-full px-4 py-3 text-red-600 rounded-md hover:bg-red-50 transition-colors duration-200"
                                    >
                                        <svg className="w-5 h-5 text-red-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                        </svg>
                                        Log Out
                                    </button>
                                </nav>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="lg:col-span-3">
                            <div className="space-y-6">
                                {/* Header */}
                                <div className="bg-white rounded-lg shadow-sm p-6">
                                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Profile Overview</h1>
                                    <p className="text-gray-600">Manage your account information and preferences</p>
                                </div>

                                {/* Error Message */}
                                {error && (
                                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                                        <div className="flex">
                                            <svg className="w-5 h-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            {error}
                                        </div>
                                    </div>
                                )}

                                {/* Profile Information */}
                                <div className="bg-white rounded-lg shadow-sm p-6">
                                    <div className="flex items-start justify-between mb-6">
                                        <h2 className="text-lg font-semibold text-gray-900">Personal Information</h2>
                                        {!isEditing && (
                                            <button
                                                onClick={() => setIsEditing(true)}
                                                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                                            >
                                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                                Edit Profile
                                            </button>
                                        )}
                                    </div>

                                    {isEditing ? (
                                        <form onSubmit={handleSubmit} className="space-y-6">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                                                    <input
                                                        type="text"
                                                        name="firstName"
                                                        value={formData.firstName}
                                                        onChange={handleInputChange}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                                                        placeholder="Enter your first name"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                                                    <input
                                                        type="text"
                                                        name="lastName"
                                                        value={formData.lastName}
                                                        onChange={handleInputChange}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                                                        placeholder="Enter your last name"
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">Major</label>
                                                    <input
                                                        type="text"
                                                        name="major"
                                                        value={formData.major}
                                                        onChange={handleInputChange}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                                                        placeholder="Your major/field of study"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">Year of Study</label>
                                                    <select
                                                        name="yearOfStudy"
                                                        value={formData.yearOfStudy}
                                                        onChange={handleInputChange}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                                                    >
                                                        <option value="">Select year</option>
                                                        <option value="1">1st Year</option>
                                                        <option value="2">2nd Year</option>
                                                        <option value="3">3rd Year</option>
                                                        <option value="4">4th Year</option>
                                                        <option value="Graduate">Graduate</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                                                <textarea
                                                    name="bio"
                                                    value={formData.bio}
                                                    onChange={handleInputChange}
                                                    rows={4}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                                                    placeholder="Tell us about yourself..."
                                                />
                                            </div>

                                            <div className="flex justify-end space-x-3">
                                                <button
                                                    type="button"
                                                    onClick={() => setIsEditing(false)}
                                                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    type="submit"
                                                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                                                >
                                                    Save Changes
                                                </button>
                                            </div>
                                        </form>
                                    ) : (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <div className="space-y-4">
                                                    <div>
                                                        <dt className="text-sm font-medium text-gray-500">Full Name</dt>
                                                        <dd className="mt-1 text-sm text-gray-900">{profile?.firstName} {profile?.lastName}</dd>
                                                    </div>
                                                    <div>
                                                        <dt className="text-sm font-medium text-gray-500">Email</dt>
                                                        <dd className="mt-1 text-sm text-gray-900">{user?.email}</dd>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="space-y-4">
                                                    <div>
                                                        <dt className="text-sm font-medium text-gray-500">Major</dt>
                                                        <dd className="mt-1 text-sm text-gray-900">{profile?.major || 'Not specified'}</dd>
                                                    </div>
                                                    <div>
                                                        <dt className="text-sm font-medium text-gray-500">Year of Study</dt>
                                                        <dd className="mt-1 text-sm text-gray-900">{profile?.yearOfStudy ? `${profile.yearOfStudy} Year` : 'Not specified'}</dd>
                                                    </div>
                                                </div>
                                            </div>
                                            {profile?.bio && (
                                                <div className="md:col-span-2">
                                                    <dt className="text-sm font-medium text-gray-500">Bio</dt>
                                                    <dd className="mt-1 text-sm text-gray-900">{profile.bio}</dd>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* Account Settings */}
                                <div className="bg-white rounded-lg shadow-sm p-6">
                                    <h2 className="text-lg font-semibold text-gray-900 mb-6">Account Settings</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <Link
                                            to="/settings"
                                            className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors duration-200"
                                        >
                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            Settings
                                        </Link>
                                        <Link
                                            to="/notifications"
                                            className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors duration-200"
                                        >
                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4 16h7v5l-7-5zm0-8h14v3H4V8zm0-4h14v3H4V4z" />
                                            </svg>
                                            Notifications
                                        </Link>
                                        <button className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors duration-200">
                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                            </svg>
                                            Security
                                        </button>
                                    </div>
                                </div>

                                {/* Event Activity */}
                                <div className="bg-white rounded-lg shadow-sm p-6">
                                    <h2 className="text-lg font-semibold text-gray-900 mb-6">Event Activity</h2>
                                    {events.length > 0 ? (
                                        <div className="space-y-4">
                                            {events.map(event => (
                                                <div
                                                    key={event.id}
                                                    onClick={() => handleEventClick(event.id)}
                                                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-gray-300 cursor-pointer transition-colors duration-200"
                                                >
                                                    <div className="flex items-center space-x-4">
                                                        <div className="flex-shrink-0">
                                                            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                                                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-medium text-gray-900">{event.title}</p>
                                                            <p className="text-sm text-gray-500">
                                                                {new Date(event.startDate || event.date).toLocaleDateString('en-US', {
                                                                    weekday: 'long',
                                                                    year: 'numeric',
                                                                    month: 'long',
                                                                    day: 'numeric'
                                                                })}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${event.rsvpStatus === 'attending'
                                                                ? 'bg-green-100 text-green-800'
                                                                : event.rsvpStatus === 'interested'
                                                                    ? 'bg-blue-100 text-blue-800'
                                                                    : 'bg-gray-100 text-gray-800'
                                                            }`}>
                                                            {event.rsvpStatus === 'attending' ? 'Attending' :
                                                                event.rsvpStatus === 'interested' ? 'Interested' : 'Not Attending'}
                                                        </span>
                                                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-8">
                                            <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            <p className="text-gray-500">No events found</p>
                                            <p className="text-sm text-gray-400 mt-1">You haven't RSVP'd to any events yet.</p>
                                            <Link
                                                to="/discovery"
                                                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700"
                                            >
                                                Discover Events
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Profile;
