'use strict';

const Sequelize = require("sequelize");
const models = require('../models');


const GetAllLists = (req, res) => {
  
  const params = req.query;
  const limit = params.limit ? parseInt(params.limit, 10) : 50;
 
  models.list.findAll({
      where: {},
      limit,
    })
    .then(lists => {
      res.json(lists);
    });
}

module.exports = {
  GetAllLists,
};
