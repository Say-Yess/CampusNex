// src/pages/OrganizerDashboard/components/DashboardViews.js
import React from 'react';

const DashboardViews = ({ activeView }) => {
    const renderView = () => {
        switch (activeView) {
            case 'drafts':
                return <DraftsView />;
            case 'analytics':
                return <AnalyticsView />;
            default:
                return null;
        }
    };

    return renderView();
};

const DraftsView = () => (
    <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Draft Events</h2>
        <EmptyStateView
            icon={(
                <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            )}
            message="No draft events"
        />
    </div>
);

const AnalyticsView = () => (
    <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Event Analytics</h2>
        <EmptyStateView
            icon={(
                <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
            )}
            message="Analytics coming soon"
        />
    </div>
);

const EmptyStateView = ({ icon, message }) => (
    <div className="text-center py-12">
        {icon}
        <p className="text-gray-500">{message}</p>
    </div>
);

export default DashboardViews;