const index = {
    tags: ['Categories'],
    summary: 'Get all categories',
    description: 'List of all categories',
    parameters: [],
    responses: {
        200: {
            description: 'Success get categories',
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
                                example: 'Success get categories'
                            },
                            data: {
                                type: 'object',
                                properties: {
                                    categories: {
                                        type: 'array',
                                        items: {
                                            $ref: '#/components/schemas/Category'
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
    tags: ['Categories'],
    summary: 'Create new category',
    description: 'Create new category',
    parameters: [],
    requestBody: {
        description: 'Create a new category',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        name: {
                            type: 'string',
                            description: 'Name of category',
                            example: ''
                        },
                        url: {
                            type: 'string',
                            description: 'Url of category',
                            example: '',
                            unique: true
                        },
                        description: {
                            type: 'string',
                            description: 'Description of category',
                            example: ''
                        }
                    },
                    required: ['name', 'url']
                }
            }
        },
        required: true
    },
    responses: {
        201: {
            description: 'Success create category',
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
                                example: 'Success create category'
                            },
                            data: {
                                type: 'object',
                                properties: {
                                    categories: {
                                        type: 'array',
                                        items: {
                                            $ref: '#/components/schemas/Category'
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        422: {
            description: 'Unprocessable Entity. The given data was invalid.',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            code: {
                                type: 'integer',
                                example: 422
                            },
                            status: {
                                type: 'string',
                                example: 'UNPROCESSABLE_ENTITY'
                            },
                            message: {
                                type: 'string',
                                example: 'The given data was invalid.'
                            },
                            errors: {
                                type: 'object'
                            }
                        }
                    }
                }
            }
        }
    }
};

const show = {
    tags: ['Categories'],
    summary: 'Get category by slug',
    description: 'Get category by slug',
    parameters: [
        {
            name: 'slug',
            in: 'path',
            description: 'Slug of category',
            required: true,
            type: 'string',
            example: 'equip'
        }
    ],
    responses: {
        200: {
            description: 'Success get category',
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
                                example: 'Success get category'
                            },
                            data: {
                                type: 'object',
                                properties: {
                                    category: {
                                        $ref: '#/components/schemas/Category'
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
    tags: ['Categories'],
    summary: 'Update category by slug',
    description: 'Update category by slug',
    parameters: [
        {
            name: 'slug',
            in: 'path',
            description: 'Slug of category',
            required: true,
            type: 'string',
            example: 'test'
        }
    ],
    requestBody: {
        description: 'Update category',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            required: true
                        },
                        name: {
                            type: 'string',
                            required: true
                        },
                        url: {
                            type: 'string',
                            required: true
                        },
                        description: {
                            type: 'string'
                        }
                    }
                }
            }
        }
    },
    responses: {
        200: {
            description: 'Success create category',
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
                                example: 'Success update category'
                            }
                        }
                    }
                }
            }
        }
    }
};

const destroy = {
    tags: ['Categories'],
    summary: 'Delete category by slug',
    description: 'Delete category by slug',
    parameters: [
        {
            name: 'slug',
            in: 'path',
            description: 'Slug of category',
            required: true,
            type: 'string'
        }
    ],
    responses: {
        200: {
            description: 'Success create category',
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
                                example: 'Success delete category'
                            }
                        }
                    }
                }
            }
        }
    }
};

const categoryDocs = {
    '/api/categories': {
        get: index,
        post: create
    },
    '/api/categories/{slug}': {
        get: show,
        patch: update,
        delete: destroy
    }
};

const categorySchema = {
    Category: {
        type: 'object',
        properties: {
            id: {
                type: 'integer',
                description: 'Category ID'
            },
            name: {
                type: 'string',
                description: 'Category Name'
            },
            url: {
                type: 'string',
                description: 'Category URL',
                unique: true
            },
            description: {
                type: 'string',
                description: 'Category Description'
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

module.exports = {
    categoryDocs,
    categorySchema
};
