const { categoryDocs, categorySchema } = require('../routes/docs/category.docs');
const { productDocs, productSchema, productDefinitions } = require('../routes/docs/product.docs');
const { itemDocs, itemSchema } = require('../routes/docs/item.docs');

const swaggerOptions = {
    openapi: '3.0.0',
    info: {
        title: 'Express CRUD Product API',
        description: 'API Documentation for CRUD Product Express Project.',
        version: '1.0.0',
        contact: {
            email: 'raprmdn@gmail.com'
        }
    },
    servers: [
        {
            url: 'http://localhost:5000',
            description: 'Development server'
        },
        {
            url: 'https://production-url',
            description: 'Production server'
        }
    ],
    tags: [
        {
            name: 'Categories',
            description: 'API for categories',
            externalDocs: {
                description: 'Find out more',
                url: 'https://github.com/raprmdn/simple-product-crud-express/blob/master/src/routes/category.route.js'
            }
        },
        {
            name: 'Products',
            description: 'API for products',
            externalDocs: {
                description: 'Find out more',
                url: 'https://github.com/raprmdn/simple-product-crud-express/blob/master/src/routes/product.route.js'
            }
        },
        {
            name: 'Items',
            description: 'API for items',
            externalDocs: {
                description: 'Find out more',
                url: 'https://github.com/raprmdn/simple-product-crud-express/blob/master/src/routes/item.route.js'
            }
        }
    ],
    paths: {
        ...categoryDocs,
        ...productDocs,
        ...itemDocs
    },
    components: {
        schemas: {
            ...categorySchema,
            ...productSchema,
            ...itemSchema,
            APIResponse: {
                type: 'object',
                properties: {
                    code: {
                        type: 'integer'
                    },
                    status: {
                        type: 'string'
                    },
                    message: {
                        type: 'string'
                    }
                }
            }
        },
        definitions: {
            ...productDefinitions
        }
    }
};

module.exports = swaggerOptions;
