const Category = require('../models/category.model.js');

module.exports = {
    index: async () => {
        return await Category.findAll();
    },
    findById: async (id) => {
        return await Category.findByPk(id);
    },
    create: async (data) => {
        return await Category.create(data);
    },
    show: async (url) => {
        return await Category.findOne({ where: { url }});
    },
    update: async (data) => {
        return await Category.update(data, { where: { id: data.id }})
    },
    delete: async (url) => {
        const category = await Category.findOne({where: {url}});
        if (!category) return false;

        return category.destroy();
    }
}