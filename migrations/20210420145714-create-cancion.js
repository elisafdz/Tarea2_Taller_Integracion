'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('cancions', {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      
      name: {
        type: Sequelize.STRING
      },
      duration: {
        type: Sequelize.FLOAT
      },
      times_played: {
        type: Sequelize.INTEGER
      },
      artist: {
        type: Sequelize.STRING
      },
      album: {
        type: Sequelize.STRING
      },
      self: {
        type: Sequelize.STRING
      },
      albumeId: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('cancions');
  }
};