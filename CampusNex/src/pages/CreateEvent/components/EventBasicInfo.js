// src/pages/CreateEvent/components/EventBasicInfo.js
import React from 'react';

const EventBasicInfo = ({ form = {}, onChange = () => { }, categories = [] }) => {
    return (
        <div className="space-y-6">
            <div>
                <label className="block text-gray-700 font-semibold mb-2">Event Title</label>
                <input
                    name="title"
                    value={form.title || ''}
                    onChange={onChange}
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                    required
                    placeholder="e.g. Tech Conference 2025"
                />
            </div>

            <div>
                <label className="block text-gray-700 font-semibold mb-2">Location</label>
                <input
                    name="location"
                    value={form.location || ''}
                    onChange={onChange}
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                    required
                    placeholder="e.g. Limkokwing University"
                />
            </div>

            <div>
                <label className="block text-gray-700 font-semibold mb-2">Category</label>
                <select
                    name="category"
                    value={form.category || ''}
                    onChange={onChange}
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                    required
                >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block text-gray-700 font-semibold mb-2">Description</label>
                <textarea
                    name="description"
                    value={form.description || ''}
                    onChange={onChange}
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                    rows={4}
                    required
                    placeholder="Describe your event..."
                />
            </div>

            <div>
                <label className="block text-gray-700 font-semibold mb-2">Capacity (optional)</label>
                <input
                    name="capacity"
                    type="number"
                    value={form.capacity || ''}
                    onChange={onChange}
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                    placeholder="e.g. 200"
                />
            </div>
        </div>
    );
};

export default EventBasicInfo;