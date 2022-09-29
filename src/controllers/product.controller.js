const ProductService = require('../services/product.service');
const { response } = require('../utils/response.utils');
const { removeFieldsUploadedFile } = require('../helpers/removeUploadedFile.helper');

module.exports = {
    index: async (req, res) => {
        try {
            const products = await ProductService.index();
            return response(res, 200, true, 'Success get all products', products);
        } catch (err) {
            return response(res, 500, false, err.message);
        }
    },
    create: async (req, res) => {
        try {
            const product = await ProductService.create(req.body, req.files);
            return response(res, 201, true, 'Success create product', product);
        } catch (err) {
            removeFieldsUploadedFile(req.files);
            return response(res, err?.status || 500, false, err.message);
        }
    },
    show: async (req, res) => {
        try {
            const product = await ProductService.show(req.params.slug);
            return response(res, 200, true, 'Success get product', product);
        } catch (err) {
            return response(res, err?.status || 500, false, err.message);
        }
    },
    update: async (req, res) => {
        try {
            await ProductService.update(req.body, req.params.slug, req.files);
            return response(res, 200, true, 'Success update product');
        } catch (err) {
            removeFieldsUploadedFile(req.files);
            return response(res, err?.status || 500, false, err.message);
        }
    },
    delete: async (req, res) => {
        try {
            await ProductService.delete(req.params.slug);
            return response(res, 200, true, 'Success delete product');
        } catch (err) {
            return response(res, err?.status || 500, false, err.message);
        }
    },
    addItem: async (req, res) => {
        try {
            await ProductService.addItem(req.body, req.params.slug);
            return response(res, 200, true, 'Success add product item');
        } catch (err) {
            return response(res, err?.status || 500, false, err.message);
        }
    }
};
