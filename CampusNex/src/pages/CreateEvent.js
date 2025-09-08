import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const CreateEvent = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
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
                <input className="w-full border rounded px-4 py-2" required placeholder="e.g. Tech Conference 2025" />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-gray-700 font-semibold mb-1">Date</label>
                  <input type="date" className="w-full border rounded px-4 py-2" required />
                </div>
                <div className="flex-1">
                  <label className="block text-gray-700 font-semibold mb-1">Time</label>
                  <input type="time" className="w-full border rounded px-4 py-2" required />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Location</label>
                <input className="w-full border rounded px-4 py-2" required placeholder="e.g. Limkokwing University" />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Category</label>
                <select className="w-full border rounded px-4 py-2" required>
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
                <textarea className="w-full border rounded px-4 py-2" rows={4} required placeholder="Describe your event..." />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Capacity</label>
                <input type="number" className="w-full border rounded px-4 py-2" required placeholder="e.g. 200" />
              </div>
              <div className="flex gap-4 mt-6">
                <button type="button" className="bg-gray-200 text-gray-700 px-6 py-2 rounded font-semibold flex-1">Cancel</button>
                <button type="submit" className="bg-orange-500 text-white px-6 py-2 rounded font-semibold flex-1">Submit Event</button>
              </div>
            </form>
          </div>
        ) : (
          <div className="w-full max-w-xl rounded-3xl bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 p-10 shadow-lg flex flex-col items-center">
            <h1 className="text-blue-900 text-4xl font-bold mb-6 text-center">Event Submitted!</h1>
            <div className="w-full bg-blue-200 rounded-xl p-6 mb-8">
              <h2 className="text-xl font-semibold text-center mb-4">What happens next?</h2>
              <ul className="list-disc pl-6 text-gray-700 text-base">
                <li>Your event will be reviewed by our team</li>
                <li>You'll receive a notification when it's approved</li>
                <li>Once approved, your event will be visible to students</li>
              </ul>
            </div>
            <button className="bg-orange-500 text-white px-8 py-3 rounded font-semibold text-lg">Back to Dashboard</button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CreateEvent;
