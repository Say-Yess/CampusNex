/**
 * Script to seed the database with initial data
 */
require('dotenv').config();
const seedDatabase = require('../seeders/seed');

const runSeed = async () => {
    try {
        await seedDatabase();
        console.log('Seed script completed successfully');
        process.exit(0);
    } catch (error) {
        console.error('Seed script failed:', error);
        process.exit(1);
    }
};

runSeed();