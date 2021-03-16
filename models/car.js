"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Car extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Car.belongsTo(models.CarModel, {
        foreignKey: "modelId",
        onDelete: "CASCADE",
      });
    }
  }
  Car.init(
    {
      description: DataTypes.STRING,
      modelId: DataTypes.INTEGER,
      transmission: DataTypes.STRING,
      color: DataTypes.STRING,
      drivetrain: DataTypes.STRING,
      year: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Car",
    }
  );
  return Car;
};
