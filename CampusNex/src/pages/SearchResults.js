// src/pages/SearchResults.js

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const results = [
    { title: 'Tech Conference 2025', date: 'Dec 18, 2024', location: 'Limkokwing University' },
    { title: 'Career Fair', date: 'Dec 18, 2025', location: 'RUPP' },
];

const SearchResults = () => (
    <div className="min-h-screen bg-white flex flex-col">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center py-16 px-4">
            <div className="w-full max-w-2xl rounded-3xl bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 p-10 shadow-lg">
                <h1 className="text-blue-900 text-4xl font-bold mb-8 text-center">Search Results</h1>
                <div className="space-y-6">
                    {results.map((result, idx) => (
                        <div key={idx} className="bg-white rounded-xl p-6 shadow flex flex-col gap-2">
                            <div className="text-xl font-semibold text-blue-900">{result.title}</div>
                            <div className="text-gray-700 text-base">Date: {result.date}</div>
                            <div className="text-gray-500 text-sm">Location: {result.location}</div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
        <Footer />
    </div>
);

export default SearchResults;
