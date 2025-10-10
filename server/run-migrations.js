const { Sequelize } = require('sequelize');
const path = require('path');

// Create Sequelize instance with production database
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: console.log,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});

async function runMigrations() {
    try {
        console.log('🔄 Connecting to database...');
        await sequelize.authenticate();
        console.log('✅ Database connection established.');

        console.log('🔄 Running database migrations...');

        // Import the migration
        const migration = require('./migrations/20251010-add-google-oauth-fields.js');

        // Run the migration
        await migration.up(sequelize.getQueryInterface(), Sequelize);

        console.log('✅ Database migrations completed successfully!');

        // Test the new columns
        console.log('🔄 Testing new columns...');
        const [results] = await sequelize.query("SELECT googleId, provider, profilePicture FROM \"Users\" LIMIT 1");
        console.log('✅ New columns are accessible:', results);

    } catch (error) {
        console.error('❌ Migration failed:', error);
        process.exit(1);
    } finally {
        await sequelize.close();
        console.log('🔄 Database connection closed.');
        process.exit(0);
    }
}

runMigrations();