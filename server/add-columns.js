// Simple script to add missing columns to Users table
const { sequelize } = require('./config/database');

async function addMissingColumns() {
    try {
        console.log('Connecting to database...');
        await sequelize.authenticate();
        console.log('Connected successfully');

        // Add organization column
        try {
            await sequelize.query(`
                ALTER TABLE "Users" 
                ADD COLUMN "organization" VARCHAR(255)
            `);
            console.log('✅ Added organization column');
        } catch (error) {
            if (error.message.includes('already exists')) {
                console.log('⚠️ Organization column already exists');
            } else {
                console.error('❌ Error adding organization column:', error.message);
            }
        }

        // Add position column
        try {
            await sequelize.query(`
                ALTER TABLE "Users" 
                ADD COLUMN "position" VARCHAR(255)
            `);
            console.log('✅ Added position column');
        } catch (error) {
            if (error.message.includes('already exists')) {
                console.log('⚠️ Position column already exists');
            } else {
                console.error('❌ Error adding position column:', error.message);
            }
        }

        console.log('🎉 Migration completed successfully!');

    } catch (error) {
        console.error('❌ Migration failed:', error);
    } finally {
        await sequelize.close();
        process.exit(0);
    }
}

addMissingColumns();