'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Category extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate (models) {
            // define association here
            Category.hasMany(models.Product, {
                foreignKey: 'category_id',
                as: 'products',
                onDelete: 'NO ACTION',
                onUpdate: 'NO ACTION'
            });
        }
    }
    Category.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        description: {
            type: DataTypes.TEXT
        }
    }, {
        sequelize,
        modelName: 'Category',
        underscored: true
    });
    return Category;
};
