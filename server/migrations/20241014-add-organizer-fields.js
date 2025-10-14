'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'organization', {
      type: Sequelize.STRING,
      allowNull: true,
      comment: 'Organization name for organizers'
    });

    await queryInterface.addColumn('Users', 'position', {
      type: Sequelize.STRING,
      allowNull: true,
      comment: 'Position/role within organization'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'organization');
    await queryInterface.removeColumn('Users', 'position');
  }
};