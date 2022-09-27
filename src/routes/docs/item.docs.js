const index = {
    tags: ['Items'],
    summary: 'Get all items',
    description: 'Get all items',
    operationId: 'getAllItems',
    parameters: [],
    responses: {
        200: {
            description: 'Success get items',
            content: {
                'application/json': {
                    schema: {
                        type: 'array',
                        items: {
                            $ref: '#/components/schemas/Item'
                        }
                    }
                }
            }
        }
    }
};

const create = {
    tags: ['Items'],
    summary: 'Create item',
    description: 'Create item',
    operationId: 'createItem',
    parameters: [],
    requestBody: {
        description: 'Create item',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        product_id: {
                            type: 'integer',
                            description: 'Product ID',
                            required: true
                        },
                        name: {
                            type: 'string',
                            description: 'Item name',
                            required: true
                        },
                        price: {
                            type: 'integer',
                            description: 'Item price',
                            required: true
                        },
                        stock: {
                            type: 'integer',
                            description: 'Item stock',
                            required: true
                        },
                        description: {
                            type: 'string',
                            description: 'Item description'
                        },
                        is_published: {
                            type: 'boolean',
                            description: 'Item is published',
                            required: true
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
                        $ref: '#/components/schemas/Item'
                    }
                }
            }
        },
        404: {
            description: 'Product not found'
        },
        422: {
            description: 'Unprocessable Entity'
        }
    }
};

const show = {
    tags: ['Items'],
    summary: 'Get item by ID',
    description: 'Get item by ID',
    operationId: 'getItemById',
    parameters: [
        {
            name: 'id',
            in: 'path',
            description: 'Item ID',
            required: true
        }
    ],
    responses: {
        200: {
            description: 'Success get item'
        },
        404: {
            description: 'Item not found'
        }
    }
};

const update = {
    tags: ['Items'],
    summary: 'Update item by ID',
    description: 'Update item by ID',
    operationId: 'updateItemById',
    parameters: [
        {
            name: 'id',
            in: 'path',
            description: 'Item ID',
            required: true
        }
    ],
    requestBody: {
        description: 'Update item',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            description: 'Item ID',
                            required: true
                        },
                        product_id: {
                            type: 'integer',
                            description: 'Product ID',
                            required: true
                        },
                        name: {
                            type: 'string',
                            description: 'Item name',
                            required: true
                        },
                        price: {
                            type: 'integer',
                            description: 'Item price',
                            required: true
                        },
                        stock: {
                            type: 'integer',
                            description: 'Item stock',
                            required: true
                        },
                        description: {
                            type: 'string',
                            description: 'Item description'
                        },
                        is_published: {
                            type: 'boolean',
                            description: 'Item is published',
                            required: true
                        }
                    }
                }
            }
        },
        required: true
    },
    responses: {
        200: {
            description: 'Success update item'
        },
        404: {
            description: 'Item or Product not found'
        },
        422: {
            description: 'Unprocessable Entity'
        }
    }
};

const destroy = {
    tags: ['Items'],
    summary: 'Delete item by ID',
    description: 'Delete item by ID',
    operationId: 'deleteItemById',
    parameters: [
        {
            name: 'id',
            in: 'path',
            description: 'Item ID',
            required: true
        }
    ],
    responses: {
        200: {
            description: 'Success delete item'
        },
        404: {
            description: 'Item not found'
        }
    }
};

const itemDocs = {
    '/api/items': {
        get: index,
        post: create
    },
    '/api/items/{id}': {
        get: show,
        patch: update,
        delete: destroy
    }
};

const itemSchema = {
    Item: {
        type: 'object',
        properties: {
            id: {
                type: 'integer',
                description: 'Item ID',
                example: 1
            },
            product_id: {
                type: 'integer',
                description: 'Product ID',
                example: 2
            },
            name: {
                type: 'string',
                description: 'Item name',
                example: 'First Item'
            },
            slug: {
                type: 'string',
                description: 'Item slug',
                example: 'first-item'
            },
            price: {
                type: 'integer',
                description: 'Item price',
                example: 30
            },
            stock: {
                type: 'integer',
                description: 'Item stock',
                example: 1000
            },
            description: {
                type: 'string',
                description: 'Item description',
                example: 'Item Description'
            },
            is_published: {
                type: 'boolean',
                description: 'Item is published',
                example: true
            },
            createdAt: {
                type: 'string',
                format: 'date-time',
                description: 'Item created at'
            },
            updatedAt: {
                type: 'string',
                format: 'date-time',
                description: 'Item updated at'
            }
        }
    }
};

module.exports = {
    itemDocs,
    itemSchema
};
