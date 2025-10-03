// src/components/EditEventModal.js
import React, { useState, useEffect } from 'react';
import { eventsAPI } from '../services/api';

const EditEventModal = ({ isOpen, onClose, event, onEventUpdated }) => {
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
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (event && isOpen) {
            setForm({
                title: event.title || '',
                startDate: event.startDate ? new Date(event.startDate).toISOString().slice(0, 16) : '',
                endDate: event.endDate ? new Date(event.endDate).toISOString().slice(0, 16) : '',
                location: event.location || '',
                category: event.category || '',
                description: event.description || '',
                capacity: event.capacity || '',
                imageUrl: event.imageUrl || ''
            });
            setError('');
        }
    }, [event, isOpen]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const eventData = {
                ...form,
                startDate: new Date(form.startDate).toISOString(),
                endDate: new Date(form.endDate).toISOString(),
                capacity: form.capacity ? Number(form.capacity) : null
            };

            await eventsAPI.updateEvent(event.id, eventData);
            onEventUpdated();
            onClose();
        } catch (err) {
            setError(err.message || 'Failed to update event. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen || !event) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-6 rounded-t-2xl relative">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <h2 className="text-2xl font-bold">Edit Event</h2>
                    <p className="text-orange-100 text-sm">Update your event details</p>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {error && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                            <p className="text-red-800 text-sm">{error}</p>
                        </div>
                    )}

                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Event Title</label>
                        <input
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-200"
                            required
                            placeholder="e.g. Tech Conference 2025"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">Start Date & Time</label>
                            <input
                                type="datetime-local"
                                name="startDate"
                                value={form.startDate}
                                onChange={handleChange}
                                className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-200"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">End Date & Time</label>
                            <input
                                type="datetime-local"
                                name="endDate"
                                value={form.endDate}
                                onChange={handleChange}
                                className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-200"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Location</label>
                        <input
                            name="location"
                            value={form.location}
                            onChange={handleChange}
                            className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-200"
                            required
                            placeholder="e.g. Diamond Island Convention Center, Phnom Penh"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Category</label>
                        <select
                            name="category"
                            value={form.category}
                            onChange={handleChange}
                            className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-200"
                            required
                        >
                            <option value="">Select Category</option>
                            <option>Concerts & Gigs</option>
                            <option>Festivals & Lifestyle</option>
                            <option>Business & Networking</option>
                            <option>Food & Drinks</option>
                            <option>Performing Arts</option>
                            <option>Sports & Outdoors</option>
                            <option>Exhibitions</option>
                            <option>Workshops, Conferences & Classes</option>
                            <option>Technology</option>
                            <option>Education</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Description</label>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-200"
                            rows={4}
                            required
                            placeholder="Describe your event..."
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">Capacity (optional)</label>
                            <input
                                name="capacity"
                                type="number"
                                value={form.capacity}
                                onChange={handleChange}
                                className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-200"
                                placeholder="e.g. 200"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">Image URL (optional)</label>
                            <input
                                name="imageUrl"
                                type="url"
                                value={form.imageUrl}
                                onChange={handleChange}
                                className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-200"
                                placeholder="https://example.com/image.jpg"
                            />
                        </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors duration-200"
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors duration-200 flex items-center justify-center gap-2"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0l3 3-3 3v4a4 4 0 100 8h8l-3-3 3-3v4z"></path>
                                    </svg>
                                    Updating...
                                </>
                            ) : (
                                'Update Event'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditEventModal;