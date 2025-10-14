const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const UserStats = sequelize.define('UserStats', {
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
        }
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
    }
}, {
    indexes: [
        {
            fields: ['totalPoints']
        },
        {
            fields: ['userId']
        },
        {
            fields: ['rank']
        }
    ]
});

module.exports = UserStats;