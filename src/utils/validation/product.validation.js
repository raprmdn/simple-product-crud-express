const Joi = require('joi');
const { responseValidationError, response } = require('../response.utils');
const { removeFieldsUploadedFile } = require('../../helpers/removeUploadedFile.helper');

const productSchema = {
    category_id: Joi.number().required(),
    name: Joi.string().required().max(255),
    price: Joi.number().required().min(1),
    description: Joi.string().allow(null, ''),
    is_featured: Joi.boolean().allow(null, false),
    is_published: Joi.boolean().required(),
    full_image: Joi.any(),
    half_image: Joi.any()
};

module.exports = {
    // eslint-disable-next-line consistent-return
    createProductValidation: (req, res, next) => {
        const schema = Joi.object(productSchema);

        if (!req.files.full_image || !req.files.half_image) {
            removeFieldsUploadedFile(req.files);
            return response(res, 422, false, 'Full image and half image is required');
        }

        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            removeFieldsUploadedFile(req.files);
            return responseValidationError(res, error);
        }

        next();
    },
    // eslint-disable-next-line consistent-return
    updateProductValidation: (req, res, next) => {
        const schema = Joi.object({
            id: Joi.number().required(),
            ...productSchema
        });

        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            if (req.files) removeFieldsUploadedFile(req.files);
            return responseValidationError(res, error);
        }

        next();
    }
};
