const ItemService = require('../services/item.service');
const { response } = require("../utils/response.utils");

module.exports = {
    index: async (req, res) => {
        try {
            const items = await ItemService.index();
            return response(res, 200, true, 'Success get items', items);
        } catch (err) {
            console.log(err.message);
            return response(res, 500, false, err.message);
        }
    },
    create: async (req, res) => {
        try {
            const item = await ItemService.create(req.body);
            return response(res, 201, true, 'Success create item', item);
        } catch (err) {
            console.log(err.message);
            return response(res, err?.status || 500, false, err.message);
        }
    },
    show: async (req, res) => {
        try {
            const item = await ItemService.show(req.params.id);
            return response(res, 200, true, 'Success get item', item);
        } catch (err) {
            console.log(err.message);
            return response(res, err?.status || 500, false, err.message);
        }
    },
    update: async (req, res) => {
        try {
            await ItemService.update(req.body, req.params.id);
            return response(res, 200, true, 'Success update item');
        } catch (err) {
            console.log(err.message);
            return response(res, err?.status || 500, false, err.message);
        }
    },
    delete: async (req, res) => {
        try {
            await ItemService.delete(req.params.id);
            return response(res, 200, true, 'Success delete item');
        } catch (err) {
            console.log(err.message);
            return response(res, err?.status || 500, false, err.message);
        }
    }
}