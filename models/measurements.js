'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Measurements extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Measurements.init({
    temperature: DataTypes.INTEGER,
    humidity: DataTypes.FLOAT,
    airpressure: DataTypes.FLOAT,
    dewpoint: DataTypes.FLOAT,
    device: DataTypes.INTEGER,
    measuredAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Measurements',
  });
  return Measurements;
};