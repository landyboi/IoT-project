'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Devices extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Devices.init({
    name: DataTypes.STRING,
    country: DataTypes.CHAR(3),
    eventsupport: DataTypes.BOOLEAN,
    uuid: DataTypes.UUID,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Devices',
  });
  return Devices;
};