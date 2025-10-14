'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        // Create UserStats table
        await queryInterface.createTable('UserStats', {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true
            },
            userId: {
                type: Sequelize.UUID,
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
                type: Sequelize.INTEGER,
                defaultValue: 0,
                allowNull: false
            },
            eventsCreated: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
                allowNull: false
            },
            eventsAttended: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
                allowNull: false
            },
            currentStreak: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
                allowNull: false
            },
            longestStreak: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
                allowNull: false
            },
            lastActivity: {
                type: Sequelize.DATE,
                allowNull: true
            },
            rank: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false
            }
        });

        // Create Activities table
        await queryInterface.createTable('Activities', {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true
            },
            userId: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'Users',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            activityType: {
                type: Sequelize.ENUM(
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
                type: Sequelize.INTEGER,
                allowNull: false
            },
            eventId: {
                type: Sequelize.UUID,
                allowNull: true,
                references: {
                    model: 'Events',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
            },
            metadata: {
                type: Sequelize.JSON,
                allowNull: true
            },
            timestamp: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW,
                allowNull: false
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false
            }
        });

        // Add indexes
        await queryInterface.addIndex('UserStats', ['totalPoints']);
        await queryInterface.addIndex('UserStats', ['userId']);
        await queryInterface.addIndex('UserStats', ['rank']);
        await queryInterface.addIndex('Activities', ['userId']);
        await queryInterface.addIndex('Activities', ['activityType']);
        await queryInterface.addIndex('Activities', ['timestamp']);
        await queryInterface.addIndex('Activities', ['eventId']);
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Activities');
        await queryInterface.dropTable('UserStats');
    }
};