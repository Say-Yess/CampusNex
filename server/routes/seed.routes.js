// server/routes/seed.routes.js
const express = require('express');
const router = express.Router();
const { seedCambodiaEvents } = require('../scripts/seedCambodiaEvents');

// Safe endpoint to seed Cambodia university events
router.post('/cambodia-events', async (req, res) => {
    try {
        console.log('🌱 Manual seeding triggered via API...');

        const result = await seedCambodiaEvents();

        res.json({
            success: true,
            message: 'Cambodia university events seeded successfully!',
            data: result,
            timestamp: new Date().toISOString(),
            note: 'All existing data (users, RSVPs) was preserved'
        });

    } catch (error) {
        console.error('❌ Seeding error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to seed Cambodia events',
            error: error.message,
            timestamp: new Date().toISOString()
        });
    }
});

// Get seeding status/info
router.get('/status', async (req, res) => {
    try {
        const { Event } = require('../models');
        const totalEvents = await Event.count();
        const cambodiaEvents = await Event.count({
            where: {
                id: {
                    [require('sequelize').Op.like]: 'cambodia-%'
                }
            }
        });

        res.json({
            success: true,
            data: {
                totalEvents,
                cambodiaEvents,
                otherEvents: totalEvents - cambodiaEvents,
                lastChecked: new Date().toISOString()
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

module.exports = router;