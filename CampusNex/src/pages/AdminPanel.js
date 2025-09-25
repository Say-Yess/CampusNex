// src/pages/AdminPanel.js

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const pendingEvents = [
    { title: 'Tech Conference 2025', organizer: 'Limkokwing University', date: 'Dec 18, 2024', status: 'Pending' },
    { title: 'Career Fair', organizer: 'RUPP', date: 'Dec 18, 2025', status: 'Pending' },
];

const AdminPanel = () => (
    <div className="min-h-screen bg-white flex flex-col">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center py-16 px-4">
            <div className="w-full max-w-3xl rounded-3xl bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 p-10 shadow-lg">
                <h1 className="text-blue-900 text-4xl font-bold mb-8 text-center">Admin Panel</h1>
                <h2 className="text-2xl font-bold text-blue-900 mb-6">Pending Event Approvals</h2>
                <div className="space-y-6">
                    {pendingEvents.map((event, idx) => (
                        <div key={idx} className="bg-white rounded-xl p-6 shadow flex justify-between items-center">
                            <div>
                                <div className="text-xl font-semibold text-blue-900 mb-2">{event.title}</div>
                                <div className="text-gray-700 text-base">Organizer: {event.organizer}</div>
                                <div className="text-gray-500 text-sm">Date: {event.date}</div>
                            </div>
                            <div className="flex gap-2">
                                <button className="bg-green-500 text-white px-4 py-2 rounded font-semibold">Approve</button>
                                <button className="bg-red-500 text-white px-4 py-2 rounded font-semibold">Reject</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
        <Footer />
    </div>
);

export default AdminPanel;
