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
                        type: 'array',
                        items: {
                            $ref: '#/components/schemas/Category'
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
        200: {
            description: 'Success create category',
            content: {
                'application/json': {
                    schema: {
                        $ref: '#/components/schemas/Category'
                    }
                }
            }
        },
        422: {
            description: 'Unprocessable Entity. The given data was invalid.'
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
                        $ref: '#/components/schemas/Category'
                    }
                }
            }
        },
        404: {
            description: 'Category not found'
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
                            required: true,
                            example: 9
                        },
                        name: {
                            type: 'string',
                            required: true,
                            example: 'Test Updated'
                        },
                        url: {
                            type: 'string',
                            required: true,
                            example: 'test'
                        },
                        description: {
                            type: 'string',
                            example: 'Test Category Description Updated'
                        }
                    }
                }
            }
        }
    },
    responses: {
        200: {
            description: 'Success update category'
        },
        404: {
            description: 'Category not found'
        },
        422: {
            description: 'Unprocessable Entity. The given data was invalid.'
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
            description: 'Success delete category'
        },
        404: {
            description: 'Category not found'
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
                description: 'Category ID',
                example: 1
            },
            name: {
                type: 'string',
                description: 'Category Name',
                example: 'Equipment'
            },
            url: {
                type: 'string',
                description: 'Category URL',
                unique: true,
                example: 'equip'
            },
            description: {
                type: 'string',
                description: 'Category Description',
                example: 'Equipment category products'
            },
            createdAt: {
                type: 'string',
                format: 'date-time',
                description: 'Category Created At'
            },
            updatedAt: {
                type: 'string',
                format: 'date-time',
                description: 'Category Updated At'
            }
        }
    }
};

module.exports = {
    categoryDocs,
    categorySchema
};
