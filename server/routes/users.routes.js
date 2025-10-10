const express = require('express');
const { body, validationResult } = require('express-validator');
const { User, Event, RSVP } = require('../models');
const { auth, checkRole } = require('../middleware/auth');
const upload = require('../middleware/upload');
const router = express.Router();

// Middleware to handle validation errors
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// @route   GET /api/users/profile
// @desc    Get current user's profile
// @access  Private
router.get('/profile', auth, async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id, {
            attributes: { exclude: ['password'] }
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});

// @route   GET /api/users/me/test
// @desc    Test database connectivity and basic queries
// @access  Private
router.get('/me/test', auth, async (req, res) => {
    try {
        console.log('Testing database for user ID:', req.user.id);
        
        // Test 1: Can we find the user?
        const user = await User.findByPk(req.user.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found in test'
            });
        }
        
        // Test 2: Can we query RSVPs table at all?
        const allRsvps = await RSVP.findAll({ 
            limit: 5,
            raw: true 
        });
        
        // Test 3: Can we query for this user's RSVPs specifically?
        const userRsvps = await RSVP.findAll({
            where: { userId: req.user.id },
            raw: true
        });
        
        // Test 4: Can we query Events table?
        const allEvents = await Event.findAll({ 
            limit: 5,
            raw: true 
        });
        
        res.status(200).json({
            success: true,
            tests: {
                userFound: !!user,
                userName: user ? `${user.firstName} ${user.lastName}` : null,
                totalRsvpsInDatabase: allRsvps.length,
                userRsvpsCount: userRsvps.length,
                totalEventsInDatabase: allEvents.length,
                userRsvpsData: userRsvps
            }
        });
    } catch (error) {
        console.error('Database test error:', error);
        res.status(500).json({
            success: false,
            message: 'Database test failed',
            error: error.message
        });
    }
});

// @route   GET /api/users/me/events
// @desc    Get events the current user has RSVP'd to
// @access  Private
router.get('/me/events', auth, async (req, res) => {
    try {
        console.log('=== FETCHING USER EVENTS ===');
        console.log('User ID:', req.user.id);
        
        // Step 1: Check if user exists
        const user = await User.findByPk(req.user.id);
        if (!user) {
            console.log('User not found');
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        console.log('✓ User found:', user.firstName, user.lastName);
        
        // Step 2: Try basic RSVP query first
        console.log('Querying RSVPs...');
        const basicRsvps = await RSVP.findAll({
            where: { userId: req.user.id },
            raw: true
        });
        console.log(`✓ Found ${basicRsvps.length} basic RSVPs`);
        
        // Return empty array if no RSVPs (normal for new users)
        if (basicRsvps.length === 0) {
            console.log('No RSVPs found - returning empty array');
            return res.status(200).json({
                success: true,
                count: 0,
                events: []
            });
        }
        
        // Step 3: Get event IDs from RSVPs
        const eventIds = basicRsvps.map(rsvp => rsvp.eventId);
        console.log('Event IDs from RSVPs:', eventIds);
        
        // Step 4: Query events separately to avoid association issues
        const events = await Event.findAll({
            where: {
                id: eventIds
            },
            include: [{
                model: User,
                as: 'organizer',
                attributes: ['id', 'firstName', 'lastName'],
                required: false
            }]
        });
        console.log(`✓ Found ${events.length} events`);
        
        // Step 5: Combine RSVP status with event data
        const userEvents = events.map(event => {
            const rsvp = basicRsvps.find(r => r.eventId === event.id);
            return {
                id: event.id,
                title: event.title,
                description: event.description,
                location: event.location,
                startDate: event.startDate,
                endDate: event.endDate,
                category: event.category,
                imageUrl: event.imageUrl,
                rsvpStatus: rsvp ? rsvp.status : 'attending',
                organizer: event.organizer || { firstName: 'Unknown', lastName: 'Organizer' }
            };
        });

        console.log(`✓ Returning ${userEvents.length} events to frontend`);
        res.status(200).json({
            success: true,
            count: userEvents.length,
            events: userEvents
        });
        
    } catch (error) {
        console.error('❌ ERROR in /me/events:');
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
        console.error('Error details:', error);
        
        res.status(500).json({
            success: false,
            message: 'Server error getting user events',
            error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
        });
    }
});

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', [
    auth,
    upload.single('profileImage'),
    body('email').optional().isEmail().withMessage('Please provide a valid email'),
    body('firstName').optional().notEmpty().withMessage('First name cannot be empty'),
    body('lastName').optional().notEmpty().withMessage('Last name cannot be empty')
], validate, async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Handle file upload
        let profilePicture = null;
        if (req.file) {
            // Create relative URL path to the uploaded file
            profilePicture = `/uploads/${req.file.filename}`;
        }

        // Fields that are allowed to be updated
        const {
            firstName,
            lastName,
            bio,
            major,
            yearOfStudy
        } = req.body;

        // Update fields
        if (firstName) user.firstName = firstName;
        if (lastName) user.lastName = lastName;
        if (profilePicture) user.profilePicture = profilePicture;
        if (bio) user.bio = bio;
        if (major) user.major = major;
        if (yearOfStudy) user.yearOfStudy = yearOfStudy;

        await user.save();

        res.status(200).json({
            success: true,
            message: 'Profile updated successfully',
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
                profilePicture: user.profilePicture,
                bio: user.bio,
                major: user.major,
                yearOfStudy: user.yearOfStudy
            }
        });
    } catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error updating profile'
        });
    }
});

// @route   GET /api/users/events
// @desc    Get user's events (organized and RSVPed)
// @access  Private
router.get('/events', auth, async (req, res) => {
    try {
        // Get events organized by user
        const organizedEvents = await Event.findAll({
            where: { organizerId: req.user.id },
            include: [
                {
                    model: User,
                    as: 'organizer',
                    attributes: ['id', 'firstName', 'lastName']
                }
            ]
        });

        // Get events user has RSVPed to
        const rsvps = await RSVP.findAll({
            where: { userId: req.user.id },
            include: [
                {
                    model: Event,
                    include: [
                        {
                            model: User,
                            as: 'organizer',
                            attributes: ['id', 'firstName', 'lastName']
                        }
                    ]
                }
            ]
        });

        // Format RSVPed events
        const rsvpedEvents = rsvps.map(rsvp => ({
            ...rsvp.Event.dataValues,
            rsvpStatus: rsvp.status
        }));

        res.status(200).json({
            success: true,
            organizedEvents,
            rsvpedEvents
        });
    } catch (error) {
        console.error('Get user events error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});

module.exports = router;