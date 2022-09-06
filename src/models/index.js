const ProductModel = require('./product.model');
const CategoryModel = require('./category.model');
const ItemModel = require('./item.model');

CategoryModel.hasMany(ProductModel, {
    foreignKey: 'category_id',
    as: 'products',
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
});

ProductModel.belongsTo(CategoryModel, {
    foreignKey: 'category_id',
    as: 'category',
});

ProductModel.hasMany(ItemModel, {
    foreignKey: 'product_id',
    as: 'items',
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
});

ItemModel.belongsTo(ProductModel, {
    foreignKey: 'product_id',
    as: 'product',
});

module.exports = {
    ProductModel,
    CategoryModel,
    ItemModel,
}