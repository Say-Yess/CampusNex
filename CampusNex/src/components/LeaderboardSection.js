import React, { useState, useEffect } from 'react';
import { Leaderboard } from './ui';

// API base URL - should be moved to environment variables
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const LeaderboardSection = () => {
    const [activeTab, setActiveTab] = useState('students');
    const [activeCategory, setActiveCategory] = useState('all');
    const [leaderboardData, setLeaderboardData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        hasNextPage: false,
        hasPrevPage: false
    });

    const categories = [
        { label: 'All Categories', value: 'all' },
        { label: 'Academic', value: 'academic' },
        { label: 'Social', value: 'social' },
        { label: 'Sports', value: 'sports' },
        { label: 'Arts', value: 'arts' }
    ];

    // Fetch leaderboard data from API
    const fetchLeaderboardData = async (type = 'students', page = 1, limit = 10) => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch(
                `${API_BASE_URL}/leaderboard?type=${type}&page=${page}&limit=${limit}&sortBy=totalEvents&order=desc`
            );

            if (!response.ok) {
                throw new Error('Failed to fetch leaderboard data');
            }

            const data = await response.json();

            if (data.success) {
                setLeaderboardData(data.data.leaderboard);
                setPagination(data.data.pagination);
            } else {
                throw new Error(data.message || 'Failed to load leaderboard');
            }

        } catch (err) {
            console.error('Error fetching leaderboard:', err);
            setError(err.message);
            setLeaderboardData([]);
        } finally {
            setLoading(false);
        }
    };

    // Load data when tab changes
    useEffect(() => {
        fetchLeaderboardData(activeTab, 1, 10);
    }, [activeTab]);

    // Handle tab change
    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setPagination({ ...pagination, currentPage: 1 });
    };

    // Handle page change
    const handlePageChange = (page) => {
        setPagination({ ...pagination, currentPage: page });
        fetchLeaderboardData(activeTab, page, 10);
    };

    // Handle load more
    const handleLoadMore = () => {
        const nextPage = pagination.currentPage + 1;
        fetchLeaderboardData(activeTab, nextPage, 10);
    };

    return (
        <div className="w-full bg-gradient-to-br from-gray-50 to-white py-12 md:py-16 lg:py-20 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
                        Campus Spotlight
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                        Celebrating our most engaged students and outstanding organizers who make our campus community vibrant
                    </p>
                </div>

                {/* Tabs */}
                <div className="flex justify-center mb-12 px-4">
                    <div className="flex w-full max-w-md rounded-xl overflow-hidden border shadow-lg bg-gray-50">
                        <button
                            onClick={() => handleTabChange('students')}
                            disabled={loading}
                            className={`flex-1 px-4 py-3 md:px-6 md:py-4 font-medium text-sm md:text-base transition-all duration-300 ${activeTab === 'students'
                                ? 'bg-primary text-white shadow-md transform scale-105'
                                : 'bg-transparent text-gray-700 hover:bg-gray-100'
                                } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            👥 Top Students
                        </button>
                        <button
                            onClick={() => handleTabChange('organizers')}
                            disabled={loading}
                            className={`flex-1 px-4 py-3 md:px-6 md:py-4 font-medium text-sm md:text-base transition-all duration-300 ${activeTab === 'organizers'
                                ? 'bg-primary text-white shadow-md transform scale-105'
                                : 'bg-transparent text-gray-700 hover:bg-gray-100'
                                } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            🏆 Top Organizers
                        </button>
                    </div>
                </div>

                {/* Error message */}
                {error && (
                    <div className="max-w-3xl mx-auto mb-8 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-700 text-center">
                            {error}. Please try refreshing the page.
                        </p>
                    </div>
                )}

                {/* Leaderboard */}
                <Leaderboard
                    title={activeTab === 'students' ? "Most Active Students" : "Top Event Organizers"}
                    subtitle={
                        activeTab === 'students'
                            ? "Based on event attendance this semester"
                            : "Based on number of events hosted this semester"
                    }
                    leaders={leaderboardData}
                    categories={categories}
                    activeCategory={activeCategory}
                    onCategoryChange={setActiveCategory}
                    unit="Events"
                    loading={loading}
                    currentPage={pagination.currentPage}
                    totalPages={pagination.totalPages}
                    onPageChange={handlePageChange}
                    hasNextPage={pagination.hasNextPage}
                    hasPrevPage={pagination.hasPrevPage}
                    onLoadMore={handleLoadMore}
                    showLoadMore={true}
                />
            </div>
        </div>
    );
};

export default LeaderboardSection;
