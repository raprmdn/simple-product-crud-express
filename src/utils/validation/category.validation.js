const Joi = require('joi');
const Category = require("../../models/category.model");

const uniqueURL = async (value, id = null) => {
    const category = await Category.findOne({ where: { url: value }});
    if (category && category.id !== id) {
        throw new Joi.ValidationError(
            "URL already exists",
            [
                {
                    message: "URL already exists",
                    path: ["url"],
                    type: "string.url",
                    context: {
                        key: "url",
                        label: "url",
                        value,
                    },
                },
            ],
            value
        );
    }

    return true;
}

module.exports = {
    categoryValidation: (data, method = 'post') => {
        const schema = Joi.object({
            id: method === 'post' ? Joi.forbidden() : Joi.number().required(),
            name: Joi.string().required(),
            url: Joi.string().required().lowercase().strict()
                .regex(/^[a-zA-Z0-9-_]+$/)
                .external(async (value) => {
                    return await uniqueURL(value, data.id);
                })
                .messages({
                    'string.pattern.base': 'URL only allow alphanumeric, dash, and underscore',
                }),
            description: Joi.string().allow(null, ''),
        });

        return schema.validateAsync(data, { abortEarly: false });
    }
}