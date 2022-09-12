const index = {
    tags: ["Products"],
    summary: "Get all products",
    description: "List of all products",
    parameters: [],
    responses: {
        200: {
            description: "Success get products",
            content: {
                "application/json": {
                    schema: {
                        type: "array",
                        items: {
                            $ref: "#/components/schemas/Products",
                        }
                    }
                }
            }
        }
    }
};

const create = {
    tags: ["Products"],
    summary: "Create new product",
    description: "Create new product",
    parameters: [],
    requestBody: {
        description: "Create a new product",
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        category_id: {
                            type: "integer",
                            description: "Category id of product",
                            required: true,
                        },
                        name: {
                            type: "string",
                            description: "Name of product",
                            required: true,
                        },
                        price: {
                            type: "integer",
                            description: "Price of product",
                            required: true,
                        },
                        description: {
                            type: "string",
                            description: "Description of product",
                        },
                        is_featured: {
                            type: "boolean",
                            description: "Is featured of product",
                            required: true,
                        },
                        is_published: {
                            type: "boolean",
                            description: "Is published of product",
                            required: true,
                        }
                    }
                }
            }
        },
        required: true
    },
    responses: {
        200: {
            description: "Success create product",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/Products",
                    }
                }
            }
        },
        404: {
            description: "Category not found",
        },
        422: {
            description: "Unprocessable Entity",
        }
    }
};

const show = {
    tags: ["Products"],
    summary: "Get product by slug",
    description: "Get product by slug",
    parameters: [
        {
            name: "slug",
            in: "path",
            description: "Slug of product",
            required: true,
        }
    ],
    responses: {
        200: {
            description: "Success get product",
        },
        404: {
            description: "Product not found",
        }
    }

}

const update = {
    tags: ["Products"],
    summary: "Update product by slug",
    description: "Update product by slug",
    parameters: [
        {
            name: "slug",
            in: "path",
            description: "Slug of product",
            required: true,
        }
    ],
    requestBody: {
        description: "Update product",
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        id: {
                            type: "integer",
                            description: "Id of product",
                            required: true,
                        },
                        category_id: {
                            type: "integer",
                            description: "Category id of product",
                            required: true,
                        },
                        name: {
                            type: "string",
                            description: "Name of product",
                            required: true,
                        },
                        price: {
                            type: "integer",
                            description: "Price of product",
                            required: true,
                        },
                        description: {
                            type: "string",
                            description: "Description of product",
                        },
                        is_featured: {
                            type: "boolean",
                            description: "Is featured of product",
                            required: true,
                        },
                        is_published: {
                            type: "boolean",
                            description: "Is published of product",
                            required: true,
                        }
                    }
                }
            }
        },
        required: true
    },
    responses: {
        200: {
            description: "Success update product",
        },
        404: {
            description: "Product not found or Category not found",
        },
        422: {
            description: "Unprocessable Entity",
        }
    }
}

const destroy = {
    tags: ["Products"],
    summary: "Delete product by slug",
    description: "Delete product by slug",
    parameters: [
        {
            name: "slug",
            in: "path",
            description: "Slug of product",
            required: true,
        }
    ],
    responses: {
        200: {
            description: "Success delete product",
        },
        404: {
            description: "Product not found",
        }
    }
}

const addItem = {
    tags: ["Products"],
    summary: "Add item to product by slug",
    description: "Add item to product by slug",
    parameters: [
        {
            name: "slug",
            in: "path",
            description: "Slug of product",
            required: true,
        }
    ],
    requestBody: {
        description: "Add item to product",
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        product_id: {
                            type: "integer",
                            description: "Product id of item",
                            required: true,
                        },
                        name: {
                            type: "string",
                            description: "Name of item",
                            required: true,
                        },
                        price: {
                            type: "integer",
                            description: "Price of item",
                            required: true,
                        },
                        stock: {
                            type: "integer",
                            description: "Stock of item",
                            required: true,
                        },
                        description: {
                            type: "string",
                            description: "Description of item",
                        },
                        is_published: {
                            type: "boolean",
                            description: "Is published of item",
                            required: true,
                        }
                    }
                }
            }
        },
        required: true
    }
}

const productDocs = {
    "/api/products": {
        get: index,
        post: create,
    },
    "/api/products/{slug}": {
        get: show,
        patch: update,
        delete: destroy,
    },
    "/api/products/{slug}/add-item": {
        post: addItem,
    }
};

const productSchema = {
    Products: {
        type: 'object',
        properties: {
            id: {
                type: 'integer',
                description: 'Product ID',
                example: 1
            },
            category_id: {
                type: 'integer',
                description: 'Product category id',
                example: 2,
            },
            name: {
                type: 'string',
                description: 'Product name',
                example: 'The First Product',
            },
            slug: {
                type: 'string',
                description: 'Product slug',
                example: 'the-first-product',
            },
            price: {
                type: 'integer',
                description: 'Product price',
                example: 250,
            },
            description: {
                type: 'string',
                description: 'Product description',
                example: 'The First Product description',
            },
            is_featured: {
                type: 'boolean',
                description: 'Product is featured',
                example: false,
            },
            is_published: {
                type: 'boolean',
                description: 'Product is published',
                example: true,
            },
            createdAt: {
                type: 'string',
                format: 'date-time',
                description: 'Product created at',
            },
            updatedAt: {
                type: 'string',
                format: 'date-time',
                description: 'Product updated at',
            },
            category: {
                type: 'object',
                properties: {
                    id: {
                        type: 'integer',
                        description: 'Category ID',
                        example: 2
                    },
                    name: {
                        type: 'string',
                        description: 'Category name',
                        example: 'Consumables',
                    },
                    slug: {
                        type: 'string',
                        description: 'Category slug',
                        example: 'consume',
                    }
                }
            }
        }
    }
}

module.exports = {
    productDocs,
    productSchema
}