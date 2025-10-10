'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('Users', 'googleId', {
            type: Sequelize.STRING,
            allowNull: true,
            unique: true
        });

        await queryInterface.addColumn('Users', 'provider', {
            type: Sequelize.ENUM('local', 'google'),
            defaultValue: 'local',
            allowNull: false
        });

        // Make password nullable for Google OAuth users
        await queryInterface.changeColumn('Users', 'password', {
            type: Sequelize.STRING,
            allowNull: true
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn('Users', 'googleId');
        await queryInterface.removeColumn('Users', 'provider');

        // Revert password to not null
        await queryInterface.changeColumn('Users', 'password', {
            type: Sequelize.STRING,
            allowNull: false
        });
    }
};