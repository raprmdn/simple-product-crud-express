const express = require('express');
const CategoryController = require('../controllers/category.controller');
const { categoryValidation } = require('../utils/validation/category.validation');

const router = express.Router();

router.get('/', CategoryController.index);
router.post('/', categoryValidation, CategoryController.create);
router.get('/:url', CategoryController.show);
router.patch('/:url', categoryValidation, CategoryController.update);
router.delete('/:url', CategoryController.delete);

module.exports = router;
