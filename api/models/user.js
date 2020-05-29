'use strict';

module.exports = (sequelize, DataTypes) => {

  const User = sequelize.define('user', {
    name: { type: DataTypes.STRING, primaryKey: true, autoIncrement: false },
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    ipaddress: DataTypes.STRING,
    type: DataTypes.STRING,
    team_id: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  });
  
 
  return User;
};
