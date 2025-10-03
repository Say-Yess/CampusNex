// src/pages/Profile/components/ProfileSidebar.js
import React from 'react';
import { Link } from 'react-router-dom';

const ProfileSidebar = ({ profile, user, handleLogout }) => (
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
);

export default ProfileSidebar;
