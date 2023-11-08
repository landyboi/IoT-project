'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addColumn(
          'Measurements',
          'humidity',
          {
            type: Sequelize.float,
          },
          { transaction }
      );
      await queryInterface.addColumn(
          'Measurements',
          'airpressure',
          {
            type: Sequelize.float,
          },
          { transaction });
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
