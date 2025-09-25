// src/pages/Notifications.js

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const notifications = [
    { message: 'Your RSVP for Tech Conference 2025 is confirmed.', type: 'success' },
    { message: 'Event Career Fair is starting soon!', type: 'info' },
];

const Notifications = () => (
    <div className="min-h-screen bg-white flex flex-col">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center py-16 px-4">
            <div className="w-full max-w-2xl rounded-3xl bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 p-10 shadow-lg">
                <h1 className="text-blue-900 text-4xl font-bold mb-8 text-center">Notifications</h1>
                <div className="space-y-6">
                    {notifications.map((note, idx) => (
                        <div key={idx} className={`bg-white rounded-xl p-6 shadow flex items-center gap-4 ${note.type === 'success' ? 'border-l-4 border-green-500' : 'border-l-4 border-blue-500'}`}>
                            <span className={`font-semibold ${note.type === 'success' ? 'text-green-600' : 'text-blue-600'}`}>{note.type === 'success' ? '✔' : 'ℹ'}</span>
                            <span className="text-gray-700 text-base">{note.message}</span>
                        </div>
                    ))}
                </div>
            </div>
        </main>
        <Footer />
    </div>
);

export default Notifications;
