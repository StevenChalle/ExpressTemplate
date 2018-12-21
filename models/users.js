'use strict'
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    pseudo: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    mail: DataTypes.STRING,
    password: DataTypes.STRING,
    unsubcribed: DataTypes.BOOLEAN
  }, {})
  users.associate = function (models) {
    // associations can be defined here
  }
  return users
}
