'use strict';
const models = require('../models');
// var monitor = require('../helpers/monitor');

var processFilters = function (filter) {
  var filters = filter.split("|");
  var filterObj ={};

  for (var i = 0; i < filters.length; i++) {
    var filter = filters[i],
        match = filter.match(/(.*):(.*)/);

    filterObj[match[1]] = match[2];
  }

  console.log("FILTERS: ", filterObj)
  return filterObj;
};


function GetAllAttributes (req, res) {
  const params = Object.assign({}, req.query),
        limit = params && params.limit ? parseInt(params.limit, 10) : 50;

  var filter = params.filter ? processFilters(params.filter) : {};

  models.attributes.findAll({
      where: filter,
      limit: limit
    })
    .then((attributes) => {
      res.json(attributes);
    });
}

module.exports = {
  GetAllAttributes : GetAllAttributes
};
