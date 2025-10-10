const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const User = require('./User');
const Event = require('./Event');

const RSVP = sequelize.define('RSVP', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    status: {
        type: DataTypes.ENUM('attending', 'interested', 'not_attending'),
        allowNull: false,
        defaultValue: 'attending'
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
});

// Establish relationships
RSVP.belongsTo(User, { foreignKey: 'userId', as: 'user' });
RSVP.belongsTo(Event, { foreignKey: 'eventId', as: 'event' });
User.hasMany(RSVP, { foreignKey: 'userId', as: 'rsvps' });
Event.hasMany(RSVP, { foreignKey: 'eventId', as: 'rsvps' });

module.exports = RSVP;