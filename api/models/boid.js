'use strict';

module.exports = (sequelize, DataTypes) => {
  var Boid = sequelize.define('boid', {
    id: { type: DataTypes.STRING, primaryKey: true, autoIncrement: false },
    ehm_id: DataTypes.INTEGER,
    age_over: DataTypes.REAL,
    att_growth: DataTypes.INTEGER,
    technical_rating: DataTypes.INTEGER,
    mental_rating: DataTypes.INTEGER,
    physical_rating: DataTypes.INTEGER,
    combined_rating: DataTypes.INTEGER,
    
    mental_off_weighted: DataTypes.REAL,
    physical_off_weighted: DataTypes.REAL,
    technical_off_weighted: DataTypes.REAL,
    combined_off_weighted: DataTypes.REAL,
    
    name: DataTypes.STRING,
    dob: DataTypes.STRING,
    nation: DataTypes.STRING,
    second_nation: DataTypes.STRING,
    international_apps: DataTypes.INTEGER,
    international_goals: DataTypes.INTEGER,
    international_assists: DataTypes.INTEGER,
    estimated_value: DataTypes.STRING,
    club_playing: DataTypes.STRING,
    division_playing: DataTypes.STRING,
    club_contracted: DataTypes.STRING,
    positions_short: DataTypes.STRING,
    stanley_cups_won: DataTypes.INTEGER,
    birth_town: DataTypes.STRING,
    age: DataTypes.INTEGER,
    current_ability: DataTypes.INTEGER,
    handedness: DataTypes.STRING,
    junior_preference: DataTypes.STRING,
    player_roles: DataTypes.STRING,
    morale: DataTypes.INTEGER,
    favorite_number: DataTypes.INTEGER,
    squad_number: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,

    // Hidden reputation stats
    // home_reputation: DataTypes.INTEGER,
    // current_reputation: DataTypes.INTEGER,
    // world_reputation: DataTypes.INTEGER,
    // defensive_role: DataTypes.INTEGER,
    // offensive_role: DataTypes.INTEGER,
  });
  
  Boid.associate = models => {
    Boid.hasMany(models.attributes);
    // Boid.hasMany(models.tag); // TODO kill tagging
    Boid.belongsToMany(models.list, { through: models.listdata });
  };

  return Boid;
};
