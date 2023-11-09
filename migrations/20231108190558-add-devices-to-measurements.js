'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up (queryInterface, Sequelize) {
        const transaction = await queryInterface.sequelize.transaction();
        try {
            await queryInterface.addColumn(
                'Measurements',
                'device',
                {
                    type: Sequelize.DataTypes.INTEGER,
                    allowNull: false,
                    references: {
                        model: 'Devices',
                        key: 'id',
                    },
                    after: 'humidity',
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE'
                },
                { transaction }
            );
        } catch (err) {
            await transaction.rollback();
            throw err;
        }
    },

    async down (queryInterface, Sequelize) {
        const transaction = await queryInterface.sequelize.transaction();
        try {
            await queryInterface.removeColumn('Measurements', 'device', { transaction });
            await transaction.commit();
        } catch (err) {
            await transaction.rollback();
            throw err;
        }
    }
};
