import React, { useState, useEffect } from 'react';
import { Trophy, TrendingUp, Star } from 'lucide-react';
import { leaderboardAPI } from '../services/api';
import { useAuth } from '../services/AuthContext';

const PointsWidget = ({ className = '' }) => {
    const [userStats, setUserStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const { currentUser } = useAuth();

    useEffect(() => {
        if (currentUser) {
            fetchUserStats();
        } else {
            setLoading(false);
        }
    }, [currentUser]);

    const fetchUserStats = async () => {
        try {
            const stats = await leaderboardAPI.getUserStats(currentUser.uid);
            setUserStats(stats);
        } catch (error) {
            console.error('Error fetching user stats:', error);
        } finally {
            setLoading(false);
        }
    };

    if (!currentUser || loading) {
        return null;
    }

    if (!userStats) {
        return null;
    }

    return (
        <div className={`bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-4 text-white shadow-lg ${className}`}>
            <div className="flex items-center justify-between">
                <div>
                    <div className="flex items-center mb-2">
                        <Trophy className="w-5 h-5 mr-2" />
                        <h3 className="font-semibold">Your Score</h3>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div>
                            <p className="text-2xl font-bold">{userStats.totalPoints}</p>
                            <p className="text-sm text-blue-100">Points</p>
                        </div>
                        <div>
                            <p className="text-lg font-bold">#{userStats.rank}</p>
                            <p className="text-sm text-blue-100">Rank</p>
                        </div>
                    </div>
                </div>
                <div className="text-right">
                    <TrendingUp className="w-12 h-12 text-blue-200 mb-1" />
                    <p className="text-xs text-blue-100">Keep it up!</p>
                </div>
            </div>
        </div>
    );
};

export default PointsWidget;