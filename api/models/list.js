'use strict';

module.exports = (sequelize, DataTypes) => {

  const List = sequelize.define('list', {
    name: DataTypes.STRING,
    userName: DataTypes.STRING,
    description: DataTypes.STRING,
    type: DataTypes.STRING,
    category: DataTypes.STRING,
    key: DataTypes.STRING,
    captureTeam: DataTypes.BOOLEAN,
    captureGM: DataTypes.BOOLEAN,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  });
  
  List.associate = models => {
    List.belongsToMany(models.boid, { through: models.listdata });
  };
 
  return List;
};
