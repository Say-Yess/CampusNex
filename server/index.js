const express = require('express');
const cors = require('cors');
const session = require('express-session');
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
app.use(session({
    secret: process.env.SESSION_SECRET || 'your-session-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

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

// Temporary migration endpoint (REMOVE AFTER USE)
app.get('/api/migrate-db', async (req, res) => {
    try {
        const { Sequelize } = require('sequelize');
        const { sequelize } = require('./config/database');
        
        console.log('🔄 Running safe database migration...');
        
        const queryInterface = sequelize.getQueryInterface();
        
        // Check and add googleId column
        try {
            await queryInterface.addColumn('Users', 'googleId', {
                type: Sequelize.STRING,
                allowNull: true,
                unique: true
            });
            console.log('✅ Added googleId column');
        } catch (error) {
            if (error.message.includes('already exists')) {
                console.log('ℹ️ googleId column already exists');
            } else {
                throw error;
            }
        }
        
        // Check and add provider column
        try {
            await queryInterface.addColumn('Users', 'provider', {
                type: Sequelize.ENUM('local', 'google'),
                allowNull: false,
                defaultValue: 'local'
            });
            console.log('✅ Added provider column');
        } catch (error) {
            if (error.message.includes('already exists')) {
                console.log('ℹ️ provider column already exists');
            } else {
                throw error;
            }
        }
        
        // Make password optional for OAuth users
        try {
            await queryInterface.changeColumn('Users', 'password', {
                type: Sequelize.STRING,
                allowNull: true
            });
            console.log('✅ Made password column optional');
        } catch (error) {
            console.log('ℹ️ Password column change skipped:', error.message);
        }
        
        console.log('✅ Migration completed successfully!');
        
        res.json({
            success: true,
            message: 'Database migration completed successfully!',
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('❌ Migration failed:', error);
        res.status(500).json({
            success: false,
            message: 'Migration failed',
            error: error.message,
            stack: error.stack,
            timestamp: new Date().toISOString()
        });
    }
});

// Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/events', require('./routes/events.routes'));
app.use('/api/users', require('./routes/users.routes'));
app.use('/api/leaderboard', require('./routes/leaderboard.routes'));

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