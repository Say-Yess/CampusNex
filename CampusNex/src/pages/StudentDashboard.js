// src/pages/StudentDashboard.js

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const StudentDashboard = () => {
    return (
        <div className="min-h-screen bg-white flex flex-col">
            {/* Top Bar */}
            <header className="bg-gray-800 text-white px-6 py-2 text-sm font-semibold">QUICK SUBMISSION - student dashboard v1</header>
            <Navbar />
            <main className="flex flex-1 px-8 py-8">
                {/* Sidebar */}
                <aside className="w-64 pr-8 border-r border-gray-200 text-gray-700">
                    <div className="mb-8">Hello, Student.</div>
                    <ul className="space-y-4 font-semibold">
                        <li>Dashboard
                            <ul className="ml-4 text-sm font-normal space-y-2">
                                <li>Profile</li>
                                <li>My Events</li>
                                <li>Upcoming Events</li>
                                <li>Calendar</li>
                                <li>Settings</li>
                            </ul>
                        </li>
                        <li>Notifications</li>
                        <li>Help & Support</li>
                        <li>Log Out</li>
                    </ul>
                </aside>
                {/* Main Dashboard */}
                <section className="flex-1 px-8">
                    <h1 className="text-3xl font-bold mb-2">Student Dashboard</h1>
                    <p className="mb-6 text-gray-600">Your event summary and upcoming schedule</p>
                    {/* Event Summary */}
                    <div className="flex gap-6 mb-6">
                        <div className="bg-blue-600 text-white rounded-lg px-6 py-4 flex-1 flex flex-col items-center">
                            <span className="text-lg font-semibold">Events To Attend</span>
                            <span className="text-2xl font-bold mt-2">3</span>
                        </div>
                        <div className="bg-green-500 text-white rounded-lg px-6 py-4 flex-1 flex flex-col items-center">
                            <span className="text-lg font-semibold">Current Event</span>
                            <span className="text-2xl font-bold mt-2">Tech Workshop</span>
                        </div>
                        <div className="bg-orange-400 text-white rounded-lg px-6 py-4 flex-1 flex flex-col items-center">
                            <span className="text-lg font-semibold">Upcoming Event</span>
                            <span className="text-2xl font-bold mt-2">Career Fair</span>
                        </div>
                    </div>
                    {/* Calendar & Settings */}
                    <div className="flex gap-6">
                        {/* Calendar */}
                        <div className="flex-1 bg-white border rounded-lg p-4">
                            <h2 className="font-semibold mb-4">Calendar</h2>
                            <div className="bg-gray-100 rounded p-4 text-center text-gray-500">[Calendar integration coming soon]</div>
                        </div>
                        {/* Account Summary/Settings */}
                        <div className="w-64 bg-white border rounded-lg p-4 flex flex-col gap-4">
                            <h2 className="font-semibold mb-4">Account Summary & Settings</h2>
                            <button className="bg-blue-500 text-white py-2 rounded font-semibold">Update Profile</button>
                            <button className="bg-green-500 text-white py-2 rounded font-semibold">Notification Settings</button>
                            <button className="bg-orange-400 text-white py-2 rounded font-semibold">Change Password</button>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default StudentDashboard;
