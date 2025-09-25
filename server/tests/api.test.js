const request = require('supertest');
const path = require('path');
const fs = require('fs');
const { sequelize } = require('../config/database');
const app = require('../index');  // Assuming your Express app is exported from index.js
const seedDatabase = require('../seeders/seed');

// Test user credentials
const TEST_USER = {
    email: 'student1@campusnex.com',
    password: 'Student@123'
};

// Variables to store tokens and IDs for tests
let authToken;
let eventId;

// Create temporary test directory for file uploads during tests
const testUploadsDir = path.join(__dirname, '../uploads-test');
if (!fs.existsSync(testUploadsDir)) {
    fs.mkdirSync(testUploadsDir, { recursive: true });
}

// Setup for tests
beforeAll(async () => {
    // Override upload directory for tests
    process.env.UPLOAD_DIR = testUploadsDir;

    // Reset and seed database with test data
    await sequelize.sync({ force: true });
    await seedDatabase();

    // Login to get auth token
    const res = await request(app)
        .post('/api/auth/login')
        .send({
            email: TEST_USER.email,
            password: TEST_USER.password
        });

    authToken = res.body.token;
});

// Cleanup after tests
afterAll(async () => {
    // Close database connection
    await sequelize.close();

    // Clean up test upload directory
    if (fs.existsSync(testUploadsDir)) {
        fs.rmdirSync(testUploadsDir, { recursive: true });
    }
});

describe('Authentication API', () => {
    test('Should login with valid credentials', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: TEST_USER.email,
                password: TEST_USER.password
            });

        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.token).toBeDefined();
        expect(res.body.user).toBeDefined();
    });

    test('Should fail login with invalid credentials', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: TEST_USER.email,
                password: 'wrongpassword'
            });

        expect(res.statusCode).toBe(401);
        expect(res.body.success).toBe(false);
    });

    test('Should get current user profile', async () => {
        const res = await request(app)
            .get('/api/auth/me')
            .set('Authorization', `Bearer ${authToken}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.user).toBeDefined();
        expect(res.body.user.email).toBe(TEST_USER.email);
    });
});

describe('Events API', () => {
    test('Should get all published events', async () => {
        const res = await request(app)
            .get('/api/events');

        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(Array.isArray(res.body.events)).toBe(true);
        expect(res.body.events.length).toBeGreaterThan(0);

        // Store first event ID for later tests
        eventId = res.body.events[0].id;
    });

    test('Should get a single event by ID', async () => {
        const res = await request(app)
            .get(`/api/events/${eventId}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.event).toBeDefined();
        expect(res.body.event.id).toBe(eventId);
    });

    test('Should RSVP to an event', async () => {
        const res = await request(app)
            .post(`/api/events/${eventId}/rsvp`)
            .set('Authorization', `Bearer ${authToken}`)
            .send({
                status: 'attending'
            });

        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.message).toContain('RSVP');
    });
});

describe('User API', () => {
    test('Should get user profile', async () => {
        const res = await request(app)
            .get('/api/users/profile')
            .set('Authorization', `Bearer ${authToken}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.user).toBeDefined();
    });

    test('Should get user\'s events', async () => {
        const res = await request(app)
            .get('/api/users/events')
            .set('Authorization', `Bearer ${authToken}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(Array.isArray(res.body.events)).toBe(true);
    });

    test('Should update user profile', async () => {
        const newBio = 'Updated bio for testing';

        const res = await request(app)
            .put('/api/users/profile')
            .set('Authorization', `Bearer ${authToken}`)
            .send({
                bio: newBio
            });

        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.user).toBeDefined();
        expect(res.body.user.bio).toBe(newBio);
    });
});