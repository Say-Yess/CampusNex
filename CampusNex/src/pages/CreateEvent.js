import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { eventsAPI } from '../services/api';
import { useAuth } from '../services/AuthContext';

const CreateEvent = () => {
    const navigate = useNavigate();
    const { user, isAuthenticated } = useAuth();

    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [form, setForm] = useState({
        title: '',
        startDate: '',
        endDate: '',
        location: '',
        category: '',
        description: '',
        capacity: '',
        imageUrl: ''
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Redirect to login if not authenticated
        if (!isAuthenticated) {
            navigate('/login', { state: { from: '/create-event' } });
            return;
        }

        setLoading(true);
        setError('');

        try {
            // Format the event data for API
            const eventData = {
                title: form.title,
                startDate: new Date(form.startDate).toISOString(),
                endDate: new Date(form.endDate).toISOString(),
                location: form.location,
                category: form.category,
                description: form.description,
                capacity: form.capacity ? Number(form.capacity) : null,
                imageUrl: form.imageUrl || null
            };

            // Call the API to create event
            await eventsAPI.createEvent(eventData);
            setSubmitted(true);
        } catch (err) {
            setError(err.message || 'Failed to submit event. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <Navbar />
            <main className="flex-1 flex flex-col items-center justify-center py-16 px-4">
                {!submitted ? (
                    <div className="w-full max-w-xl rounded-3xl bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 p-10 shadow-lg">
                        <h1 className="text-blue-900 text-4xl font-bold mb-8 text-center">Create New Event</h1>
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label className="block text-gray-700 font-semibold mb-1">Event Title</label>
                                <input name="title" value={form.title} onChange={handleChange} className="w-full border rounded px-4 py-2" required placeholder="e.g. Tech Conference 2025" />
                            </div>
                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <label className="block text-gray-700 font-semibold mb-1">Start Date & Time</label>
                                    <input
                                        type="datetime-local"
                                        name="startDate"
                                        value={form.startDate}
                                        onChange={handleChange}
                                        className="w-full border rounded px-4 py-2"
                                        required
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="block text-gray-700 font-semibold mb-1">End Date & Time</label>
                                    <input
                                        type="datetime-local"
                                        name="endDate"
                                        value={form.endDate}
                                        onChange={handleChange}
                                        className="w-full border rounded px-4 py-2"
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-gray-700 font-semibold mb-1">Location</label>
                                <input name="location" value={form.location} onChange={handleChange} className="w-full border rounded px-4 py-2" required placeholder="e.g. Limkokwing University" />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-semibold mb-1">Category</label>
                                <select name="category" value={form.category} onChange={handleChange} className="w-full border rounded px-4 py-2" required>
                                    <option value="">Select Category</option>
                                    <option>Concerts & Gigs</option>
                                    <option>Festivals & Lifestyle</option>
                                    <option>Business & Networking</option>
                                    <option>Food & Drinks</option>
                                    <option>Performing Arts</option>
                                    <option>Sports & Outdoors</option>
                                    <option>Exhibitions</option>
                                    <option>Workshops, Conferences & Classes</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-gray-700 font-semibold mb-1">Description</label>
                                <textarea name="description" value={form.description} onChange={handleChange} className="w-full border rounded px-4 py-2" rows={4} required placeholder="Describe your event..." />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-semibold mb-1">Capacity (optional)</label>
                                <input name="capacity" type="number" value={form.capacity} onChange={handleChange} className="w-full border rounded px-4 py-2" placeholder="e.g. 200" />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-semibold mb-1">Image URL (optional)</label>
                                <input name="imageUrl" type="url" value={form.imageUrl} onChange={handleChange} className="w-full border rounded px-4 py-2" placeholder="https://example.com/image.jpg" />
                            </div>
                            {error && <div className="text-red-500 text-center">{error}</div>}
                            <div className="flex gap-4 mt-6">
                                <button type="button" onClick={() => navigate(-1)} className="bg-gray-200 text-gray-700 px-6 py-2 rounded font-semibold flex-1" disabled={loading}>Cancel</button>
                                <button type="submit" className="bg-orange-500 text-white px-6 py-2 rounded font-semibold flex-1" disabled={loading}>{loading ? 'Submitting...' : 'Submit Event'}</button>
                            </div>
                        </form>
                    </div>
                ) : (
                    <div className="w-full max-w-xl rounded-3xl bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 p-10 shadow-lg flex flex-col items-center">
                        <h1 className="text-blue-900 text-4xl font-bold mb-6 text-center">Event Submitted!</h1>
                        <div className="w-full bg-blue-200 rounded-xl p-6 mb-8">
                            <h2 className="text-xl font-semibold text-center mb-4">What happens next?</h2>
                            <ul className="list-disc pl-6 text-gray-700 text-base">
                                <li>Your event has been published and is now visible to everyone</li>
                                <li>You can manage your event from your organizer dashboard</li>
                                <li>You'll receive notifications when people RSVP to your event</li>
                            </ul>
                        </div>
                        <div className="flex gap-4">
                            <button
                                onClick={() => navigate('/organizer-dashboard')}
                                className="bg-blue-500 text-white px-8 py-3 rounded font-semibold text-lg"
                            >
                                Go to Dashboard
                            </button>
                            <button
                                onClick={() => navigate('/create-event')}
                                className="bg-orange-500 text-white px-8 py-3 rounded font-semibold text-lg"
                            >
                                Create Another Event
                            </button>
                        </div>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default CreateEvent;
