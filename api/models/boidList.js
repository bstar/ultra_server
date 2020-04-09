'use strict';

module.exports = (sequelize, DataTypes) => {

  const BoidList = sequelize.define('boidList', {
    boidId: DataTypes.STRING,
    listId: DataTypes.STRING,
    rank: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  });
 
  return BoidList;
};
