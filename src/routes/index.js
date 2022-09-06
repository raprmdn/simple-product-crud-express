const express = require('express');
const CategoryRouter = require('./category.route');
const ProductRouter = require('./product.route');

const router = express.Router();

router.use('/categories', CategoryRouter);
router.use('/products', ProductRouter);

module.exports = router;