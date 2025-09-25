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
        <div className="min-h-screen bg-white flex flex-col">
            <Navbar />
            <main className="flex flex-1 px-8 py-8">
                {/* Sidebar */}
                <aside className="w-64 pr-8 border-r border-gray-200 text-gray-700">
                    <div className="mb-8">Hello, {profile?.firstName || 'User'}.</div>
                    <ul className="space-y-4 font-semibold">
                        <li className="text-blue-600 cursor-pointer">Profile</li>
                        <li className="cursor-pointer"><Link to="/interested-events">My Events</Link></li>
                        <li className="cursor-pointer"><Link to="/discovery">Discover Events</Link></li>
                        <li className="cursor-pointer"><Link to="/settings">Settings</Link></li>
                        <li className="cursor-pointer"><Link to="/notifications">Notifications</Link></li>
                        <li className="cursor-pointer">Help & Support</li>
                        <li className="cursor-pointer text-red-500" onClick={handleLogout}>Log Out</li>
                    </ul>
                </aside>

                {/* Main Profile Section */}
                <section className="flex-1 px-8">
                    <h1 className="text-3xl font-bold mb-2">Profile</h1>
                    <p className="mb-6 text-gray-600">Manage your account, events, and settings</p>

                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
                            {error}
                        </div>
                    )}

                    {/* User Info */}
                    <div className="bg-white border rounded-lg p-6 mb-6 flex items-center gap-8">
                        <img
                            src={profile?.profilePicture || "/logo192.png"}
                            alt="User Avatar"
                            className="h-20 w-20 rounded-full border object-cover"
                        />
                        <div>
                            <div className="text-xl font-bold">
                                {isEditing ? (
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div className="flex gap-4">
                                            <input
                                                type="text"
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleInputChange}
                                                className="border rounded px-2 py-1"
                                                placeholder="First Name"
                                            />
                                            <input
                                                type="text"
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleInputChange}
                                                className="border rounded px-2 py-1"
                                                placeholder="Last Name"
                                            />
                                        </div>
                                        <div>
                                            <textarea
                                                name="bio"
                                                value={formData.bio}
                                                onChange={handleInputChange}
                                                className="border rounded px-2 py-1 w-full"
                                                placeholder="Bio"
                                                rows="3"
                                            />
                                        </div>
                                        <div className="flex gap-4">
                                            <input
                                                type="text"
                                                name="major"
                                                value={formData.major}
                                                onChange={handleInputChange}
                                                className="border rounded px-2 py-1"
                                                placeholder="Major"
                                            />
                                            <input
                                                type="text"
                                                name="yearOfStudy"
                                                value={formData.yearOfStudy}
                                                onChange={handleInputChange}
                                                className="border rounded px-2 py-1"
                                                placeholder="Year of Study"
                                            />
                                        </div>
                                        <div className="flex gap-4">
                                            <button
                                                type="submit"
                                                className="bg-green-500 text-white px-4 py-2 rounded font-semibold"
                                            >
                                                Save
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setIsEditing(false)}
                                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded font-semibold"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </form>
                                ) : (
                                    <>
                                        <div>{profile?.firstName} {profile?.lastName}</div>
                                        <div className="text-gray-500">{user?.email}</div>
                                        {profile?.bio && (
                                            <div className="text-gray-600 text-sm mt-2">{profile.bio}</div>
                                        )}
                                        {(profile?.major || profile?.yearOfStudy) && (
                                            <div className="text-gray-600 text-sm">
                                                {profile.major} {profile.yearOfStudy ? `- Year ${profile.yearOfStudy}` : ''}
                                            </div>
                                        )}
                                        <button
                                            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded font-semibold"
                                            onClick={() => setIsEditing(true)}
                                        >
                                            Edit Profile
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Settings & Notifications */}
                    <div className="flex gap-6 mb-6">
                        <div className="flex-1 bg-white border rounded-lg p-4">
                            <h2 className="font-semibold mb-4">Account Settings</h2>
                            <button
                                className="bg-blue-500 text-white py-2 rounded font-semibold w-full mb-2"
                                onClick={() => setIsEditing(true)}
                            >
                                Update Profile
                            </button>
                            <button className="bg-green-500 text-white py-2 rounded font-semibold w-full mb-2">
                                Notification Settings
                            </button>
                            <button className="bg-orange-400 text-white py-2 rounded font-semibold w-full">
                                Change Password
                            </button>
                        </div>
                        <div className="flex-1 bg-white border rounded-lg p-4">
                            <h2 className="font-semibold mb-4">Notifications</h2>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span>Email Updates</span>
                                    <input
                                        type="checkbox"
                                        name="emailUpdates"
                                        checked={notifications.emailUpdates}
                                        onChange={handleNotificationChange}
                                        className="form-checkbox h-5 w-5 text-blue-600"
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <span>Event Reminders</span>
                                    <input
                                        type="checkbox"
                                        name="eventReminders"
                                        checked={notifications.eventReminders}
                                        onChange={handleNotificationChange}
                                        className="form-checkbox h-5 w-5 text-blue-600"
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <span>Promotional Offers</span>
                                    <input
                                        type="checkbox"
                                        name="promotionalOffers"
                                        checked={notifications.promotionalOffers}
                                        onChange={handleNotificationChange}
                                        className="form-checkbox h-5 w-5 text-blue-600"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Event History */}
                    <div className="bg-white border rounded-lg p-4">
                        <h2 className="font-semibold mb-4">Event History</h2>
                        {events.length > 0 ? (
                            <ul className="space-y-2">
                                {events.map(event => (
                                    <li
                                        key={event.id}
                                        className="flex justify-between items-center cursor-pointer hover:bg-gray-50 p-2 rounded"
                                        onClick={() => handleEventClick(event.id)}
                                    >
                                        <span>{event.title}</span>
                                        <span className={`
                                            text-white text-xs px-2 py-1 rounded
                                            ${event.rsvpStatus === 'attending' ? 'bg-green-500' :
                                                event.rsvpStatus === 'interested' ? 'bg-blue-500' : 'bg-orange-400'}
                                        `}>
                                            {event.rsvpStatus === 'attending' ? 'Attending' :
                                                event.rsvpStatus === 'interested' ? 'Interested' : 'Not Attending'}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500">You haven't RSVP'd to any events yet.</p>
                        )}
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default Profile;
