const ProductService = require('../services/product.service');

module.exports = {
    index: async (req, res) => {
        try {
            const serviceResponse = await ProductService.index();
            return res.status(serviceResponse.code).json(serviceResponse);
        } catch (e) {
            return res.status(e.code).json(e);
        }
    },
    create: async (req, res) => {
        try {
            const serviceResponse = await ProductService.create(req.body, req.files);
            return res.status(serviceResponse.code).json(serviceResponse);
        } catch (e) {
            return res.status(e.code).json(e);
        }
    },
    show: async (req, res) => {
        try {
            const serviceResponse = await ProductService.show(req.params.slug);
            return res.status(serviceResponse.code).json(serviceResponse);
        } catch (e) {
            return res.status(e.code).json(e);
        }
    },
    update: async (req, res) => {
        try {
            const serviceResponse = await ProductService.update(req.body, req.params.slug, req.files);
            return res.status(serviceResponse.code).json(serviceResponse);
        } catch (e) {
            return res.status(e.code).json(e);
        }
    },
    delete: async (req, res) => {
        try {
            const serviceResponse = await ProductService.delete(req.params.slug);
            return res.status(serviceResponse.code).json(serviceResponse);
        } catch (e) {
            return res.status(e.code).json(e);
        }
    },
    addItem: async (req, res) => {
        try {
            const serviceResponse = await ProductService.addItem(req.body, req.params.slug, req.file);
            return res.status(serviceResponse.code).json(serviceResponse);
        } catch (e) {
            return res.status(e.code).json(e);
        }
    }
};
