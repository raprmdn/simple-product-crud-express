const { Category } = require('../models');
const { response } = require('../utils/response.utils');
const { StatusCodes: status } = require('http-status-codes');

module.exports = {
    index: async () => {
        try {
            const categories = await Category.findAll();
            return response(status.OK, 'OK', 'Success get categories', { categories });
        } catch (e) {
            return response(e.code || status.INTERNAL_SERVER_ERROR, e.status || 'INTERNAL_SERVER_ERROR', e.message);
        }
    },
    create: async (data) => {
        try {
            const category = await Category.create(data);
            return response(status.CREATED, 'CREATED', 'Success create category', { category });
        } catch (e) {
            return response(e.code || status.INTERNAL_SERVER_ERROR, e.status || 'INTERNAL_SERVER_ERROR', e.message);
        }
    },
    show: async (url) => {
        try {
            const category = await Category.findOne({ where: { url } });
            if (!category) throw response(status.NOT_FOUND, 'NOT_FOUND', 'Category not found');

            return response(status.OK, 'OK', 'Success get category', { category });
        } catch (e) {
            return response(e.code || status.INTERNAL_SERVER_ERROR, e.status || 'INTERNAL_SERVER_ERROR', e.message);
        }
    },
    update: async (data, url) => {
        try {
            const category = await Category.findOne({ where: { url } });
            if (!category) throw response(status.NOT_FOUND, 'NOT_FOUND', 'Category not found');

            await category.update(data);

            return response(status.OK, 'OK', 'Success update category');
        } catch (e) {
            return response(e.code || status.INTERNAL_SERVER_ERROR, e.status || 'INTERNAL_SERVER_ERROR', e.message);
        }
    },
    delete: async (url) => {
        try {
            const category = await Category.findOne({ where: { url } });
            if (!category) throw response(status.NOT_FOUND, 'NOT_FOUND', 'Category not found');
            if (await category.countProducts() > 0) throw response(status.BAD_REQUEST, 'BAD_REQUEST', 'Category has products');

            await category.destroy();

            return response(status.OK, 'OK', 'Success delete category');
        } catch (e) {
            return response(e.code || status.INTERNAL_SERVER_ERROR, e.status || 'INTERNAL_SERVER_ERROR', e.message);
        }
    }
};
