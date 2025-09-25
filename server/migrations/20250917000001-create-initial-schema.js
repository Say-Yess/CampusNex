const { DataTypes } = require('sequelize');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        // Create Users table
        await queryInterface.createTable('Users', {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            firstName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            lastName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            role: {
                type: DataTypes.ENUM('student', 'organizer', 'admin'),
                defaultValue: 'student'
            },
            universityId: {
                type: DataTypes.STRING,
                allowNull: true
            },
            profilePicture: {
                type: DataTypes.STRING,
                allowNull: true
            },
            department: {
                type: DataTypes.STRING,
                allowNull: true
            },
            bio: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            points: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: Sequelize.fn('NOW')
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: Sequelize.fn('NOW')
            }
        });

        // Create Events table
        await queryInterface.createTable('Events', {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            location: {
                type: DataTypes.STRING,
                allowNull: false
            },
            startDate: {
                type: DataTypes.DATE,
                allowNull: false
            },
            endDate: {
                type: DataTypes.DATE,
                allowNull: false
            },
            category: {
                type: DataTypes.STRING,
                allowNull: false
            },
            imageUrl: {
                type: DataTypes.STRING,
                allowNull: true
            },
            capacity: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            organizerId: {
                type: DataTypes.UUID,
                references: {
                    model: 'Users',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
            },
            status: {
                type: DataTypes.ENUM('draft', 'published', 'cancelled'),
                defaultValue: 'draft'
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: Sequelize.fn('NOW')
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: Sequelize.fn('NOW')
            }
        });

        // Create RSVPs table
        await queryInterface.createTable('RSVPs', {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            userId: {
                type: DataTypes.UUID,
                references: {
                    model: 'Users',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            eventId: {
                type: DataTypes.UUID,
                references: {
                    model: 'Events',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            status: {
                type: DataTypes.ENUM('attending', 'interested', 'not_attending'),
                allowNull: false,
                defaultValue: 'attending'
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: Sequelize.fn('NOW')
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: Sequelize.fn('NOW')
            }
        });

        // Add unique constraint to prevent duplicate RSVPs
        await queryInterface.addConstraint('RSVPs', {
            fields: ['userId', 'eventId'],
            type: 'unique',
            name: 'user_event_unique'
        });
    },

    down: async (queryInterface, Sequelize) => {
        // Drop tables in reverse order
        await queryInterface.dropTable('RSVPs');
        await queryInterface.dropTable('Events');
        await queryInterface.dropTable('Users');
    }
};