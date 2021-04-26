'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class albume extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
      models.albume.hasMany(models.cancion);
    }
  };
  albume.init({
    name: DataTypes.STRING,
    genre: DataTypes.STRING,
    artist: DataTypes.STRING,
    tracks: DataTypes.STRING,
    self: DataTypes.STRING,
    artistumId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'albume',
  });
  return albume;
};