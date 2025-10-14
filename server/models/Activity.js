const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Activity = sequelize.define('Activity', {
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
        }
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
        }
    },
    metadata: {
        type: DataTypes.JSON,
        allowNull: true,
        comment: 'Additional activity data like event title, early registration bonus, etc.'
    },
    timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    }
}, {
    indexes: [
        {
            fields: ['userId']
        },
        {
            fields: ['activityType']
        },
        {
            fields: ['timestamp']
        },
        {
            fields: ['eventId']
        }
    ]
});

module.exports = Activity;