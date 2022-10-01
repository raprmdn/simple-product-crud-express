const CategoryService = require('../services/category.service');

module.exports = {
    index: async (req, res) => {
        try {
            const serviceResponse = await CategoryService.index();
            return res.status(serviceResponse.code).json(serviceResponse);
        } catch (e) {
            return res.status(e.code).json(e);
        }
    },
    create: async (req, res) => {
        try {
            const serviceResponse = await CategoryService.create(req.body);
            return res.status(serviceResponse.code).json(serviceResponse);
        } catch (e) {
            return res.status(e.code).json(e);
        }
    },
    show: async (req, res) => {
        try {
            const serviceResponse = await CategoryService.show(req.params.url);
            return res.status(serviceResponse.code).json(serviceResponse);
        } catch (e) {
            return res.status(e.code).json(e);
        }
    },
    update: async (req, res) => {
        try {
            const serviceResponse = await CategoryService.update(req.body, req.params.url);
            return res.status(serviceResponse.code).json(serviceResponse);
        } catch (e) {
            return res.status(e.code).json(e);
        }
    },
    delete: async (req, res) => {
        try {
            const serviceResponse = await CategoryService.delete(req.params.url);
            return res.status(serviceResponse.code).json(serviceResponse);
        } catch (e) {
            return res.status(e.code).json(e);
        }
    }
};
