const {Item} = require('../models');
const ProductService = require('./product.service');
const slugify = require("slugify");

const _self = module.exports = {
    index: async () => {
        return await Item.findAll();
    },
    create: async (data) => {
        const product = await ProductService.findById(data.product_id);
        if (!product) throw { status: 404, message: 'The provided product id is not found' };

        data.slug = slugify(data.name, { lower: true }) + '-' + Math.random().toString(36).slice(2, 7);
        return await Item.create(data);
    },
    show: async (id) => {
        return await Item.findByPk(id);
    },
    update: async (data, id) => {
        const item = await _self.show(id);
        if (!item) throw { status: 404, message: 'Item not found' };

        const product = await ProductService.findById(data.product_id);
        if (!product) throw { status: 404, message: 'The provided product id is not found' };

        if (item.name !== data.name) data.slug = slugify(data.name, { lower: true }) + '-' + Math.random().toString(36).slice(2, 7);

        return await item.update(data);
    },
    delete: async (id) => {
        const item = await _self.show(id);
        if (!item) throw { status: 404, message: 'Item not found' };

        return await item.destroy();
    }
}