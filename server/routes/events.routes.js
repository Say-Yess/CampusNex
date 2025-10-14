const express = require('express');
const { body, validationResult } = require('express-validator');
const { Event, User, RSVP } = require('../models');
const { auth, checkRole } = require('../middleware/auth');
const upload = require('../middleware/upload');
const { LeaderboardService } = require('../services/leaderboardService');
const router = express.Router();

// Middleware to handle validation errors
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// @route   GET /api/events
// @desc    Get all events with flexible ordering
// @access  Public
router.get('/', async (req, res) => {
    try {
        const { order_by = 'random', user_id } = req.query;

        let orderClause;
        switch (order_by) {
            case 'chronological':
                orderClause = [['startDate', 'ASC']];
                break;
            case 'newest':
                orderClause = [['createdAt', 'DESC']];
                break;
            case 'popular':
                // TODO: Implement popularity scoring based on RSVP count
                orderClause = [['createdAt', 'DESC']];
                break;
            case 'interest':
                // TODO: Implement interest-based ordering
                orderClause = [['startDate', 'ASC']];
                break;
            case 'random':
            default:
                // Use different random approaches based on database
                const dbDialect = require('../config/database').dialect || 'sqlite';
                if (dbDialect === 'postgres') {
                    orderClause = [[require('sequelize').fn('RANDOM')]];
                } else if (dbDialect === 'mysql') {
                    orderClause = [[require('sequelize').fn('RAND')]];
                } else {
                    // SQLite or fallback - use Sequelize literal for RANDOM()
                    orderClause = [[require('sequelize').literal('RANDOM()')]];
                }
                break;
        }

        const events = await Event.findAll({
            include: [
                {
                    model: User,
                    as: 'organizer',
                    attributes: ['id', 'firstName', 'lastName', 'email']
                }
            ],
            where: {
                status: 'published'
            },
            order: orderClause
        });

        // If user is authenticated and requesting interest-based ordering
        if (order_by === 'interest' && user_id) {
            // TODO: Implement interest-based scoring
            // For now, we'll use a placeholder algorithm that considers:
            // 1. User's past RSVP categories
            // 2. User's profile interests (major, yearOfStudy)
            // 3. Event popularity
            console.log(`Interest-based ordering requested for user ${user_id}`);
        }

        res.status(200).json({
            success: true,
            count: events.length,
            events,
            ordering: order_by
        });
    } catch (error) {
        console.error('Get events error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});

// @route   GET /api/events/:id
// @desc    Get single event
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        console.log('Fetching event with ID:', req.params.id);
        const event = await Event.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    as: 'organizer',
                    attributes: ['id', 'firstName', 'lastName', 'email']
                },
                {
                    model: RSVP,
                    as: 'rsvps',
                    include: [
                        {
                            model: User,
                            as: 'user',
                            attributes: ['id', 'firstName', 'lastName']
                        }
                    ]
                }
            ]
        });

        if (!event) {
            console.log('Event not found with ID:', req.params.id);
            return res.status(404).json({
                success: false,
                message: 'Event not found'
            });
        }

        console.log('Event found:', event.id, event.title);

        res.status(200).json({
            success: true,
            event
        });
    } catch (error) {
        console.error('Get event error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});

// @route   POST /api/events/:id/view
// @desc    Track user viewing an event (for interest-based recommendations)
// @access  Private
router.post('/:id/view', auth, async (req, res) => {
    try {
        const eventId = req.params.id;
        const userId = req.user.id;

        // TODO: Store view interaction in a UserInteraction table
        // For now, just log for development
        console.log(`User ${userId} viewed event ${eventId}`);

        res.status(200).json({
            success: true,
            message: 'View tracked'
        });
    } catch (error) {
        console.error('Error tracking view:', error);
        res.status(500).json({
            success: false,
            message: 'Error tracking view'
        });
    }
});

// @route   GET /api/events/recommendations/:userId
// @desc    Get personalized event recommendations
// @access  Private
router.get('/recommendations/:userId', auth, async (req, res) => {
    try {
        const userId = req.params.userId;

        // Verify user can access these recommendations
        if (req.user.id !== parseInt(userId) && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Unauthorized'
            });
        }

        // TODO: Implement recommendation algorithm
        // For now, return events based on user's past RSVPs categories
        const userRsvps = await RSVP.findAll({
            where: { userId },
            include: [{
                model: Event,
                as: 'event',
                attributes: ['category']
            }]
        });

        const userCategories = [...new Set(userRsvps.map(rsvp => rsvp.event?.category).filter(Boolean))];

        let recommendedEvents;
        if (userCategories.length > 0) {
            // Get events in categories user has shown interest in
            recommendedEvents = await Event.findAll({
                where: {
                    status: 'published',
                    category: userCategories
                },
                include: [
                    {
                        model: User,
                        as: 'organizer',
                        attributes: ['id', 'firstName', 'lastName', 'email']
                    }
                ],
                order: [['RANDOM()']]
            });
        } else {
            // New user with no history - return random events
            recommendedEvents = await Event.findAll({
                where: { status: 'published' },
                include: [
                    {
                        model: User,
                        as: 'organizer',
                        attributes: ['id', 'firstName', 'lastName', 'email']
                    }
                ],
                order: [['RANDOM()']],
                limit: 10
            });
        }

        res.status(200).json({
            success: true,
            count: recommendedEvents.length,
            events: recommendedEvents,
            userCategories,
            recommendation_type: userCategories.length > 0 ? 'interest-based' : 'discovery'
        });
    } catch (error) {
        console.error('Error getting recommendations:', error);
        res.status(500).json({
            success: false,
            message: 'Error getting recommendations'
        });
    }
});

// @route   POST /api/events
// @desc    Create new event
// @access  Private (Organizers only)
router.post('/', [
    auth,
    checkRole(['organizer', 'admin']),
    upload.single('eventImage'),
    body('title').notEmpty().withMessage('Title is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('location').notEmpty().withMessage('Location is required'),
    body('startDate').isISO8601().withMessage('Start date must be a valid date'),
    body('endDate').isISO8601().withMessage('End date must be a valid date'),
    body('category').notEmpty().withMessage('Category is required')
], validate, async (req, res) => {
    try {
        const {
            title,
            description,
            location,
            startDate,
            endDate,
            category,
            capacity,
            registrationDeadline
        } = req.body;

        // Handle file upload
        let imageUrl = null;
        if (req.file) {
            // Create relative URL path to the uploaded file
            imageUrl = `/uploads/${req.file.filename}`;
        }

        const newEvent = await Event.create({
            title,
            description,
            location,
            startDate,
            endDate,
            category,
            imageUrl,
            capacity,
            registrationDeadline,
            organizerId: req.user.id
        });

        // Award points for creating an event
        try {
            await LeaderboardService.awardEventCreationPoints(
                req.user.id,
                newEvent.id,
                newEvent.title
            );
        } catch (pointsError) {
            console.warn('Failed to award points for event creation:', pointsError);
        }

        res.status(201).json({
            success: true,
            message: 'Event created successfully',
            event: newEvent
        });
    } catch (error) {
        console.error('Create event error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error creating event'
        });
    }
});

// @route   PUT /api/events/:id
// @desc    Update event
// @access  Private (Event organizer only)
router.put('/:id', [
    auth,
    body('title').optional().notEmpty().withMessage('Title cannot be empty'),
    body('startDate').optional().isISO8601().withMessage('Start date must be a valid date'),
    body('endDate').optional().isISO8601().withMessage('End date must be a valid date')
], validate, async (req, res) => {
    try {
        const event = await Event.findByPk(req.params.id);

        if (!event) {
            return res.status(404).json({
                success: false,
                message: 'Event not found'
            });
        }

        // Check if user is the organizer
        if (event.organizerId !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to update this event'
            });
        }

        // Update event
        await event.update(req.body);

        res.status(200).json({
            success: true,
            message: 'Event updated successfully',
            event
        });
    } catch (error) {
        console.error('Update event error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error updating event'
        });
    }
});

// @route   DELETE /api/events/:id
// @desc    Delete event
// @access  Private (Event organizer or admin only)
router.delete('/:id', auth, async (req, res) => {
    try {
        const event = await Event.findByPk(req.params.id);

        if (!event) {
            return res.status(404).json({
                success: false,
                message: 'Event not found'
            });
        }

        // Check if user is the organizer or admin
        if (event.organizerId !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to delete this event'
            });
        }

        // Delete event
        await event.destroy();

        res.status(200).json({
            success: true,
            message: 'Event deleted successfully'
        });
    } catch (error) {
        console.error('Delete event error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error deleting event'
        });
    }
});

// @route   POST /api/events/:id/rsvp
// @desc    RSVP to an event
// @access  Private
router.post('/:id/rsvp', [
    auth,
    body('status').isIn(['attending', 'interested', 'not_attending']).withMessage('Status must be attending, interested or not_attending')
], validate, async (req, res) => {
    try {
        const event = await Event.findByPk(req.params.id);

        if (!event) {
            return res.status(404).json({
                success: false,
                message: 'Event not found'
            });
        }

        // Check if user has already RSVP'd
        let rsvp = await RSVP.findOne({
            where: {
                eventId: req.params.id,
                userId: req.user.id
            }
        });

        const isNewRSVP = !rsvp;
        const wasAttending = rsvp && rsvp.status === 'attending';

        if (rsvp) {
            // Update existing RSVP
            rsvp = await rsvp.update({ status: req.body.status });
        } else {
            // Create new RSVP
            rsvp = await RSVP.create({
                eventId: req.params.id,
                userId: req.user.id,
                status: req.body.status
            });
        }

        // Award points for attending events (only for new attendances)
        if (req.body.status === 'attending' && (!wasAttending || isNewRSVP)) {
            try {
                // Check if this is early registration (more than 24 hours before event)
                const eventDate = new Date(event.startDate);
                const now = new Date();
                const hoursUntilEvent = (eventDate - now) / (1000 * 60 * 60);
                const isEarlyRegistration = hoursUntilEvent > 24;

                await LeaderboardService.awardEventAttendancePoints(
                    req.user.id,
                    event.id,
                    event.title,
                    isEarlyRegistration
                );
            } catch (pointsError) {
                console.warn('Failed to award points for event attendance:', pointsError);
            }
        }

        res.status(200).json({
            success: true,
            message: 'RSVP updated successfully',
            rsvp
        });
    } catch (error) {
        console.error('RSVP error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error updating RSVP'
        });
    }
});

module.exports = router;