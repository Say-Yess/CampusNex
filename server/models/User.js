const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const bcrypt = require('bcrypt');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true // Allow null for Google OAuth users
    },
    googleId: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    provider: {
        type: DataTypes.ENUM('local', 'google'),
        defaultValue: 'local'
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
    bio: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    major: {
        type: DataTypes.STRING,
        allowNull: true
    },
    yearOfStudy: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    interests: {
        type: DataTypes.JSON,
        allowNull: true,
        comment: 'Array of user interest categories for personalized recommendations'
    },
    eventPreferences: {
        type: DataTypes.JSON,
        allowNull: true,
        comment: 'User preferences for event discovery (location, time, etc.)'
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    hooks: {
        beforeCreate: async (user) => {
            if (user.password && user.provider === 'local') {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password, salt);
            }
        },
        beforeUpdate: async (user) => {
            if (user.changed('password')) {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password, salt);
            }
        }
    }
});

// Instance method to check password
User.prototype.checkPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = User;