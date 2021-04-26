'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class artista extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.artista.hasMany(models.albume);
    }
  };
  artista.init({
    name: DataTypes.STRING,
    age: DataTypes.INTEGER,
    albums: DataTypes.STRING,
    tracks: DataTypes.STRING,
    self: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'artista',
  });
  return artista;
};