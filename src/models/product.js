'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate (models) {
            // define association here
            Product.belongsTo(models.Category, {
                foreignKey: 'category_id',
                as: 'category'
            });

            Product.hasMany(models.Item, {
                foreignKey: 'product_id',
                as: 'items',
                onDelete: 'NO ACTION',
                onUpdate: 'NO ACTION'
            });
        }
    }
    Product.init({
        category_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            reference: {
                model: 'Model',
                key: 'id',
                as: 'category_id'
            }
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        slug: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        price: {
            type: DataTypes.DOUBLE.UNSIGNED,
            allowNull: false,
            defaultValue: 0
        },
        description: {
            type: DataTypes.TEXT
        },
        full_image: {
            type: DataTypes.STRING,
            allowNull: true
        },
        half_image: {
            type: DataTypes.STRING,
            allowNull: true
        },
        is_featured: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        is_published: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    }, {
        sequelize,
        modelName: 'Product',
        underscored: true,
        getterMethods: {
            full_image_url () {
                return `${process.env.APP_URL}${process.env.PORT}/${this.getDataValue('full_image')}`;
            },
            half_image_url () {
                return `${process.env.APP_URL}${process.env.PORT}/${this.getDataValue('half_image')}`;
            }
        }
    });
    return Product;
};
