// Description: Model for Category table
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');
class Category extends Model {}
// create fields/columns for Category model
Category.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    category_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
// pass in our imported sequelize connection (the direct connection to our database)
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'category',
  }
);
// export model
module.exports = Category;
