'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Item extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Item.belongsTo(models.Product, {
                foreignKey: 'product_id',
                as: 'product',
            });
        }
    }
    Item.init({
        product_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            reference: {
                model: 'Product',
                key: 'id',
                as: 'product_id',
            }
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        slug: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.DOUBLE.UNSIGNED,
            allowNull: false,
            defaultValue: 0,
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        description: {
            type: DataTypes.TEXT
        },
        is_published: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        }
    }, {
        sequelize,
        modelName: 'Item',
        underscored: true,
    });
    return Item;
};