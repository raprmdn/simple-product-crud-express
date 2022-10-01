'use strict';

module.exports = {
    async up (queryInterface, Sequelize) {
        await queryInterface.addColumn('Items', 'option', {
            type: Sequelize.TEXT,
            allowNull: true,
            after: 'description'
        });
        await queryInterface.addColumn('items', 'icon', {
            type: Sequelize.STRING,
            allowNull: true,
            after: 'option'
        });
    },

    async down (queryInterface, Sequelize) {
        await queryInterface.removeColumn('Items', 'option');
        await queryInterface.removeColumn('Items', 'icon');
    }
};
