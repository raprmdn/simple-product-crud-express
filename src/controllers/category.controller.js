const CategoryService = require('../services/category.service');
const { response, responseValidationError } = require('../utils/response.utils');
const { categoryValidation } = require('../utils/validation/category.validation');

module.exports = {
    index: async (req, res) => {
        try {
            const categories = await CategoryService.index();
            return response(res, 200, true, 'Success get categories', categories);
        } catch (err) {
            console.log(err.message);
            return response(res, 500, false, err.message);
        }
    },
    create: async (req, res) => {
        try {
            await categoryValidation(req.body);
        } catch (errors) {
            return responseValidationError(res, errors);
        }

        try {
            const category = await CategoryService.create(req.body);
            return response(res, 201, true, 'Success create category', category);
        } catch (err) {
            console.log(err.message);
            return response(res, 500,false, err.message);
        }
    },
    show: async (req, res) => {
        try {
            const category = await CategoryService.show(req.params.url);
            if (!category) return response(res, 404, false, 'Category not found');

            return response(res, 200, true, 'Success get category', category);
        } catch (err) {
            console.log(err.message);
            return response(res, 500, false, err.message);
        }
    },
    update: async (req, res) => {
        try {
            await categoryValidation(req.body, 'patch');
        } catch (errors) {
            return responseValidationError(res, errors);
        }

        try {
            await CategoryService.update(req.body);
            return response(res, 200, true, 'Success update category');
        } catch (err) {
            console.log(err.message);
            return response(res, 500, false, err.message);
        }
    },
    delete: async (req, res) => {
        try {
            const result = await CategoryService.delete(req.params.url);
            if (!result) return response(res, 404, false, 'Category not found');

            return response(res, 200, true, 'Success delete category');
        } catch (err) {
            console.log(err.message);
            return response(res, 500, false, err.message);
        }
    }
}