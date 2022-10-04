const index = {
    tags: ['Products'],
    summary: 'Get all products',
    description: 'List of all products',
    parameters: [],
    responses: {
        200: {
            description: 'Success get all products',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            code: {
                                type: 'integer',
                                example: 200
                            },
                            status: {
                                type: 'string',
                                example: 'OK'
                            },
                            message: {
                                type: 'string',
                                example: 'Success get all products'
                            },
                            data: {
                                type: 'object',
                                properties: {
                                    products: {
                                        type: 'array',
                                        items: {
                                            $ref: '#/components/definitions/ProductWithCategory'
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
};

const create = {
    tags: ['Products'],
    summary: 'Create new product',
    description: 'Create new product',
    parameters: [],
    requestBody: {
        description: 'Create a new product',
        content: {
            'multipart/form-data': {
                schema: {
                    type: 'object',
                    required: [
                        'category_id',
                        'name',
                        'price',
                        'is_published',
                        'full_image',
                        'half_image'
                    ],
                    properties: {
                        category_id: {
                            type: 'integer',
                            description: 'Category id of product'
                        },
                        name: {
                            type: 'string',
                            description: 'Name of product'
                        },
                        price: {
                            type: 'integer',
                            description: 'Price of product'
                        },
                        description: {
                            type: 'string',
                            description: 'Description of product'
                        },
                        is_featured: {
                            type: 'boolean',
                            description: 'Is featured of product'
                        },
                        is_published: {
                            type: 'boolean',
                            description: 'Is published of product'
                        },
                        full_image: {
                            type: 'file',
                            description: 'Full image of product'
                        },
                        half_image: {
                            type: 'file',
                            description: 'Half image of product'
                        }
                    }
                }
            }
        },
        required: true
    },
    responses: {
        201: {
            description: 'Success create product',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            code: {
                                type: 'integer',
                                example: 201
                            },
                            status: {
                                type: 'string',
                                example: 'CREATED'
                            },
                            message: {
                                type: 'string',
                                example: 'Success create product'
                            },
                            data: {
                                type: 'object',
                                properties: {
                                    product: {
                                        $ref: '#/components/schemas/Product'
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
};

const show = {
    tags: ['Products'],
    summary: 'Get product by slug',
    description: 'Get product by slug',
    parameters: [
        {
            name: 'slug',
            in: 'path',
            description: 'Slug of product',
            required: true
        }
    ],
    responses: {
        200: {
            description: 'Success get product',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            code: {
                                type: 'integer',
                                example: 200
                            },
                            status: {
                                type: 'string',
                                example: 'OK'
                            },
                            message: {
                                type: 'string',
                                example: 'Success get product'
                            },
                            data: {
                                type: 'object',
                                properties: {
                                    product: {
                                        $ref: '#/components/definitions/ProductWithCategoryAndItems'
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

};

const update = {
    tags: ['Products'],
    summary: 'Update product by slug',
    description: 'Update product by slug',
    parameters: [
        {
            name: 'slug',
            in: 'path',
            description: 'Slug of product',
            required: true
        }
    ],
    requestBody: {
        description: 'Update product',
        content: {
            'multipart/form-data': {
                schema: {
                    type: 'object',
                    required: [
                        'id',
                        'category_id',
                        'name',
                        'price',
                        'is_published'
                    ],
                    properties: {
                        id: {
                            type: 'integer',
                            description: 'Id of product'
                        },
                        category_id: {
                            type: 'integer',
                            description: 'Category id of product'
                        },
                        name: {
                            type: 'string',
                            description: 'Name of product'
                        },
                        price: {
                            type: 'integer',
                            description: 'Price of product'
                        },
                        description: {
                            type: 'string',
                            description: 'Description of product'
                        },
                        is_featured: {
                            type: 'boolean',
                            description: 'Is featured of product'
                        },
                        is_published: {
                            type: 'boolean',
                            description: 'Is published of product'
                        },
                        full_image: {
                            type: 'file',
                            description: 'Full image of product'
                        },
                        half_image: {
                            type: 'file',
                            description: 'Half image of product'
                        }
                    }
                }
            }
        },
        required: true
    },
    responses: {
        200: {
            description: 'Success update product',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            code: {
                                type: 'integer',
                                example: 200
                            },
                            status: {
                                type: 'string',
                                example: 'OK'
                            },
                            message: {
                                type: 'string',
                                example: 'Success update product'
                            }
                        }
                    }
                }
            }
        }
    }
};

const destroy = {
    tags: ['Products'],
    summary: 'Delete product by slug',
    description: 'Delete product by slug',
    parameters: [
        {
            name: 'slug',
            in: 'path',
            description: 'Slug of product',
            required: true
        }
    ],
    responses: {
        200: {
            description: 'Success delete product',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            code: {
                                type: 'integer',
                                example: 200
                            },
                            status: {
                                type: 'string',
                                example: 'OK'
                            },
                            message: {
                                type: 'string',
                                example: 'Success delete product'
                            }
                        }
                    }
                }
            }
        }
    }
};

const addItem = {
    tags: ['Products'],
    summary: 'Add item to product by slug',
    description: 'Add item to product by slug',
    parameters: [
        {
            name: 'slug',
            in: 'path',
            description: 'Slug of product',
            required: true
        }
    ],
    requestBody: {
        description: 'Add item to product',
        content: {
            'multipart/form-data': {
                schema: {
                    type: 'object',
                    required: [
                        'product_id',
                        'name',
                        'price',
                        'stock',
                        'is_published',
                        'icon'
                    ],
                    properties: {
                        product_id: {
                            type: 'integer',
                            description: 'Product id of item'
                        },
                        name: {
                            type: 'string',
                            description: 'Name of product'
                        },
                        price: {
                            type: 'integer',
                            description: 'Price of product'
                        },
                        stock: {
                            type: 'integer',
                            description: 'Stock of product'
                        },
                        description: {
                            type: 'string',
                            description: 'Description of product'
                        },
                        option: {
                            type: 'string',
                            description: 'Option of product'
                        },
                        is_published: {
                            type: 'boolean',
                            description: 'Is published of product'
                        },
                        icon: {
                            type: 'file',
                            description: 'Icon of product'
                        }
                    }
                }
            }
        },
        required: true
    },
    responses: {
        200: {
            description: 'Success create item',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            code: {
                                type: 'integer',
                                example: 201
                            },
                            status: {
                                type: 'string',
                                example: 'CREATED'
                            },
                            message: {
                                type: 'string',
                                example: 'Success create item'
                            }
                        }
                    }
                }
            }
        }
    }
};

const productDocs = {
    '/api/products': {
        get: index,
        post: create
    },
    '/api/products/{slug}': {
        get: show,
        patch: update,
        delete: destroy
    },
    '/api/products/{slug}/add-item': {
        post: addItem
    }
};

const productSchema = {
    Product: {
        type: 'object',
        properties: {
            id: {
                type: 'integer',
                description: 'Product ID'
            },
            category_id: {
                type: 'integer',
                description: 'Product category id'
            },
            name: {
                type: 'string',
                description: 'Product name'
            },
            slug: {
                type: 'string',
                description: 'Product slug'
            },
            price: {
                type: 'integer',
                description: 'Product price'
            },
            description: {
                type: 'string',
                description: 'Product description'
            },
            full_image: {
                type: 'object',
                properties: {
                    path: {
                        type: 'string',
                        description: 'Product full image path'
                    },
                    url: {
                        type: 'string',
                        description: 'Product full image url'
                    }
                }
            },
            half_image: {
                type: 'object',
                properties: {
                    path: {
                        type: 'string',
                        description: 'Product half image path'
                    },
                    url: {
                        type: 'string',
                        description: 'Product half image url'
                    }
                }
            },
            is_featured: {
                type: 'boolean',
                description: 'Product is featured'
            },
            is_published: {
                type: 'boolean',
                description: 'Product is published'
            },
            created_at: {
                type: 'string',
                format: 'date-time'
            },
            updated_at: {
                type: 'string',
                format: 'date-time'
            }
        }
    }
};

const productDefinitions = {
    IncludeCategory: {
        type: 'object',
        properties: {
            category: {
                type: 'object',
                properties: {
                    id: {
                        type: 'integer'
                    },
                    name: {
                        type: 'string'
                    },
                    url: {
                        type: 'string'
                    }
                }
            }
        }
    },
    ProductWithCategory: {
        allOf: [
            {
                $ref: '#/components/schemas/Product'
            },
            {
                $ref: '#/components/definitions/IncludeCategory'
            }
        ]
    },
    ProductWithCategoryAndItems: {
        allOf: [
            {
                $ref: '#/components/schemas/Product'
            },
            {
                $ref: '#/components/definitions/IncludeCategory'
            },
            {
                type: 'object',
                properties: {
                    items: {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                id: {
                                    type: 'integer'
                                },
                                product_id: {
                                    type: 'integer'
                                },
                                name: {
                                    type: 'string'
                                },
                                price: {
                                    type: 'integer'
                                },
                                stock: {
                                    type: 'integer'
                                },
                                option: {
                                    type: 'string'
                                },
                                icon: {
                                    type: 'object',
                                    properties: {
                                        path: {
                                            type: 'string'
                                        },
                                        url: {
                                            type: 'string'
                                        }
                                    }
                                },
                                created_at: {
                                    type: 'string',
                                    format: 'date-time'
                                }
                            }
                        }
                    }
                }
            }
        ]
    }
};

module.exports = {
    productDocs,
    productSchema,
    productDefinitions
};
