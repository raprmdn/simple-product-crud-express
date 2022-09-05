const express = require('express');
const CategoryRouter = require('./category.route');

const router = express.Router();

router.use('/categories', CategoryRouter);

module.exports = router;