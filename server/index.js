const express = require('express');
const cors = require('cors');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const dotenv = require('dotenv');
const path = require('path');
const passport = require('./config/passport');
const { sequelize } = require('./config/database');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

// Session configuration for Passport
let sessionConfig = {
    secret: process.env.SESSION_SECRET || process.env.JWT_SECRET || 'your-session-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
};

// Use PostgreSQL session store in production to avoid memory leaks
if (process.env.NODE_ENV === 'production' && process.env.DATABASE_URL) {
    try {
        sessionConfig.store = new pgSession({
            conString: process.env.DATABASE_URL,
            tableName: 'session',
            createTableIfMissing: true
        });
        console.log('✅ Using PostgreSQL session store for production');
    } catch (error) {
        console.warn('⚠️ Failed to initialize PostgreSQL session store, falling back to MemoryStore:', error.message);
    }
}

app.use(session(sessionConfig));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Debug endpoint to check deployment
app.get('/api/debug', (req, res) => {
    res.json({
        message: 'Server is running',
        timestamp: new Date().toISOString(),
        env: process.env.NODE_ENV,
        hasGoogleCredentials: !!(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET),
        hasJWTSecret: !!process.env.JWT_SECRET,
        version: 'v2-debug-enabled'
    });
});

// Debug endpoint for user events
app.get('/api/debug-user-events', async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.json({ error: 'No auth header' });
        }

        const token = authHeader.split(' ')[1];
        const jwt = require('jsonwebtoken');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const { User, Event, RSVP } = require('./models');

        // Get user info
        const user = await User.findByPk(decoded.id);

        // Get all RSVPs for this user
        const rsvps = await RSVP.findAll({
            where: { userId: decoded.id },
            include: [{ model: Event, as: 'event' }]
        });

        // Get all events (for comparison)
        const allEvents = await Event.findAll();

        res.json({
            user: { id: user.id, email: user.email, provider: user.provider },
            rsvpCount: rsvps.length,
            rsvps: rsvps.map(r => ({ eventId: r.eventId, status: r.status })),
            totalEvents: allEvents.length
        });
    } catch (error) {
        res.json({ error: error.message });
    }
});

// Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/events', require('./routes/events.routes'));
app.use('/api/users', require('./routes/users.routes'));
app.use('/api/leaderboard', require('./routes/leaderboard'));
app.use('/api/seed', require('./routes/seed.routes')); // Safe database seeding
app.use('/api/admin', require('./routes/admin')); // Admin utilities

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Server Error',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// Define port
const PORT = process.env.PORT || 5000;

// Database connection and server start
const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection established successfully.');

        // Sync database models (using force for clean setup)
        await sequelize.sync();
        console.log('Database models synchronized.');

        app.listen(PORT, () => {
            console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1);
    }
};

// Start server if this file is run directly
if (require.main === module) {
    startServer();
}

// Export app for testing
module.exports = app;