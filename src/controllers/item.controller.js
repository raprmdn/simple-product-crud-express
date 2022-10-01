const ItemService = require('../services/item.service');

module.exports = {
    index: async (req, res) => {
        try {
            const serviceResponse = await ItemService.index();
            return res.status(serviceResponse.code).json(serviceResponse);
        } catch (e) {
            return res.status(e.code).json(e);
        }
    },
    create: async (req, res) => {
        try {
            const serviceResponse = await ItemService.create(req.body, req.file);
            return res.status(serviceResponse.code).json(serviceResponse);
        } catch (e) {
            return res.status(e.code).json(e);
        }
    },
    show: async (req, res) => {
        try {
            const serviceResponse = await ItemService.show(req.params.id);
            return res.status(serviceResponse.code).json(serviceResponse);
        } catch (e) {
            return res.status(e.code).json(e);
        }
    },
    update: async (req, res) => {
        try {
            const serviceResponse = await ItemService.update(req.body, req.params.id, req.file);
            return res.status(serviceResponse.code).json(serviceResponse);
        } catch (e) {
            return res.status(e.code).json(e);
        }
    },
    delete: async (req, res) => {
        try {
            const serviceResponse = await ItemService.delete(req.params.id);
            return res.status(serviceResponse.code).json(serviceResponse);
        } catch (e) {
            return res.status(e.code).json(e);
        }
    }
};
