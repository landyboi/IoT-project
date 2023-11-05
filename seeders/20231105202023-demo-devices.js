'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Devices', [
      {
        name: "Test 1",
        createdAt: '2020-04-13 12:00:00',
        updatedAt: '2020-04-13 12:00:00'
      },
      {
        name: "Test 2",
        createdAt: '2021-07-30 12:30:00',
        updatedAt: '2021-07-30 12:30:00'
      },
      {
        name: "Test 3",
        createdAt: '2023-02-16 05:54:00',
        updatedAt: '2023-02-16 05:54:00'
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Devices', null, {});
  }
};
