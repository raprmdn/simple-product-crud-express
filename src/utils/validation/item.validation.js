const Joi = require('joi');
const { responseJoiValidationErrors, responseValidationErrors } = require('../response.utils');
const { removeSingleUploadedFile } = require('../../helpers/removeUploadedFile.helper');
const { StatusCodes: status } = require('http-status-codes');

const itemSchema = {
    product_id: Joi.number().required(),
    name: Joi.string().required().max(255),
    price: Joi.number().required().min(1),
    stock: Joi.number().required().positive(),
    description: Joi.string().allow(null, ''),
    option: Joi.string().allow(null, ''),
    is_published: Joi.boolean().required(),
    icon: Joi.any()
};

module.exports = {
    // eslint-disable-next-line consistent-return
    createItemValidation: (req, res, next) => {
        const schema = Joi.object(itemSchema);

        const { error } = schema.validate(req.body, { abortEarly: false });
        if (!req.file) return res.status(status.UNPROCESSABLE_ENTITY).json(responseValidationErrors({ icon: 'The icon field is required.' }));

        if (error) {
            removeSingleUploadedFile(req.file);
            return res.status(status.UNPROCESSABLE_ENTITY).json(responseJoiValidationErrors(error));
        }

        next();
    },
    // eslint-disable-next-line consistent-return
    updateItemValidation: (req, res, next) => {
        const schema = Joi.object({
            id: Joi.number().required(),
            ...itemSchema
        });

        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            if (req.file) removeSingleUploadedFile(req.file);
            return res.status(status.UNPROCESSABLE_ENTITY).json(responseJoiValidationErrors(error));
        }

        next();
    }
};
