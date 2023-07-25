// Description: Model for ProductTag table
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
class ProductTag extends Model {}
// create fields/columns for ProductTag model
ProductTag.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'product',
        key: 'id',
      },
    },
    tag_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'tag',
        key: 'id',
      },
    },
  },
// pass in our imported sequelize connection (the direct connection to our database)
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);
// export model
module.exports = ProductTag;
