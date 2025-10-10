'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        // Add Google OAuth fields to Users table
        await queryInterface.addColumn('Users', 'googleId', {
            type: Sequelize.STRING,
            allowNull: true,
            unique: true
        });

        await queryInterface.addColumn('Users', 'provider', {
            type: Sequelize.ENUM('local', 'google'),
            allowNull: false,
            defaultValue: 'local'
        });

        await queryInterface.addColumn('Users', 'profilePicture', {
            type: Sequelize.STRING,
            allowNull: true
        });

        // Make password optional for OAuth users
        await queryInterface.changeColumn('Users', 'password', {
            type: Sequelize.STRING,
            allowNull: true
        });
    },

    async down(queryInterface, Sequelize) {
        // Remove Google OAuth fields
        await queryInterface.removeColumn('Users', 'googleId');
        await queryInterface.removeColumn('Users', 'provider');
        await queryInterface.removeColumn('Users', 'profilePicture');

        // Make password required again
        await queryInterface.changeColumn('Users', 'password', {
            type: Sequelize.STRING,
            allowNull: false
        });
    }
};