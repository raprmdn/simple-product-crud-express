const express = require('express');
const CategoryController = require('../controllers/category.controller');

const router = express.Router();

router.get('/', CategoryController.index);
router.post('/', CategoryController.create);
router.get('/:url', CategoryController.show);
router.patch('/:url', CategoryController.update);
router.delete('/:url', CategoryController.delete);

module.exports = router;