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

// @route   GET /api/users/me/events
// @desc    Get events the current user has RSVP'd to
// @access  Private
router.get('/me/events', auth, async (req, res) => {
    try {
        // Find all RSVPs for the current user
        const rsvps = await RSVP.findAll({
            where: { userId: req.user.id },
            include: [{
                model: Event,
                as: 'event',
                include: [{
                    model: User,
                    as: 'organizer',
                    attributes: ['id', 'firstName', 'lastName']
                }]
            }]
        });

        // Map the RSVPs to include the event data and RSVP status
        const events = rsvps.map(rsvp => ({
            id: rsvp.event.id,
            title: rsvp.event.title,
            description: rsvp.event.description,
            location: rsvp.event.location,
            startDate: rsvp.event.startDate,
            endDate: rsvp.event.endDate,
            category: rsvp.event.category,
            imageUrl: rsvp.event.imageUrl,
            rsvpStatus: rsvp.status,
            organizer: rsvp.event.organizer
        }));

        res.status(200).json({
            success: true,
            count: events.length,
            events
        });
    } catch (error) {
        console.error('Get user events error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error getting user events'
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