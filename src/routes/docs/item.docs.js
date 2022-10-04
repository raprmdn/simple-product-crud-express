const index = {
    tags: ['Items'],
    summary: 'Get all items',
    description: 'Get all items',
    operationId: 'getAllItems',
    parameters: [],
    responses: {
        200: {
            description: 'Success get all items',
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
                                example: 'Success get all items'
                            },
                            data: {
                                type: 'object',
                                properties: {
                                    items: {
                                        type: 'array',
                                        items: {
                                            $ref: '#/components/schemas/Item'
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
    tags: ['Items'],
    summary: 'Create item',
    description: 'Create item',
    operationId: 'createItem',
    parameters: [],
    requestBody: {
        description: 'Create item',
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
                        description: {
                            type: 'string'
                        },
                        option: {
                            type: 'string'
                        },
                        is_published: {
                            type: 'boolean'
                        },
                        icon: {
                            type: 'file'
                        }
                    }
                }
            }
        },
        required: true
    },
    responses: {
        201: {
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
                            },
                            data: {
                                type: 'object',
                                properties: {
                                    product: {
                                        $ref: '#/components/schemas/Item'
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
            description: 'Success get item',
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
                                example: 'Success get item'
                            },
                            data: {
                                type: 'object',
                                properties: {
                                    item: {
                                        $ref: '#/components/schemas/Item'
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
            'multipart/form-data': {
                schema: {
                    type: 'object',
                    required: [
                        'id',
                        'product_id',
                        'name',
                        'price',
                        'stock',
                        'is_published'
                    ],
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
                        description: {
                            type: 'string'
                        },
                        option: {
                            type: 'string'
                        },
                        is_published: {
                            type: 'boolean'
                        },
                        icon: {
                            type: 'file'
                        }
                    }
                }
            }
        },
        required: true
    },
    responses: {
        200: {
            description: 'Success update item',
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
                                example: 'Success update item'
                            }
                        }
                    }
                }
            }
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
            description: 'Success update item',
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
                                example: 'Success delete item'
                            }
                        }
                    }
                }
            }
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
                description: 'Item ID'
            },
            product_id: {
                type: 'integer',
                description: 'Product ID'
            },
            name: {
                type: 'string',
                description: 'Item name'
            },
            price: {
                type: 'integer',
                description: 'Item price'
            },
            stock: {
                type: 'integer',
                description: 'Item stock'
            },
            description: {
                type: 'string',
                description: 'Item description'
            },
            option: {
                type: 'string',
                description: 'Item option'
            },
            icon: {
                type: 'object',
                properties: {
                    url: {
                        type: 'string',
                        description: 'Item icon url'
                    },
                    path: {
                        type: 'string',
                        description: 'Item icon path'
                    }
                }
            },
            is_published: {
                type: 'boolean',
                description: 'Item is published'
            },
            created_at: {
                type: 'string',
                format: 'date-time'
            }
        }
    }
};

module.exports = {
    itemDocs,
    itemSchema
};
