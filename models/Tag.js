// This file is for the Tag model, which is used to create the Tag table in the database.
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');
class Tag extends Model {}
// create fields/columns for Tag model
Tag.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    tag_name: {
      type: DataTypes.STRING,
    },
  },
// pass in our imported sequelize connection (the direct connection to our database)
    {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'tag',
  }
);
// export model
module.exports = Tag;
