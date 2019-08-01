'use strict';

module.exports = (sequelize, DataTypes) => {

  var Tag = sequelize.define('tag', {
    boidId: DataTypes.STRING,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  });
  
  Tag.associate = models => {
    Tag.belongsTo(models.boid);
  };
 
  return Tag;
};
