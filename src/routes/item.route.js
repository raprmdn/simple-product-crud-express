const express = require('express');
const ItemController = require('../controllers/item.controller');
const { itemValidation } = require('../utils/validation/item.validation');

const router = express.Router();

router.get('/', ItemController.index);
router.post('/', itemValidation, ItemController.create);
router.get('/:id', ItemController.show);
router.patch('/:id', itemValidation, ItemController.update);
router.delete('/:id', ItemController.delete);

module.exports = router;
