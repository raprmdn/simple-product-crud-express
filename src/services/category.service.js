const Category = require('../models/category.model.js');

const _self = module.exports = {
    index: async () => {
        return await Category.findAll();
    },
    findById: async (id) => {
        return await Category.findByPk(id);
    },
    findByURL: async (url) => {
        return await Category.findOne({ where: { url } });
    },
    create: async (data) => {
        return await Category.create(data);
    },
    show: async (url) => {
        return await _self.findByURL(url);
    },
    update: async (data, url) => {
        const category = await _self.findByURL(url);
        if (!category) throw { status: 404, message: 'Category not found' };

        return await category.update(data);
    },
    delete: async (url) => {
        const category = await _self.findByURL(url);
        if (!category) throw { status: 404, message: 'Category not found' };

        return category.destroy();
    }
}