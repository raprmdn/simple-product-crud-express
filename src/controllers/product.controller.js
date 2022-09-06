const ProductService = require('../services/product.service');
const {response} = require("../utils/response.utils");

module.exports = {
    index: async (req, res) => {
        try {
            const products = await ProductService.index();
            response(res, 200, true, 'Success get all products', products);
        } catch (err) {
            console.log(err.message);
            return response(res, 500, false, err.message);
        }
    },
    create: async (req, res) => {
        try {
            const product = await ProductService.create(req.body);
            response(res, 201, true, 'Success create product', product);
        } catch (err) {
            console.log(err.message);
            return response(res, err?.status || 500, false, err.message);
        }
    },
    show: async (req, res) => {
        try {
            const product = await ProductService.show(req.params.slug);
            if (!product) return response(res, 404, false, 'Product not found');

            response(res, 200, true, 'Success get product', product);
        } catch (err) {
            console.log(err.message);
            return response(res, 500, false, err.message);
        }
    },
    update: async (req, res) => {
        try {
            await ProductService.update(req.body, req.params.slug);
            return response(res, 200, true, 'Success update product');
        } catch (err) {
            console.log(err.message);
            return response(res, err?.status || 500, false, err.message);
        }
    },
    delete: async (req, res) => {
        try {
            await ProductService.delete(req.params.slug);
            return response(res, 200, true, 'Success delete product');
        } catch (err) {
            console.log(err.message);
            return response(res, err?.status || 500, false, err.message);
        }
    }
}