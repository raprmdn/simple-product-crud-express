'use strict';

module.exports = {
    async up (queryInterface, Sequelize) {
        await queryInterface.addColumn('products', 'full_image', {
            type: Sequelize.STRING,
            allowNull: true,
            after: 'description'
        });
        await queryInterface.addColumn('products', 'half_image', {
            type: Sequelize.STRING,
            allowNull: true,
            after: 'full_image'
        });
    },

    async down (queryInterface, Sequelize) {
        await queryInterface.removeColumn('products', 'full_image');
        await queryInterface.removeColumn('products', 'half_image');
    }
};
