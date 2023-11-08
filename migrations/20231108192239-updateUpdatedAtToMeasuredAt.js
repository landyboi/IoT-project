'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.renameColumn('Measurements', 'updatedAt', 'measuredAt');
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.renameColumn('Measurements', 'measuredAt', 'updatedAt');
  }
};
