'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('Measurements', [
         {
           temperature: 25,
           humidity: 60,
           airpressure: 1015,
           device: 1,
           createdAt: '2023-11-05 12:00:00',
           updatedAt: '2023-11-05 12:00:00'
         },
       {
         temperature: 15,
         humidity: 75,
         airpressure: 1020,
         device: 2,
         createdAt: '2023-08-13 13:52:00',
         updatedAt: '2023-08-13 13:52:00',
         measuredAt: '2023-08-13 12:00:00'
       },
       {
         temperature: 30,
         humidity: 50,
         airpressure: 1012,
         device: 1,
         createdAt: '2023-07-01 06:25:00',
         updatedAt: '2023-07-01 06:25:00',
         measuredAt: '2023-06-28 07:00:00'
       },
       {
         temperature: 20,
         humidity: 70,
         airpressure: 1018,
         device: 2,
         createdAt: '2022-06-05 03:14:00',
         updatedAt: '2022-06-05 03:14:00'
       },
       {
         temperature: 18,
         humidity: 65,
         airpressure: 1016,
         device: 1,
         createdAt: '2023-10-08 15:00:00',
         updatedAt: '2023-10-08 15:00:00'
       },
       {
         temperature: 28,
         humidity: 55,
         airpressure: 1010,
         device: 3,
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
