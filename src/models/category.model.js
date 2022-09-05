const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.config.js');

const Category = sequelize.define('categories', {
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    description: {
        type: DataTypes.TEXT,
    }
}, {
    freezeTableName: true,
});

module.exports = Category;