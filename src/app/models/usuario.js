'use strict';
const bcrypt = require('bcryptjs')
const {SALT_KEY} = require('../../config/contants')
const jwt = require('jsonwebtoken')

module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define('Usuario', {
    nome: { 
      type: DataTypes.STRING, 
      validation: {
        notNull: true, 
        notEmpty: true
      } 
    },

    email: {
      type: DataTypes.STRING,
      validation: {
        notNull: true, 
        notEmpty: true
      } 
    },

    password: DataTypes.VIRTUAL,
    
    password_hash: DataTypes.STRING,

    fotoPerfil: {
      type: DataTypes.STRING,
      validation: {
        notNull: true, 
        notEmpty: true
      } 
    }
  }, 
  
  {  
    hooks : {
      beforeSave : async function(user) {
        if (user.password) user.password_hash = await bcrypt.hash(user.password, 8)
      }
    }
  });

  Usuario.prototype.generateAccessToken = function() {
    return jwt.sign(this.id, SALT_KEY);
  };

  Usuario.prototype.checkPassword = function(password) {
    return bcrypt.compare(password, this.password_hash);
  };


  Usuario.associate = function(models) {
    // associations can be defined here
  };

  return Usuario;
};