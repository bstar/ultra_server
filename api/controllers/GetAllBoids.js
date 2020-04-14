'use strict';

const Sequelize = require("sequelize");
const models = require('../models');
const Op = Sequelize.Op;
// var monitor = require('../helpers/monitor');

// Examples:
// boids?where=age_between:21,37|positions_short:c, rw&&noatts=true&order=combined_rating
// boids?where=ids:MkFyZ2VudGluYTQvNS8xOTk3,M0FyZ2VudGluYTgvMjUvMTk5OA&noatts=true

const processAgeRange = value => ({ [Op.between]: value.split(',').map(Number) });

const processFilters = filter => {
  
  const filters = filter.split("|");
  const filterObj = {};

  filters.map(filter => {

    const match = filter.match(/(.*):(.*)/);
    const matchKey = match[1];
    const matchValue = match[2];
    
    if (matchKey === 'age_between') {
      filterObj['age'] = processAgeRange(matchValue);
    } else if ((matchKey === 'ids')) { 
      filterObj['id'] = matchValue.split(',');
    } else {
      filterObj[matchKey] = { $like: `%${matchValue}%` };
    }
  });

  return filterObj;
};

const GetAllBoids = (req, res) => {
  
  const params = req.query;
  const noAtts = params.noatts ? JSON.parse(params.noatts) : false;
  const limit = params.limit ? parseInt(params.limit, 10) : 50;
  const where = params.where ? processFilters(params.where) : {};
  const include = !noAtts && [{ model: models.attributes }];
  const order = params.order ? [[params.order, 'DESC']] : null;
 
  models.boid.findAll({
      where,
      limit,
      order,
      include,
    })
    .then(boids => {
      res.json(boids);
    });
}

module.exports = {
  GetAllBoids,
};
