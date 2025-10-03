/**
 * Organizer Dashboard Page Component - Refactored
 * 
 * This file now imports the modular OrganizerDashboard component
 * for better maintainability and code organization.
 * 
 * @author CampusNex Team
 * @version 3.0 - Refactored into modular components
 */

import React from 'react';
import OrganizerDashboard from './OrganizerDashboard/index';

// Simple re-export to maintain backward compatibility
const OrganizerDashboardPage = () => {
    return <OrganizerDashboard />;
};

export default OrganizerDashboardPage;