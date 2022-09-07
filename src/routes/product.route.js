const express = require('express');
const ProductController = require('../controllers/product.controller');
const { productValidation } = require("../utils/validation/product.validation");
const { itemValidation } = require("../utils/validation/item.validation");

const router = express.Router();

router.get('/', ProductController.index);
router.post('/', productValidation, ProductController.create);
router.get('/:slug', ProductController.show);
router.patch('/:slug', productValidation, ProductController.update);
router.delete('/:slug', ProductController.delete);
router.post('/:slug/add-item', itemValidation, ProductController.addItem);

module.exports = router;
