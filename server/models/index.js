const User = require('./User');
const Event = require('./Event');
const RSVP = require('./RSVP');
const UserStats = require('./UserStats');
const Activity = require('./Activity');

// Define associations
User.hasOne(UserStats, { foreignKey: 'userId', as: 'stats' });
UserStats.belongsTo(User, { foreignKey: 'userId', as: 'user' });

User.hasMany(Activity, { foreignKey: 'userId', as: 'activities' });
Activity.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Event.hasMany(Activity, { foreignKey: 'eventId', as: 'activities' });
Activity.belongsTo(Event, { foreignKey: 'eventId', as: 'event' });

// Export all models
module.exports = {
    User,
    Event,
    RSVP,
    UserStats,
    Activity
};