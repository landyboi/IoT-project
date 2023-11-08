'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Devices', [
      {
        name: 'Device 1',
        country: 'FIN',
        uuid: '2a20f2fe-c601-4db7-8e8d-521bc91fe0ef',
        createdAt: '2023-11-08 12:00:00',
        updatedAt: '2023-11-08 12:00:00'
      },
      {
        name: 'Device 2',
        country: 'FRA',
        uuid: 'd2337cc6-5925-4940-a310-59ea050505f3',
        createdAt: '2023-11-07 14:00:00',
        updatedAt: '2023-11-07 14:00:00'
      },
      {
        name: 'Device 3',
        country: 'USA',
        uuid: 'a41ba37d-19bf-4c47-b348-c4f1e5233a2c',
        createdAt: '2023-10-15 13:28:00',
        updatedAt: '2023-10-15 13:28:00',
        deletedAt: '2023-11-08 12:00:00'
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Devices', null, {});
  }
};
