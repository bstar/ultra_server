'use strict';
const models = require('../models');
// var monitor = require('../helpers/monitor');

const processFilters = filter => {
  var filters = filter.split("|");
  var filterObj = {};

  for (var i = 0; i < filters.length; i++) {
    const filter = filters[i];
    const match = filter.match(/(.*):(.*)/);

    filterObj[match[1]] = match[2];
  }

  return filterObj;
};

const GetAllAttributes = (req, res) => {
  const params = Object.assign({}, req.query);
  const limit = params && params.limit ? parseInt(params.limit, 10) : 50;
  const where = params.where ? processFilters(params.where) : {};

  models.attributes.findAll({
      where,
      limit,
    })
    .then(attributes => {
      res.json(attributes);
    });
}

module.exports = {
  GetAllAttributes,
};
