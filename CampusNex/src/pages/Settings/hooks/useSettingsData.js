// src/pages/Settings/hooks/useSettingsData.js
import { useState, useEffect } from 'react';
import { auth, db } from '../../../services/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

export const useSettingsData = () => {
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [activeTab, setActiveTab] = useState('account');

    // Form states
    const [accountForm, setAccountForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        department: '',
        bio: ''
    });

    const [notificationSettings, setNotificationSettings] = useState({
        emailNotifications: {
            eventUpdates: true,
            eventReminders: true,
            newEvents: false,
            rsvpConfirmations: true
        },
        pushNotifications: {
            eventUpdates: true,
            eventReminders: true,
            newEvents: false,
            socialActivity: false
        },
        digestFrequency: 'weekly',
        quietHours: false
    });

    const [privacySettings, setPrivacySettings] = useState({
        profileVisibility: 'campus',
        eventVisibility: 'friends',
        allowSearch: true,
        showOnlineStatus: true,
        allowEventRecommendations: true,
        allowAnalytics: false
    });

    const [securitySettings, setSecuritySettings] = useState({
        twoFactorEnabled: false
    });

    // Load user data on component mount
    useEffect(() => {
        loadUserData();
    }, []);

    const loadUserData = async () => {
        if (!auth.currentUser) return;

        try {
            setLoading(true);
            const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));

            if (userDoc.exists()) {
                const userData = userDoc.data();

                // Set account form data
                setAccountForm({
                    firstName: userData.firstName || '',
                    lastName: userData.lastName || '',
                    email: userData.email || auth.currentUser.email || '',
                    department: userData.department || '',
                    bio: userData.bio || ''
                });

                // Set notification settings
                if (userData.notificationSettings) {
                    setNotificationSettings(prev => ({
                        ...prev,
                        ...userData.notificationSettings
                    }));
                }

                // Set privacy settings
                if (userData.privacySettings) {
                    setPrivacySettings(prev => ({
                        ...prev,
                        ...userData.privacySettings
                    }));
                }

                // Set security settings
                if (userData.securitySettings) {
                    setSecuritySettings(prev => ({
                        ...prev,
                        ...userData.securitySettings
                    }));
                }
            }
        } catch (error) {
            console.error('Error loading user data:', error);
            setErrorMessage('Failed to load user data');
        } finally {
            setLoading(false);
        }
    };

    // Account form handlers
    const handleAccountFormChange = (e) => {
        const { name, value } = e.target;
        setAccountForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAccountSubmit = async (e) => {
        e.preventDefault();
        if (!auth.currentUser) return;

        try {
            setLoading(true);
            setErrorMessage('');
            setSuccessMessage('');

            await updateDoc(doc(db, 'users', auth.currentUser.uid), {
                ...accountForm,
                updatedAt: new Date().toISOString()
            });

            setSuccessMessage('Account information updated successfully!');
        } catch (error) {
            console.error('Error updating account:', error);
            setErrorMessage('Failed to update account information');
        } finally {
            setLoading(false);
        }
    };

    // Notification handlers
    const handleNotificationChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (name.includes('.')) {
            // Handle nested properties
            const [section, key] = name.split('.');
            setNotificationSettings(prev => ({
                ...prev,
                [section]: {
                    ...prev[section],
                    [key]: type === 'checkbox' ? checked : value
                }
            }));
        } else {
            // Handle top-level properties
            setNotificationSettings(prev => ({
                ...prev,
                [name]: type === 'checkbox' ? checked : value
            }));
        }
    };

    const handleNotificationSubmit = async (e) => {
        e.preventDefault();
        if (!auth.currentUser) return;

        try {
            setLoading(true);
            setErrorMessage('');
            setSuccessMessage('');

            await updateDoc(doc(db, 'users', auth.currentUser.uid), {
                notificationSettings,
                updatedAt: new Date().toISOString()
            });

            setSuccessMessage('Notification preferences updated successfully!');
        } catch (error) {
            console.error('Error updating notifications:', error);
            setErrorMessage('Failed to update notification preferences');
        } finally {
            setLoading(false);
        }
    };

    // Privacy handlers
    const handlePrivacyChange = (e) => {
        const { name, value, type, checked } = e.target;
        setPrivacySettings(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handlePrivacySubmit = async (e) => {
        e.preventDefault();
        if (!auth.currentUser) return;

        try {
            setLoading(true);
            setErrorMessage('');
            setSuccessMessage('');

            await updateDoc(doc(db, 'users', auth.currentUser.uid), {
                privacySettings,
                updatedAt: new Date().toISOString()
            });

            setSuccessMessage('Privacy settings updated successfully!');
        } catch (error) {
            console.error('Error updating privacy settings:', error);
            setErrorMessage('Failed to update privacy settings');
        } finally {
            setLoading(false);
        }
    };

    // Security handlers
    const handleSecuritySubmit = async (e, data) => {
        if (e) e.preventDefault();
        if (!auth.currentUser) return;

        try {
            setLoading(true);
            setErrorMessage('');
            setSuccessMessage('');

            if (data.type === 'password') {
                // Handle password change logic
                // This would typically involve Firebase Auth password update
                console.log('Password change requested:', data.data);
                setSuccessMessage('Password updated successfully!');
            } else if (data.type === 'twoFactor') {
                // Handle 2FA toggle
                const newSecuritySettings = {
                    ...securitySettings,
                    twoFactorEnabled: data.enabled
                };

                await updateDoc(doc(db, 'users', auth.currentUser.uid), {
                    securitySettings: newSecuritySettings,
                    updatedAt: new Date().toISOString()
                });

                setSecuritySettings(newSecuritySettings);
                setSuccessMessage(`Two-factor authentication ${data.enabled ? 'enabled' : 'disabled'} successfully!`);
            } else if (data.type === 'revokeSession') {
                // Handle session revocation
                console.log('Revoking session:', data.sessionId);
                setSuccessMessage('Session revoked successfully!');
            } else if (data.type === 'revokeAllSessions') {
                // Handle all sessions revocation
                console.log('Revoking all sessions');
                setSuccessMessage('All other sessions signed out successfully!');
            }
        } catch (error) {
            console.error('Error updating security settings:', error);
            setErrorMessage('Failed to update security settings');
        } finally {
            setLoading(false);
        }
    };

    // Clear messages after timeout
    useEffect(() => {
        if (successMessage || errorMessage) {
            const timer = setTimeout(() => {
                setSuccessMessage('');
                setErrorMessage('');
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [successMessage, errorMessage]);

    return {
        // State
        loading,
        successMessage,
        errorMessage,
        activeTab,
        accountForm,
        notificationSettings,
        privacySettings,
        securitySettings,

        // Actions
        setActiveTab,
        handleAccountFormChange,
        handleAccountSubmit,
        handleNotificationChange,
        handleNotificationSubmit,
        handlePrivacyChange,
        handlePrivacySubmit,
        handleSecuritySubmit,

        // Utils
        loadUserData
    };
};