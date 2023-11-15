'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addColumn(
          'Measurements',
          'dewpoint',
          {
            allowNull: true,
            type: Sequelize.DataTypes.FLOAT,
            after: 'airpressure'
          },
          { transaction }
      );
      await queryInterface.addColumn(
          'Measurements',
          'measuredAt',
          {
            allowNull: true,
            type: Sequelize.DataTypes.DATE,
            after: 'updatedAt'
          },
          { transaction });
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },

  async down (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeColumn('Measurements', 'dewpoint', { transaction });
      await queryInterface.removeColumn('Measurements', 'measuredAt', { transaction });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }
};
