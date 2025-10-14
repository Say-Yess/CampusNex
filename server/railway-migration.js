const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

// Use the public DATABASE_URL for external connections
const databaseUrl = process.env.DATABASE_PUBLIC_URL || process.env.DATABASE_URL;
console.log('🔗 Using database URL:', databaseUrl ? 'Connected' : 'No URL found');

const sequelize = new Sequelize(databaseUrl, {
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
        ssl: { require: true, rejectUnauthorized: false }
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

async function runMigrations() {
    try {
        console.log('🔄 Connecting to Railway PostgreSQL...');

        // Test connection
        await sequelize.authenticate();
        console.log('✅ Database connection established successfully.');

        // Force sync models to create tables and add missing columns
        console.log('🔄 Synchronizing database models...');
        await sequelize.sync({ alter: true });
        console.log('✅ Database models synchronized successfully.');

        // Check if leaderboard tables exist and have data
        const [userStatsResults] = await sequelize.query("SELECT COUNT(*) as count FROM \"UserStats\"");
        const [activitiesResults] = await sequelize.query("SELECT COUNT(*) as count FROM \"Activities\"");

        console.log(`📊 UserStats table has ${userStatsResults[0].count} records`);
        console.log(`📊 Activities table has ${activitiesResults[0].count} records`);

        console.log('🎉 Railway database migration completed successfully!');

    } catch (error) {
        console.error('❌ Migration failed:', error.message);
        process.exit(1);
    } finally {
        await sequelize.close();
        process.exit(0);
    }
}

runMigrations();