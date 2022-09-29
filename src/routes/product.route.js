const express = require('express');
const ProductController = require('../controllers/product.controller');
const { createProductValidation, updateProductValidation } = require('../utils/validation/product.validation');
const { itemValidation } = require('../utils/validation/item.validation');
const { uploadProductImage } = require('../middlewares/upload.middleware');

const router = express.Router();

router.get('/', ProductController.index);
router.post('/', uploadProductImage, createProductValidation, ProductController.create);
router.get('/:slug', ProductController.show);
router.patch('/:slug', uploadProductImage, updateProductValidation, ProductController.update);
router.delete('/:slug', ProductController.delete);
router.post('/:slug/add-item', itemValidation, ProductController.addItem);

module.exports = router;
