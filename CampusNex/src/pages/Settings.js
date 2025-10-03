/**
 * Settings Page Component - Refactored
 * 
 * This file now imports the modular Settings component
 * for better maintainability and code organization.
 * 
 * @author CampusNex Team
 * @version 3.0 - Refactored into modular components
 */

import React from 'react';
import Settings from './Settings/index';

// Simple re-export to maintain backward compatibility
const SettingsPage = () => {
    return <Settings />;
};

export default SettingsPage;