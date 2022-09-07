const Product = require('../models/product.model');
const Category = require('../models/category.model');
const Item = require("../models/item.model");
const CategoryService = require('./category.service');
const slugify = require('slugify');

const _isDuplicateSlug = async (slug, id = null) => {
    const product = await Product.findOne({ where: { slug } });
    return !!(product && product.id !== id);
}

const _generateSlug = async (name, id = null) => {
    let slug = slugify(name, { lower: true })
    const isDuplicateSlug = await _isDuplicateSlug(slug, id);
    if (isDuplicateSlug) slug = `${slug}-${Date.now()}`;

    return slug;
}

const _self = module.exports = {
    index: async () => {
        return await Product.findAll({
            include: [{ model: Category,  as: 'category',  attributes: ['id', 'name', 'url'] }]
        });
    },
    findById: async (id) => {
        return await Product.findByPk(id);
    },
    findBySlug: async (slug) => {
        return await Product.findOne({ where: { slug } });
    },
    create: async (data) => {
        const category = await CategoryService.findById(data.category_id);
        if (!category) throw { status: 404, message: 'The provided category id is not found' };

        data.slug = await _generateSlug(data.name);
        return await Product.create(data);
    },
    show: async (slug) => {
        return await Product.findOne({
            where: { slug },
            include: [
                { model: Category,  as: 'category',  attributes: ['id', 'name', 'url'] },
                { model: Item,  as: 'items',  attributes: ['id', 'product_id', 'name', 'slug', 'price', 'stock'] }
            ]
        });
    },
    update: async (data, slug) => {
        const product = await _self.findBySlug(slug);
        if (!product) throw { status: 404, message: 'Product not found' };

        const category = await CategoryService.findById(data.category_id);
        if (!category) throw { status: 404, message: 'The provided category id is not found' };

        data.slug = await _generateSlug(data.name, product.id);
        return await product.update(data);
    },
    delete: async (slug) => {
        const product = await _self.findBySlug(slug);
        if (!product) throw { status: 404, message: 'Product not found' };
        if (await product.countItems() > 0) throw { status: 422, message: 'Cannot delete the product. This product has items.' };

        return await product.destroy();
    }
}