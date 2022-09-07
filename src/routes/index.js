const express = require('express');
const CategoryRouter = require('./category.route');
const ProductRouter = require('./product.route');
const ItemRouter = require('./item.route');

const router = express.Router();

router.use('/categories', CategoryRouter);
router.use('/products', ProductRouter);
router.use('/items', ItemRouter);

module.exports = router;