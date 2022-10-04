const { Item, Product } = require('../models');
const slugify = require('slugify');
const { replacePathImage } = require('../helpers/replacePathImage.helper');
const fs = require('fs');
const { response } = require('../utils/response.utils');
const { StatusCodes: status } = require('http-status-codes');
const { removeSingleUploadedFile } = require('../helpers/removeUploadedFile.helper');

const _wrappingIconItem = (item) => {
    item.icon = { url: item.icon_url, path: item.icon };
};

const _wrappingCreateItem = (item) => {
    return {
        id: item.id,
        product_id: item.product_id,
        name: item.name,
        price: item.price,
        stock: item.stock,
        description: item.description ?? null,
        option: item.option,
        icon: { url: item.icon_url, path: item.icon },
        is_published: item.is_published,
        created_at: item.created_at
    };
};

module.exports = {
    index: async () => {
        try {
            const items = await Item.findAll({
                attributes: {
                    exclude: ['slug', 'updated_at']
                }
            });
            items.map(item => {
                return _wrappingIconItem(item);
            });

            return response(status.OK, 'OK', 'Success get all items', { items });
        } catch (e) {
            throw response(e.code || status.INTERNAL_SERVER_ERROR, e.status || 'INTERNAL_SERVER_ERROR', e.message);
        }
    },
    create: async (data, icon) => {
        try {
            const product = await Product.findByPk(data.product_id);
            if (!product) throw response(status.NOT_FOUND, 'NOT_FOUND', 'The provided product id is not found');

            data.icon = replacePathImage(icon.path);
            data.slug = slugify(data.name, { lower: true }) + '-' + Math.random().toString(36).slice(2, 7);

            const itemCreated = await Item.create(data);
            const item = _wrappingCreateItem(itemCreated);

            return response(status.CREATED, 'CREATED', 'Success create item', { item });
        } catch (e) {
            removeSingleUploadedFile(icon);
            throw response(e.code || status.INTERNAL_SERVER_ERROR, e.status || 'INTERNAL_SERVER_ERROR', e.message);
        }
    },
    show: async (id) => {
        try {
            const item = await Item.findByPk(id, {
                attributes: {
                    exclude: ['slug', 'updated_at']
                }
            });
            if (!item) throw response(status.NOT_FOUND, 'NOT_FOUND', 'Item is not found');
            _wrappingIconItem(item);

            return response(status.OK, 'OK', 'Success get item', { item });
        } catch (e) {
            throw response(e.code || status.INTERNAL_SERVER_ERROR, e.status || 'INTERNAL_SERVER_ERROR', e.message);
        }
    },
    update: async (data, id, icon) => {
        try {
            const item = await Item.findByPk(id);
            if (!item) throw response(status.NOT_FOUND, 'NOT_FOUND', 'Item is not found');

            const product = await Product.findByPk(data.product_id);
            if (!product) throw response(status.NOT_FOUND, 'NOT_FOUND', 'The provided product id is not found');

            if (item.name !== data.name) data.slug = slugify(data.name, { lower: true }) + '-' + Math.random().toString(36).slice(2, 7);

            if (icon) {
                data.icon = replacePathImage(icon.path);
                fs.unlinkSync(item.icon);
            } else {
                data.icon = item.icon;
            }

            await item.update(data);

            return response(status.OK, 'OK', 'Success update item');
        } catch (e) {
            removeSingleUploadedFile(icon);
            throw response(e.code || status.INTERNAL_SERVER_ERROR, e.status || 'INTERNAL_SERVER_ERROR', e.message);
        }
    },
    delete: async (id) => {
        try {
            const item = await Item.findByPk(id);
            if (!item) throw response(status.NOT_FOUND, 'NOT_FOUND', 'Item is not found');

            fs.unlinkSync(item.icon);
            await item.destroy();

            return response(status.OK, 'OK', 'Success delete item');
        } catch (e) {
            throw response(e.code || status.INTERNAL_SERVER_ERROR, e.status || 'INTERNAL_SERVER_ERROR', e.message);
        }
    }
};
