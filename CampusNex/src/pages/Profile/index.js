// src/pages/Profile/index.js
import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ProfileSidebar from './components/ProfileSidebar';
import ProfileInfo from './components/ProfileInfo';
import AccountSettingsLinks from './components/AccountSettingsLinks';
import EventActivity from './components/EventActivity';
import { useProfileData } from './hooks/useProfileData';

const Profile = () => {
    const {
        // State
        profile,
        events,
        loading,
        error,
        isEditing,
        formData,
        user,

        // Actions
        setIsEditing,
        handleInputChange,
        handleSubmit,
        handleLogout,
        handleEventClick
    } = useProfileData();

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
                            <ProfileSidebar
                                profile={profile}
                                user={user}
                                handleLogout={handleLogout}
                            />
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
                                <ProfileInfo
                                    profile={profile}
                                    user={user}
                                    isEditing={isEditing}
                                    setIsEditing={setIsEditing}
                                    formData={formData}
                                    handleInputChange={handleInputChange}
                                    handleSubmit={handleSubmit}
                                    error={error}
                                />

                                {/* Account Settings Links */}
                                <AccountSettingsLinks />

                                {/* Event Activity */}
                                <EventActivity
                                    events={events}
                                    handleEventClick={handleEventClick}
                                />
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