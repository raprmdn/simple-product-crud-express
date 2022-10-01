const express = require('express');
const ItemController = require('../controllers/item.controller');
const { createItemValidation, updateItemValidation } = require('../utils/validation/item.validation');
const { uploadItemImage } = require('../middlewares/upload.middleware');

const router = express.Router();

router.get('/', ItemController.index);
router.post('/', uploadItemImage, createItemValidation, ItemController.create);
router.get('/:id', ItemController.show);
router.patch('/:id', uploadItemImage, updateItemValidation, ItemController.update);
router.delete('/:id', ItemController.delete);

module.exports = router;
