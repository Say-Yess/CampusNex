const express = require('express');
const { LeaderboardService } = require('../services/leaderboardService');
const { auth } = require('../middleware/auth');
const router = express.Router();

/**
 * @route GET /api/leaderboard
 * @desc Get leaderboard with rankings
 * @access Public
 */
router.get('/', async (req, res) => {
    try {
        const { limit = 50, offset = 0, page = 1 } = req.query;
        const actualOffset = page > 1 ? (page - 1) * limit : offset;

        const leaderboard = await LeaderboardService.getLeaderboard(
            parseInt(limit),
            parseInt(actualOffset)
        );

        res.json({
            success: true,
            data: {
                leaderboard,
                pagination: {
                    currentPage: parseInt(page),
                    limit: parseInt(limit),
                    offset: parseInt(actualOffset),
                    total: leaderboard.length
                }
            }
        });
    } catch (error) {
        console.error('Leaderboard error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch leaderboard',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

/**
 * @route GET /api/leaderboard/stats
 * @desc Get current user's stats and rank
 * @access Private
 */
router.get('/stats', auth, async (req, res) => {
    try {
        const userStats = await LeaderboardService.getUserStats(req.user.id);

        res.json({
            success: true,
            data: userStats
        });
    } catch (error) {
        console.error('User stats error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch user stats',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

/**
 * @route GET /api/leaderboard/activities
 * @desc Get current user's recent activities
 * @access Private
 */
router.get('/activities', auth, async (req, res) => {
    try {
        const { limit = 10 } = req.query;
        const activities = await LeaderboardService.getUserActivities(
            req.user.id,
            parseInt(limit)
        );

        res.json({
            success: true,
            data: activities
        });
    } catch (error) {
        console.error('User activities error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch user activities',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

/**
 * @route GET /api/leaderboard/students
 * @desc Get student leaderboard
 * @access Public
 */
router.get('/students', async (req, res) => {
    try {
        const { limit = 50, offset = 0, page = 1 } = req.query;
        const actualOffset = page > 1 ? (page - 1) * limit : offset;

        const leaderboard = await LeaderboardService.getStudentLeaderboard(
            parseInt(limit),
            parseInt(actualOffset)
        );

        res.json({
            success: true,
            data: {
                leaderboard,
                pagination: {
                    currentPage: parseInt(page),
                    limit: parseInt(limit),
                    offset: parseInt(actualOffset),
                    total: leaderboard.length
                }
            }
        });
    } catch (error) {
        console.error('Student leaderboard error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch student leaderboard',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

/**
 * @route GET /api/leaderboard/organizers
 * @desc Get organizer leaderboard
 * @access Public
 */
router.get('/organizers', async (req, res) => {
    try {
        const { limit = 50, offset = 0, page = 1 } = req.query;
        const actualOffset = page > 1 ? (page - 1) * limit : offset;

        const leaderboard = await LeaderboardService.getOrganizerLeaderboard(
            parseInt(limit),
            parseInt(actualOffset)
        );

        res.json({
            success: true,
            data: {
                leaderboard,
                pagination: {
                    currentPage: parseInt(page),
                    limit: parseInt(limit),
                    offset: parseInt(actualOffset),
                    total: leaderboard.length
                }
            }
        });
    } catch (error) {
        console.error('Organizer leaderboard error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch organizer leaderboard',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

/**
 * @route GET /api/leaderboard/top/:count
 * @desc Get top N users
 * @access Public
 */
router.get('/top/:count', async (req, res) => {
    try {
        const { count } = req.params;
        const { role } = req.query;
        const topUsers = await LeaderboardService.getLeaderboard(parseInt(count) || 10, 0, role);

        res.json({
            success: true,
            data: topUsers
        });
    } catch (error) {
        console.error('Top users error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch top users',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

/**
 * @route POST /api/leaderboard/initialize
 * @desc Initialize user stats (for existing users)
 * @access Private
 */
router.post('/initialize', auth, async (req, res) => {
    try {
        const userStats = await LeaderboardService.initializeUserStats(req.user.id);

        res.json({
            success: true,
            data: userStats,
            message: 'User stats initialized successfully'
        });
    } catch (error) {
        console.error('Initialize stats error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to initialize user stats',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

module.exports = router;