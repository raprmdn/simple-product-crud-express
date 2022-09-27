const Joi = require('joi');
const { Category } = require('../../models');
const { responseValidationError } = require('../response.utils');

const uniqueURL = async (value, id = null) => {
    const category = await Category.findOne({ where: { url: value } });
    if (category && category.id !== id) {
        throw new Joi.ValidationError(
            'URL already exists',
            [
                {
                    message: 'URL already exists',
                    path: ['url'],
                    type: 'string.url',
                    context: {
                        key: 'url',
                        label: 'url',
                        value
                    }
                }
            ],
            value
        );
    }

    return true;
};

module.exports = {
    // eslint-disable-next-line consistent-return
    categoryValidation: async (req, res, next) => {
        const schema = Joi.object({
            id: req.method === 'POST' ? Joi.forbidden() : Joi.number().required(),
            name: Joi.string().required(),
            url: Joi.string().required().lowercase().strict()
                .regex(/^[a-zA-Z0-9-_]+$/)
                .external(async (value) => await uniqueURL(value, req.body.id))
                .messages({
                    'string.pattern.base': 'URL only allow alphanumeric, dash, and underscore'
                }),
            description: Joi.string().allow(null, '')
        });

        try {
            await schema.validateAsync(req.body, { abortEarly: false });
            next();
        } catch (err) {
            return responseValidationError(res, err);
        }
    }
};
