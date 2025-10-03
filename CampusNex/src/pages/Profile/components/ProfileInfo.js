// src/pages/Profile/components/ProfileInfo.js
import React from 'react';

const ProfileInfo = ({
    profile,
    user,
    isEditing,
    setIsEditing,
    formData,
    handleInputChange,
    handleSubmit,
    error
}) => {
    return (
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
                <ProfileEditForm
                    formData={formData}
                    handleInputChange={handleInputChange}
                    handleSubmit={handleSubmit}
                    setIsEditing={setIsEditing}
                />
            ) : (
                <ProfileDisplay
                    profile={profile}
                    user={user}
                />
            )}
        </div>
    );
};

const ProfileEditForm = ({ formData, handleInputChange, handleSubmit, setIsEditing }) => (
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
);

const ProfileDisplay = ({ profile, user }) => (
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
);

export default ProfileInfo;