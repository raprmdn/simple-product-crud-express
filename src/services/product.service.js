const { Product, Category, Item } = require('../models');
const slugify = require('slugify');
const { replacePathImage } = require('../helpers/replacePathImage.helper');
const fs = require('fs');
const { StatusCodes: status } = require('http-status-codes');
const { response } = require('../utils/response.utils');
const { removeFieldsUploadedFile, removeSingleUploadedFile } = require('../helpers/removeUploadedFile.helper');

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

const _createProductWrapper = (product) => {
    return {
        id: product.id,
        category_id: product.category_id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        description: product.description,
        full_image: {
            path: product.full_image,
            url: product.full_image_url
        },
        half_image: {
            path: product.half_image,
            url: product.half_image_url
        },
        is_featured: product.is_featured,
        is_published: product.is_published,
        created_at: product.created_at,
        updated_at: product.updated_at
    };
};

module.exports = {
    index: async () => {
        try {
            const result = await Product.findAll({
                include: [{ model: Category, as: 'category', attributes: ['id', 'name', 'url'] }]
            });
            const products = result.map(product => {
                _wrappingProductImage(product);
                return product;
            });

            return response(status.OK, 'OK', 'Success get all products', { products });
        } catch (e) {
            throw response(e.code || status.INTERNAL_SERVER_ERROR, e.status || 'INTERNAL_SERVER_ERROR', e.message);
        }
    },
    create: async (data, image) => {
        try {
            const category = await Category.findByPk(data.category_id);
            if (!category) throw response(status.NOT_FOUND, 'NOT_FOUND', 'The provided category id is not found');

            data.full_image = replacePathImage(image.full_image[0].path);
            data.half_image = replacePathImage(image.half_image[0].path);
            data.slug = await _generateSlug(data.name);

            const result = await Product.create(data);
            const product = _createProductWrapper(result);

            return response(status.CREATED, 'CREATED', 'Success create product', { product });
        } catch (e) {
            removeFieldsUploadedFile(image);
            throw response(e.code || status.INTERNAL_SERVER_ERROR, e.status || 'INTERNAL_SERVER_ERROR', e.message);
        }
    },
    show: async (slug) => {
        try {
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
            if (!product) throw response(status.NOT_FOUND, 'NOT_FOUND', 'Product not found');

            _wrappingProductImage(product);
            product.items.map(item => {
                item.icon = { path: item.icon, url: item.icon_url };
                return item;
            });

            return response(status.OK, 'OK', 'Success get product', { product });
        } catch (e) {
            throw response(e.code || status.INTERNAL_SERVER_ERROR, e.status || 'INTERNAL_SERVER_ERROR', e.message);
        }
    },
    update: async (data, slug, image) => {
        try {
            const product = await Product.findOne({ where: { slug } });
            if (!product) throw response(status.NOT_FOUND, 'NOT_FOUND', 'Product not found');

            const category = await Category.findByPk(data.category_id);
            if (!category) throw response(status.NOT_FOUND, 'NOT_FOUND', 'The provided category id is not found');

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
            await product.update(data);

            return response(status.OK, 'OK', 'Success update product');
        } catch (e) {
            removeFieldsUploadedFile(image);
            throw response(e.code || status.INTERNAL_SERVER_ERROR, e.status || 'INTERNAL_SERVER_ERROR', e.message);
        }
    },
    delete: async (slug) => {
        try {
            const product = await Product.findOne({ where: { slug } });
            if (!product) throw response(status.NOT_FOUND, 'NOT_FOUND', 'Product not found');
            if (await product.countItems() > 0) throw response(status.BAD_REQUEST, 'BAD_REQUEST', 'Product has items');

            fs.unlinkSync(product.full_image);
            fs.unlinkSync(product.half_image);

            await product.destroy();

            return response(status.OK, 'OK', 'Success delete product');
        } catch (e) {
            throw response(e.code || status.INTERNAL_SERVER_ERROR, e.status || 'INTERNAL_SERVER_ERROR', e.message);
        }
    },
    addItem: async (data, slug, icon) => {
        try {
            const product = await Product.findOne({ where: { slug } });
            if (!product) throw response(status.NOT_FOUND, 'NOT_FOUND', 'Product not found');

            data.icon = replacePathImage(icon.path);
            data.slug = slugify(data.name, { lower: true }) + '-' + Math.random().toString(36).slice(2, 7);

            await product.createItem(data);

            return response(status.CREATED, 'CREATED', 'Success create item');
        } catch (e) {
            removeSingleUploadedFile(icon);
            throw response(e.code || status.INTERNAL_SERVER_ERROR, e.status || 'INTERNAL_SERVER_ERROR', e.message);
        }
    }
};
