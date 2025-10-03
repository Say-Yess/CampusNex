/**
 * Profile Page Component - Refactored
 * 
 * This file now imports the modular Profile component
 * for better maintainability and code organization.
 * 
 * @author CampusNex Team
 * @version 3.0 - Refactored into modular components
 */

import React from 'react';
import Profile from './Profile/index';

// Simple re-export to maintain backward compatibility
const ProfilePage = () => {
    return <Profile />;
};

export default ProfilePage;