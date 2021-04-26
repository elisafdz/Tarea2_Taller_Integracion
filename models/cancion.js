'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cancion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  cancion.init({
    name: DataTypes.STRING,
    duration: DataTypes.FLOAT,
    times_played: DataTypes.INTEGER,
    artist: DataTypes.STRING,
    album: DataTypes.STRING,
    self: DataTypes.STRING,
    albumeId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'cancion',
  });
  return cancion;
};