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
              allowNull: true,
              type: Sequelize.DataTypes.FLOAT,
              after: 'temperature'
          },
          { transaction }
      );
      await queryInterface.addColumn(
          'Measurements',
          'airpressure',
          {
              allowNull: true,
              type: Sequelize.DataTypes.FLOAT,
              after: 'humidity'
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
          await queryInterface.removeColumn('Measurements', 'humidity', { transaction });
          await queryInterface.removeColumn('Measurements', 'airpressure', { transaction });
          await transaction.commit();
      } catch (err) {
          await transaction.rollback();
          throw err;
      }
  }
};
