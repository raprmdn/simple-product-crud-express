const { Item } = require('../models');
const ProductService = require('./product.service');
const slugify = require('slugify');
const { replacePathImage } = require('../helpers/replacePathImage.helper');
const fs = require('fs');

const _wrappingIconItem = (item) => {
    item.icon = { url: item.icon_url, path: item.icon };
};

module.exports = {
    index: async () => {
        const items = await Item.findAll({
            attributes: {
                exclude: ['slug', 'updated_at']
            }
        });
        items.map(item => {
            return _wrappingIconItem(item);
        });

        return items;
    },
    create: async (data, icon) => {
        const product = await ProductService.findById(data.product_id);
        if (!product) throw { status: 404, message: 'The provided product id is not found' };

        data.icon = replacePathImage(icon.path);
        data.slug = slugify(data.name, { lower: true }) + '-' + Math.random().toString(36).slice(2, 7);

        return await Item.create(data);
    },
    show: async (id) => {
        const item = await Item.findByPk(id, {
            attributes: {
                exclude: ['slug', 'updated_at']
            }
        });
        if (!item) throw { status: 404, message: 'Item not found' };
        _wrappingIconItem(item);

        return item;
    },
    update: async (data, id, icon) => {
        const item = await Item.findByPk(id);
        if (!item) throw { status: 404, message: 'Item not found' };

        const product = await ProductService.findById(data.product_id);
        if (!product) throw { status: 404, message: 'The provided product id is not found' };

        if (item.name !== data.name) data.slug = slugify(data.name, { lower: true }) + '-' + Math.random().toString(36).slice(2, 7);

        if (icon) {
            data.icon = replacePathImage(icon.path);
            fs.unlinkSync(item.icon);
        } else {
            data.icon = item.icon;
        }

        return await item.update(data);
    },
    delete: async (id) => {
        const item = await Item.findByPk(id);
        if (!item) throw { status: 404, message: 'Item not found' };

        fs.unlinkSync(item.icon);

        return await item.destroy();
    }
};
