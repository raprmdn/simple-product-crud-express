const Joi = require('joi');
const { responseJoiValidationErrors, responseValidationErrors } = require('../response.utils');
const { removeFieldsUploadedFile } = require('../../helpers/removeUploadedFile.helper');
const { StatusCodes: status } = require('http-status-codes');

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
            const errors = {};
            if (!req.files.full_image) errors.full_image = 'Full image is required';
            if (!req.files.half_image) errors.half_image = 'Half image is required';
            removeFieldsUploadedFile(req.files);
            return res.status(status.UNPROCESSABLE_ENTITY).json(
                responseValidationErrors(errors)
            );
        }

        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            removeFieldsUploadedFile(req.files);
            return res.status(status.UNPROCESSABLE_ENTITY).json(responseJoiValidationErrors(error));
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
            return res.status(status.UNPROCESSABLE_ENTITY).json(responseJoiValidationErrors(error));
        }

        next();
    }
};
