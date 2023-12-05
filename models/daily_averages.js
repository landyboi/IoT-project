'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class daily_averages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  daily_averages.init({
    date: DataTypes.DATEONLY,
    device: DataTypes.INTEGER,
    averageValues: DataTypes.JSON,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'daily_averages',
  });
  return daily_averages;
};