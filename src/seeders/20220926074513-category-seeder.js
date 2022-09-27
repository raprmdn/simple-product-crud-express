'use strict';

module.exports = {
    async up (queryInterface, Sequelize) {
        await queryInterface.bulkInsert('categories', [
            {
                name: 'Featured',
                url: 'featured',
                description: 'Featured category products',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                name: 'Consumables',
                url: 'consume',
                description: 'Consumables category products',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                name: 'Equipment',
                url: 'equip',
                description: 'Equipment category products',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                name: 'Costumes',
                url: 'costume',
                description: 'Costumes category products',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                name: 'Accessories',
                url: 'accessories',
                description: 'Accessories category products',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                name: 'Back Gear',
                url: 'back',
                description: 'Back Gear category products',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                name: 'Pets',
                url: 'pet',
                description: 'Pets category products',
                created_at: new Date(),
                updated_at: new Date()
            }
        ]);
    },

    async down (queryInterface, Sequelize) {
        await queryInterface.bulkDelete('categories', null, {});
    }
};
