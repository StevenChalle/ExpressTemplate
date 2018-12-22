'use strict'
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    pseudo: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    mail: DataTypes.STRING,
    password: DataTypes.STRING,
    unsubscribed: DataTypes.STRING,
    createdAt: DataTypes.TIMESTAMP,
    updatedAt: DataTypes.TIMESTAMP
  }, {})
  users.associate = function (models) {
    // associations can be defined here
  }
  return users
}
