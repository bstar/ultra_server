'use strict';

module.exports = (sequelize, DataTypes) => {

  const List = sequelize.define('list', {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    type: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  });
  
  List.associate = models => {
    List.belongsToMany(models.boid, { through: models.boidList });
  };
 
  return List;
};
