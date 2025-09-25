const express = require('express');
const router = express.Router();

// Sample data for leaderboards - in production, this would come from the database
const sampleStudents = [
    {
        id: 1,
        name: 'Sarah Johnson',
        department: 'Computer Science',
        profileImage: '/uploads/avatars/sarah.jpg',
        totalEvents: 39,
        rank: 1
    },
    {
        id: 2,
        name: 'Michael Chen',
        department: 'Business Administration',
        profileImage: '/uploads/avatars/michael.jpg',
        totalEvents: 35,
        rank: 2
    },
    {
        id: 3,
        name: 'Emma Rodriguez',
        department: 'Fashion Design',
        profileImage: '/uploads/avatars/emma.jpg',
        totalEvents: 31,
        rank: 3
    },
    {
        id: 4,
        name: 'James Lee',
        department: 'Engineering',
        profileImage: '/uploads/avatars/james.jpg',
        totalEvents: 28,
        rank: 4
    },
    {
        id: 5,
        name: 'Olivia Kim',
        department: 'Psychology',
        profileImage: '/uploads/avatars/olivia.jpg',
        totalEvents: 26,
        rank: 5
    },
    {
        id: 6,
        name: 'David Patel',
        department: 'Media Studies',
        profileImage: '/uploads/avatars/david.jpg',
        totalEvents: 24,
        rank: 6
    },
    {
        id: 7,
        name: 'Sophia Wang',
        department: 'Biology',
        profileImage: '/uploads/avatars/sophia.jpg',
        totalEvents: 21,
        rank: 7
    },
    {
        id: 8,
        name: 'Noah Garcia',
        department: 'Economics',
        profileImage: '/uploads/avatars/noah.jpg',
        totalEvents: 20,
        rank: 8
    },
    {
        id: 9,
        name: 'Ava Thompson',
        department: 'Art History',
        profileImage: '/uploads/avatars/ava.jpg',
        totalEvents: 18,
        rank: 9
    },
    {
        id: 10,
        name: 'Lucas Brown',
        department: 'Physics',
        profileImage: '/uploads/avatars/lucas.jpg',
        totalEvents: 17,
        rank: 10
    },
    {
        id: 11,
        name: 'Mia Davis',
        department: 'Marketing',
        profileImage: '/uploads/avatars/mia.jpg',
        totalEvents: 15,
        rank: 11
    },
    {
        id: 12,
        name: 'Ethan Wilson',
        department: 'Chemistry',
        profileImage: '/uploads/avatars/ethan.jpg',
        totalEvents: 14,
        rank: 12
    }
];

const sampleOrganizers = [
    {
        id: 1,
        name: 'Student Union',
        department: 'Campus Organization',
        profileImage: '/uploads/avatars/student-union.jpg',
        totalEvents: 28,
        rank: 1
    },
    {
        id: 2,
        name: 'CS Society',
        department: 'Academic Club',
        profileImage: '/uploads/avatars/cs-society.jpg',
        totalEvents: 25,
        rank: 2
    },
    {
        id: 3,
        name: 'Arts Collective',
        department: 'Creative Club',
        profileImage: '/uploads/avatars/arts-collective.jpg',
        totalEvents: 22,
        rank: 3
    },
    {
        id: 4,
        name: 'Business Association',
        department: 'Academic Club',
        profileImage: '/uploads/avatars/business-assoc.jpg',
        totalEvents: 20,
        rank: 4
    },
    {
        id: 5,
        name: 'International Club',
        department: 'Cultural Club',
        profileImage: '/uploads/avatars/international-club.jpg',
        totalEvents: 19,
        rank: 5
    },
    {
        id: 6,
        name: 'Sports Council',
        department: 'Athletics',
        profileImage: '/uploads/avatars/sports-council.jpg',
        totalEvents: 18,
        rank: 6
    },
    {
        id: 7,
        name: 'Music Society',
        department: 'Performing Arts',
        profileImage: '/uploads/avatars/music-society.jpg',
        totalEvents: 17,
        rank: 7
    },
    {
        id: 8,
        name: 'Debate Team',
        department: 'Academic Club',
        profileImage: '/uploads/avatars/debate-team.jpg',
        totalEvents: 15,
        rank: 8
    },
    {
        id: 9,
        name: 'Drama Club',
        department: 'Performing Arts',
        profileImage: '/uploads/avatars/drama-club.jpg',
        totalEvents: 13,
        rank: 9
    },
    {
        id: 10,
        name: 'Environmental Society',
        department: 'Social Impact',
        profileImage: '/uploads/avatars/env-society.jpg',
        totalEvents: 12,
        rank: 10
    }
];

// GET /api/leaderboard - Get leaderboard data
router.get('/', async (req, res) => {
    try {
        const {
            type = 'students',
            page = 1,
            limit = 10,
            sortBy = 'totalEvents',
            order = 'desc'
        } = req.query;

        // Validate type
        if (!['students', 'organizers'].includes(type)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid type. Must be "students" or "organizers"'
            });
        }

        // Get the appropriate data set
        let data = type === 'students' ? [...sampleStudents] : [...sampleOrganizers];

        // Sort data
        data.sort((a, b) => {
            if (order === 'desc') {
                return b[sortBy] - a[sortBy];
            } else {
                return a[sortBy] - b[sortBy];
            }
        });

        // Update ranks after sorting
        data.forEach((item, index) => {
            item.rank = index + 1;
        });

        // Calculate pagination
        const pageNumber = parseInt(page);
        const limitNumber = parseInt(limit);
        const startIndex = (pageNumber - 1) * limitNumber;
        const endIndex = startIndex + limitNumber;

        const paginatedData = data.slice(startIndex, endIndex);
        const totalPages = Math.ceil(data.length / limitNumber);
        const hasNextPage = pageNumber < totalPages;
        const hasPrevPage = pageNumber > 1;

        res.json({
            success: true,
            data: {
                leaderboard: paginatedData,
                pagination: {
                    currentPage: pageNumber,
                    totalPages,
                    totalItems: data.length,
                    itemsPerPage: limitNumber,
                    hasNextPage,
                    hasPrevPage
                }
            }
        });

    } catch (error) {
        console.error('Leaderboard error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

// GET /api/leaderboard/top3 - Get top 3 for both types
router.get('/top3', async (req, res) => {
    try {
        const { type = 'both' } = req.query;

        let response = {};

        if (type === 'both' || type === 'students') {
            response.students = sampleStudents.slice(0, 3);
        }

        if (type === 'both' || type === 'organizers') {
            response.organizers = sampleOrganizers.slice(0, 3);
        }

        res.json({
            success: true,
            data: response
        });

    } catch (error) {
        console.error('Top 3 leaderboard error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

// GET /api/leaderboard/stats - Get overall stats
router.get('/stats', async (req, res) => {
    try {
        const stats = {
            totalStudents: sampleStudents.length,
            totalOrganizers: sampleOrganizers.length,
            topStudentEvents: sampleStudents[0]?.totalEvents || 0,
            topOrganizerEvents: sampleOrganizers[0]?.totalEvents || 0,
            averageStudentEvents: Math.round(
                sampleStudents.reduce((sum, student) => sum + student.totalEvents, 0) / sampleStudents.length
            ),
            averageOrganizerEvents: Math.round(
                sampleOrganizers.reduce((sum, org) => sum + org.totalEvents, 0) / sampleOrganizers.length
            )
        };

        res.json({
            success: true,
            data: stats
        });

    } catch (error) {
        console.error('Leaderboard stats error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

module.exports = router;