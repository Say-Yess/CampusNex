// src/pages/Profile/hooks/useProfileData.js
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../services/AuthContext';
import { usersAPI, eventsAPI } from '../../../services/api';

export const useProfileData = () => {
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

    return {
        // State
        profile,
        events,
        loading,
        error,
        isEditing,
        formData,
        notifications,
        user,
        isAuthenticated,

        // Actions
        setIsEditing,
        handleInputChange,
        handleNotificationChange,
        handleSubmit,
        handleLogout,
        handleEventClick
    };
};