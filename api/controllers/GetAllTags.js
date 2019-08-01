'use strict';

const Sequelize = require("sequelize");
const models = require('../models');


const GetAllTags = (req, res) => {
  
  const params = req.query;
  const limit = params.limit ? parseInt(params.limit, 10) : 50;
 
  models.tag.findAll({
      where: {},
      limit,
    })
    .then(tags => {
      res.json(tags);
    });
}

module.exports = {
  GetAllTags,
};
