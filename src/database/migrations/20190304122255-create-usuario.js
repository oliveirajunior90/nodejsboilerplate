'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Usuarios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      nome: {
        type: Sequelize.STRING,
        allowNull:false
      },

      email: {
        type: Sequelize.STRING,
        allowNull:false,
        unique: true
      },

      password_hash: {
        type: Sequelize.STRING,
        allowNull: false
      },

      fotoPerfil: {
        type: Sequelize.STRING,
        allowNull:true
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Usuarios');
  }
};