const { Product, Category, Item } = require('../models');
const CategoryService = require('./category.service');
const slugify = require('slugify');
const { replacePathImage } = require('../helpers/replacePathImage.helper');
const fs = require('fs');

const _isDuplicateSlug = async (slug, id = null) => {
    const product = await Product.findOne({ where: { slug } });
    return !!(product && product.id !== id);
};

const _generateSlug = async (name, id = null) => {
    let slug = slugify(name, { lower: true });
    const isDuplicateSlug = await _isDuplicateSlug(slug, id);
    if (isDuplicateSlug) slug = `${slug}-${Date.now()}`;

    return slug;
};

const _wrappingProductImage = (product) => {
    product.full_image = { path: product.full_image, url: product.full_image_url };
    product.half_image = { path: product.half_image, url: product.half_image_url };
};

const _self = module.exports = {
    index: async () => {
        const products = await Product.findAll({
            include: [{ model: Category, as: 'category', attributes: ['id', 'name', 'url'] }]
        });

        return products.map(product => {
            _wrappingProductImage(product);
            return product;
        });
    },
    findById: async (id) => {
        return await Product.findByPk(id);
    },
    findBySlug: async (slug) => {
        return await Product.findOne({ where: { slug } });
    },
    create: async (data, image) => {
        const category = await CategoryService.findById(data.category_id);
        if (!category) throw { status: 404, message: 'The provided category id is not found' };

        data.full_image = replacePathImage(image.full_image[0].path);
        data.half_image = replacePathImage(image.half_image[0].path);
        data.slug = await _generateSlug(data.name);

        return await Product.create(data);
    },
    show: async (slug) => {
        const product = await Product.findOne({
            where: { slug },
            include: [
                { model: Category, as: 'category', attributes: ['id', 'name', 'url'] },
                {
                    model: Item,
                    as: 'items',
                    attributes: [
                        'id', 'product_id', 'name', 'price', 'stock', 'option', 'icon', 'created_at'
                    ]
                }
            ],
            order: [[{ model: Item, as: 'items' }, 'created_at', 'ASC']]
        });
        if (!product) throw { status: 404, message: 'Product not found' };

        _wrappingProductImage(product);
        product.items.map(item => {
            item.icon = { path: item.icon, url: item.icon_url };
            return item;
        });

        return product;
    },
    update: async (data, slug, image) => {
        const product = await _self.findBySlug(slug);
        if (!product) throw { status: 404, message: 'Product not found' };

        const category = await CategoryService.findById(data.category_id);
        if (!category) throw { status: 404, message: 'The provided category id is not found' };

        if (image.full_image) {
            fs.unlinkSync(product.full_image);
            data.full_image = replacePathImage(image.full_image[0].path);
            data.half_image = product.half_image;
        } else if (image.half_image) {
            fs.unlinkSync(product.half_image);
            data.full_image = product.full_image;
            data.half_image = replacePathImage(image.half_image[0].path);
        } else {
            data.full_image = product.full_image;
            data.half_image = product.half_image;
        }

        data.slug = await _generateSlug(data.name, product.id);

        return await product.update(data);
    },
    delete: async (slug) => {
        const product = await _self.findBySlug(slug);
        if (!product) throw { status: 404, message: 'Product not found' };
        if (await product.countItems() > 0) throw { status: 422, message: 'Cannot delete the product. This product has items.' };

        fs.unlinkSync(product.full_image);
        fs.unlinkSync(product.half_image);

        return await product.destroy();
    },
    addItem: async (data, slug, icon) => {
        const product = await _self.findBySlug(slug);
        if (!product) throw { status: 404, message: 'Product not found' };

        data.icon = replacePathImage(icon.path);
        data.slug = slugify(data.name, { lower: true }) + '-' + Math.random().toString(36).slice(2, 7);

        return await product.createItem(data);
    }
};
