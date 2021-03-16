"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CarModel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CarModel.belongsTo(models.Make, {
        foreignKey: "makeId",
        onDelete: "CASCADE",
      });
      CarModel.hasMany(models.Car, {
        foreignKey: "modelId",
      });
    }
  }
  CarModel.init(
    {
      name: DataTypes.STRING,
      makeId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "CarModel",
    }
  );
  return CarModel;
};
