'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class specs extends Model {

    static associate(models) {
      specs.hasMany(models.cars, {foreignKey:"spec_id"});
    }
  }
  specs.init({
    type: DataTypes.STRING
  }, {
    sequelize,
    modelName: "specs",
    tableName: "specs",
    paranoid: true,
  });
  return specs;
};