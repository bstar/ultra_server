'use strict';

module.exports = (sequelize, DataTypes) => {

  const Listdata = sequelize.define('listdata', {
    boidId: DataTypes.STRING,
    listId: DataTypes.INTEGER,
    rank: DataTypes.INTEGER,
    team: DataTypes.STRING,
    gm: DataTypes.STRING,
    grade: DataTypes.STRING,
    stars: DataTypes.INTEGER,
    notes: DataTypes.TEXT,
    score: DataTypes.REAL,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  });
 
  return Listdata;
};
