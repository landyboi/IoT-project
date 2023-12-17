'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class event_subscribers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  event_subscribers.init({
    email: DataTypes.STRING,
    ip_address: DataTypes.CHAR(15),
    device: DataTypes.INTEGER,
    options: DataTypes.JSON,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'event_subscribers',
  });
  return event_subscribers;
};