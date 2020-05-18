'use strict';

module.exports = (sequelize, DataTypes) => {

  const Listdata = sequelize.define('listdata', {
    boidId: DataTypes.STRING,
    listId: DataTypes.INTEGER,
    rank: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  });
 
  return Listdata;
};
