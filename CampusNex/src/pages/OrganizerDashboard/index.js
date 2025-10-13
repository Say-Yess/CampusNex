// src/pages/OrganizerDashboard/index.js
import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import EditEventModal from '../../components/EditEventModal';
import AttendeesModal from '../../components/AttendeesModal';
import OrganizerSidebar from './components/OrganizerSidebar';
import StatsGrid from './components/StatsGrid';
import MyEvents from './components/MyEvents';
import DashboardViews from './components/DashboardViews';
import { useDashboardData } from './hooks/useDashboardData';

const OrganizerDashboard = () => {
    const {
        // State
        events,
        loading,
        stats,
        selectedEvent,
        showEditModal,
        showAttendeesModal,
        activeView,

        // Actions
        setActiveView,
        setShowEditModal,
        setShowAttendeesModal,
        handleEditEvent,
        handleViewAttendees,
        handleEventUpdated,
        handleDeleteEvent,

        // Utils
        getEventStatus,
        formatEventDate
    } = useDashboardData();

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col">
                <Navbar />
                <main className="flex-1 py-8 flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-600"></div>
                        <p className="mt-4 text-gray-600">Loading organizer dashboard...</p>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            <main className="flex-1 pt-24 pb-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            <OrganizerSidebar
                                activeView={activeView}
                                setActiveView={setActiveView}
                            />
                        </div>

                        {/* Main Content */}
                        <div className="lg:col-span-3">
                            <div className="space-y-6">
                                {/* Header */}
                                <div className="bg-white rounded-lg shadow-sm p-6">
                                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Organizer Dashboard</h1>
                                    <p className="text-gray-600">Manage and monitor your events</p>
                                </div>

                                {/* Stats Grid */}
                                <StatsGrid stats={stats} />

                                {/* Main Content Views */}
                                {activeView === 'my-events' && (
                                    <MyEvents
                                        events={events}
                                        handleEditEvent={handleEditEvent}
                                        handleViewAttendees={handleViewAttendees}
                                        handleDeleteEvent={handleDeleteEvent}
                                        getEventStatus={getEventStatus}
                                        formatEventDate={formatEventDate}
                                    />
                                )}

                                <DashboardViews activeView={activeView} />
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Modals */}
            {showEditModal && selectedEvent && (
                <EditEventModal
                    event={selectedEvent}
                    onClose={() => setShowEditModal(false)}
                    onEventUpdated={handleEventUpdated}
                />
            )}

            {showAttendeesModal && selectedEvent && (
                <AttendeesModal
                    event={selectedEvent}
                    onClose={() => setShowAttendeesModal(false)}
                />
            )}

            <Footer />
        </div>
    );
};

export default OrganizerDashboard;