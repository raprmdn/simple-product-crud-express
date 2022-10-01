const express = require('express');
const ProductController = require('../controllers/product.controller');
const { createProductValidation, updateProductValidation } = require('../utils/validation/product.validation');
const { createItemValidation } = require('../utils/validation/item.validation');
const { uploadProductImage, uploadItemImage } = require('../middlewares/upload.middleware');

const router = express.Router();

router.get('/', ProductController.index);
router.post('/', uploadProductImage, createProductValidation, ProductController.create);
router.get('/:slug', ProductController.show);
router.patch('/:slug', uploadProductImage, updateProductValidation, ProductController.update);
router.delete('/:slug', ProductController.delete);
router.post('/:slug/add-item', uploadItemImage, createItemValidation, ProductController.addItem);

module.exports = router;
