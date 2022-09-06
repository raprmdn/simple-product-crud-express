const Joi = require('joi');
const {responseValidationError} = require("../response.utils");

module.exports = {
    productValidation: (req, res, next) => {
        const schema = Joi.object({
            id: req.method === 'POST' ? Joi.forbidden() : Joi.number().required(),
            category_id: Joi.number().required(),
            name: Joi.string().required().max(255),
            price: Joi.number().required().min(1),
            description: Joi.string().allow(null, ''),
            is_featured: Joi.boolean().allow(null, false),
            is_published: Joi.boolean().required(),
        });

        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) return responseValidationError(res, error);

        next();
    }
}