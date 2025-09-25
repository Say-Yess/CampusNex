// src/pages/Settings.js

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Settings = () => (
    <div className="min-h-screen bg-white flex flex-col">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center py-16 px-4">
            <div className="w-full max-w-xl rounded-3xl bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 p-10 shadow-lg">
                <h1 className="text-blue-900 text-4xl font-bold mb-8 text-center">Settings</h1>
                <form className="space-y-6">
                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">Update Email</label>
                        <input type="email" className="w-full border rounded px-4 py-2" placeholder="student@email.com" />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">Change Password</label>
                        <input type="password" className="w-full border rounded px-4 py-2" placeholder="New Password" />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">Notification Preferences</label>
                        <div className="flex gap-4">
                            <label className="flex items-center gap-2">
                                <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" />
                                <span>Email Updates</span>
                            </label>
                            <label className="flex items-center gap-2">
                                <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" />
                                <span>Event Reminders</span>
                            </label>
                        </div>
                    </div>
                    <button type="submit" className="bg-orange-500 text-white px-6 py-2 rounded font-semibold w-full">Save Changes</button>
                </form>
            </div>
        </main>
        <Footer />
    </div>
);

export default Settings;
