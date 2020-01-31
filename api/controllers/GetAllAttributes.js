'use strict';
const models = require('../models');
const LRU = require("lru-cache");
const options = { max: 500 };
const cache = new LRU(options);


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
  const key = `attributes:${JSON.stringify(where)}`;
  const content = cache.get(key);

  if (content) {
    console.info('cache-hit: ', key);
    return res.json(content);
  }

  models.attributes.findAll({
      where,
      limit,
    })
    .then(attributes => {
      cache.set(key, attributes);
      res.json(attributes);
    });
};

module.exports = {
  GetAllAttributes,
};
