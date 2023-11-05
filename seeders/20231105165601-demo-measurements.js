'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('Measurements', [
         {
           temperature: 15,
           createdAt: '2023-11-05 12:00:00',
           updatedAt: '2023-11-05 12:00:00'
         },
       {
         temperature: 25,
         createdAt: '2023-08-13 13:52:00',
         updatedAt: '2023-08-13 13:52:00'
       },
       {
         temperature: 28,
         createdAt: '2023-07-01 06:25:00',
         updatedAt: '2023-07-01 06:25:00'
       },
       {
         temperature: 42,
         createdAt: '2022-06-05 03:14:00',
         updatedAt: '2022-06-05 03:14:00'
       },
       {
         temperature: 3,
         createdAt: '2023-10-08 15:00:00',
         updatedAt: '2023-10-08 15:00:00'
       },
       {
         temperature: 12,
         createdAt: '2023-10-10 15:32:00',
         updatedAt: '2023-10-10 15:32:00',
         deletedAt: '2023-10-15 12:00:00'
       }
      ], {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Measurements', null, {});
  }
};
