'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn('Users', 'interests', {
            type: Sequelize.JSON,
            allowNull: true,
            comment: 'Array of user interest categories for personalized recommendations'
        });

        await queryInterface.addColumn('Users', 'eventPreferences', {
            type: Sequelize.JSON,
            allowNull: true,
            comment: 'User preferences for event discovery (location, time, etc.)'
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn('Users', 'interests');
        await queryInterface.removeColumn('Users', 'eventPreferences');
    }
};