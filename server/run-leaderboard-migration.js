const { sequelize } = require('./config/database');
const { DataTypes } = require('sequelize');

async function runMigration() {
    try {
        console.log('🔄 Running leaderboard tables migration...');

        // Create UserStats table
        await sequelize.getQueryInterface().createTable('UserStats', {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            userId: {
                type: DataTypes.UUID,
                allowNull: false,
                unique: true,
                references: {
                    model: 'Users',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            totalPoints: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
                allowNull: false
            },
            eventsCreated: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
                allowNull: false
            },
            eventsAttended: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
                allowNull: false
            },
            currentStreak: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
                allowNull: false
            },
            longestStreak: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
                allowNull: false
            },
            lastActivity: {
                type: DataTypes.DATE,
                allowNull: true
            },
            rank: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false
            }
        });

        console.log('✅ UserStats table created');

        // Create Activities table
        await sequelize.getQueryInterface().createTable('Activities', {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            userId: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'Users',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            activityType: {
                type: DataTypes.ENUM(
                    'create_event',
                    'attend_event',
                    'early_registration',
                    'event_review',
                    'profile_complete',
                    'daily_login',
                    'share_event'
                ),
                allowNull: false
            },
            points: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            eventId: {
                type: DataTypes.UUID,
                allowNull: true,
                references: {
                    model: 'Events',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
            },
            metadata: {
                type: DataTypes.JSON,
                allowNull: true
            },
            timestamp: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
                allowNull: false
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false
            }
        });

        console.log('✅ Activities table created');

        // Add indexes
        await sequelize.getQueryInterface().addIndex('UserStats', ['totalPoints']);
        await sequelize.getQueryInterface().addIndex('UserStats', ['userId']);
        await sequelize.getQueryInterface().addIndex('UserStats', ['rank']);
        await sequelize.getQueryInterface().addIndex('Activities', ['userId']);
        await sequelize.getQueryInterface().addIndex('Activities', ['activityType']);
        await sequelize.getQueryInterface().addIndex('Activities', ['timestamp']);
        await sequelize.getQueryInterface().addIndex('Activities', ['eventId']);

        console.log('✅ Indexes created');
        console.log('🎉 Migration completed successfully!');

        await sequelize.close();
        process.exit(0);
    } catch (error) {
        console.error('❌ Migration failed:', error);
        await sequelize.close();
        process.exit(1);
    }
}

runMigration();