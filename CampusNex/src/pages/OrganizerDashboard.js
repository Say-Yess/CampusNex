
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const OrganizerDashboard = () => {
    return (
        <div className="min-h-screen bg-white flex flex-col">
            {/* Top Bar */}
            <header className="bg-gray-800 text-white px-6 py-2 text-sm font-semibold">QUICK SUBMISSION - org dashboard v1</header>
            <Navbar />
            <main className="flex flex-1 px-8 py-8">
                {/* Sidebar */}
                <aside className="w-64 pr-8 border-r border-gray-200 text-gray-700">
                    <div className="mb-8">Hello, User.</div>
                    <ul className="space-y-4 font-semibold">
                        <li>Dashboard
                            <ul className="ml-4 text-sm font-normal space-y-2">
                                <li>Organizer Profile</li>
                                <li>Create New Event</li>
                                <li>My Events</li>
                                <li>Event Drafts</li>
                            </ul>
                        </li>
                        <li>Analytics & Report</li>
                        <li>Promotion & Ads</li>
                        <li>Help & Support</li>
                        <li>Log Out</li>
                    </ul>
                </aside>
                {/* Main Dashboard */}
                <section className="flex-1 px-8">
                    <h1 className="text-3xl font-bold mb-2">Organizer Dashboard</h1>
                    <p className="mb-6 text-gray-600">Manage the event</p>
                    {/* Stats */}
                    <div className="flex gap-6 mb-6">
                        <div className="bg-blue-600 text-white rounded-lg px-6 py-4 flex-1 flex flex-col items-center">
                            <span className="text-lg font-semibold">Total Events</span>
                            <span className="text-2xl font-bold mt-2">22</span>
                        </div>
                        <div className="bg-green-500 text-white rounded-lg px-6 py-4 flex-1 flex flex-col items-center">
                            <span className="text-lg font-semibold">Total Attendees</span>
                            <span className="text-2xl font-bold mt-2">345</span>
                        </div>
                        <div className="bg-orange-400 text-white rounded-lg px-6 py-4 flex-1 flex flex-col items-center">
                            <span className="text-lg font-semibold">Avg. Performance</span>
                            <span className="text-2xl font-bold mt-2">90%</span>
                        </div>
                    </div>
                    {/* Recent Events & Quick Actions */}
                    <div className="flex gap-6">
                        {/* Recent Events */}
                        <div className="flex-1 bg-white border rounded-lg p-4">
                            <h2 className="font-semibold mb-4">Recent Event</h2>
                            <div className="space-y-3">
                                <div className="bg-purple-100 border-l-4 border-purple-400 rounded p-3 flex justify-between items-center">
                                    <div>
                                        <div className="font-bold text-purple-800">Tech Conference 2025</div>
                                        <div className="text-xs text-gray-600">Dec 18, 2024 • 158 attendees</div>
                                    </div>
                                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">Complete</span>
                                </div>
                                <div className="bg-blue-100 border-l-4 border-blue-400 rounded p-3 flex justify-between items-center">
                                    <div>
                                        <div className="font-bold text-blue-800">Career Fair</div>
                                        <div className="text-xs text-gray-600">Dec 18, 2025 • 300 attendees</div>
                                    </div>
                                    <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded">In Progress</span>
                                </div>
                                <div className="bg-green-100 border-l-4 border-green-400 rounded p-3 flex justify-between items-center">
                                    <div>
                                        <div className="font-bold text-green-800">Tech Workshop</div>
                                        <div className="text-xs text-gray-600">Jun 03, 2025 • 95 attendees</div>
                                    </div>
                                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">Complete</span>
                                </div>
                            </div>
                        </div>
                        {/* Quick Actions */}
                        <div className="w-64 bg-white border rounded-lg p-4 flex flex-col gap-4">
                            <h2 className="font-semibold mb-4">Quick Action</h2>
                            <button className="bg-blue-500 text-white py-2 rounded font-semibold">Event Creation</button>
                            <button className="bg-green-500 text-white py-2 rounded font-semibold">Attendee List</button>
                            <button className="bg-orange-400 text-white py-2 rounded font-semibold">View Analyst</button>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};


export default OrganizerDashboard;
