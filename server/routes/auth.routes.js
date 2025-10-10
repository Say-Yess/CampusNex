const express = require('express');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const passport = require('../config/passport');
const { User } = require('../models');
const router = express.Router();

// Middleware to handle validation errors
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', [
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('firstName').notEmpty().withMessage('First name is required'),
    body('lastName').notEmpty().withMessage('Last name is required'),
    body('role').isIn(['student', 'organizer']).withMessage('Role must be either student or organizer')
], validate, async (req, res) => {
    try {
        const { email, password, firstName, lastName, role } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User with this email already exists'
            });
        }

        // Create new user
        const user = await User.create({
            email,
            password,
            firstName,
            lastName,
            role
        });

        // Generate JWT token
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role
            },
            token
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error during registration'
        });
    }
});

// @route   POST /api/auth/login
// @desc    Login a user
// @access  Public
router.post('/login', [
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').notEmpty().withMessage('Password is required')
], validate, async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Check password
        const isMatch = await user.checkPassword(password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        res.status(200).json({
            success: true,
            message: 'Login successful',
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role
            },
            token
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error during login'
        });
    }
});

// @route   POST /api/auth/signup
// @desc    Register a new user (alias for register)
// @access  Public
router.post('/signup', [
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('firstName').notEmpty().withMessage('First name is required'),
    body('lastName').notEmpty().withMessage('Last name is required'),
    body('role').optional().isIn(['student', 'organizer']).withMessage('Role must be either student or organizer')
], validate, async (req, res) => {
    try {
        const { email, password, firstName, lastName, role = 'student' } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User with this email already exists'
            });
        }

        // Create new user
        const user = await User.create({
            email,
            password,
            firstName,
            lastName,
            role
        });

        // Generate JWT token
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role
            },
            token
        });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error during signup'
        });
    }
});

// @route   GET /api/auth/google
// @desc    OAuth with Google - Redirect to Google
// @access  Public
router.get('/google', (req, res, next) => {
    // Check if Google OAuth is configured
    if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
        return res.status(501).json({
            success: false,
            message: 'Google OAuth not configured. Please set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET environment variables.'
        });
    }

    // Store the role in session for use in callback
    if (req.query.role) {
        req.session.userRole = req.query.role;
    }
    passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
});

// @route   GET /api/auth/google/callback
// @desc    Google OAuth callback
// @access  Public
router.get('/google/callback', (req, res, next) => {
    // Check if Google OAuth is configured
    if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
        const frontendURL = process.env.FRONTEND_URL || 'http://localhost:3000';
        return res.redirect(`${frontendURL}/login?error=oauth_not_configured`);
    }

    passport.authenticate('google', { session: false })(req, res, next);
}, async (req, res) => {
    try {
        let user = req.user;

        // If user was just created and we have a role preference in session, update it
        if (req.session.userRole && user.provider === 'google') {
            user.role = req.session.userRole;
            await user.save();
            // Clear the role from session
            delete req.session.userRole;
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        // Redirect to frontend with token and user info
        const frontendURL = process.env.FRONTEND_URL || 'http://localhost:3000';
        res.redirect(`${frontendURL}/auth/callback?token=${token}&user=${encodeURIComponent(JSON.stringify({
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            profilePicture: user.profilePicture
        }))}`);
    } catch (error) {
        console.error('Google OAuth callback error:', error);
        // Temporarily return detailed error for debugging
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: process.env.NODE_ENV === 'production' ? 'Internal Server Error' : error.message,
            details: process.env.NODE_ENV === 'production' ? undefined : error.stack
        });
    }
}
);

// @route   POST /api/auth/google/token
// @desc    Authenticate with Google ID token (for Firebase integration)
// @access  Public
router.post('/google/token', [
    body('idToken').notEmpty().withMessage('Google ID token is required'),
    body('role').optional().isIn(['student', 'organizer']).withMessage('Role must be either student or organizer')
], validate, async (req, res) => {
    try {
        const { idToken, role = 'student' } = req.body;

        // Here you would verify the Google ID token
        // For now, we'll implement a basic version
        // In production, use Google's token verification library

        // This is a placeholder - you should verify the idToken with Google
        // const ticket = await client.verifyIdToken({
        //     idToken,
        //     audience: process.env.GOOGLE_CLIENT_ID,
        // });
        // const payload = ticket.getPayload();

        // For demo purposes, we'll extract user info from the token
        // In production, properly decode and verify the JWT
        res.status(501).json({
            success: false,
            message: 'Google ID token verification not yet implemented. Use the /google redirect flow instead.'
        });

    } catch (error) {
        console.error('Google token verification error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error during Google authentication'
        });
    }
});

// @route   GET /api/auth/facebook
// @desc    OAuth with Facebook (placeholder)
// @access  Public
router.get('/facebook', (req, res) => {
    res.status(501).json({
        success: false,
        message: 'Facebook OAuth not yet implemented. Please use email signup.'
    });
});

// @route   GET /api/auth/me
// @desc    Get current user profile
// @access  Private
router.get('/me', async (req, res) => {
    try {
        // Authorization header check is handled by middleware in a real implementation
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'No token, authorization denied'
            });
        }

        try {
            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user by id
            const user = await User.findByPk(decoded.id, {
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
        } catch (err) {
            return res.status(401).json({
                success: false,
                message: 'Token is not valid'
            });
        }
    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error getting profile'
        });
    }
});

module.exports = router;