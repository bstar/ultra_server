'use strict';
const models = require('../models');
const LRU = require("lru-cache");
const options = { max: 500 };
const cache = new LRU(options);

const FindBoidById = (req, res) => {

  const params = req.swagger.params;
  const id = params.id.value;
  const key = `boid:${id}`;
  const content = cache.get(key);

  // TODO need api to clear cache per key
  // if (content) {
  //   console.info('cache-hit: ', key);
  //   return res.json(content);
  // }

  models.boid.find({
      where: { id },
      include: [{ model: models.list }],
    })
    .then(boid => {
      // cache.set(key, boid);
      res.json(boid);
    });
};

const Get = (id, cb) => {
      
  models.boid.findOne({
      where: { id },
      limit: 1,
    })
    .then(boid => {
      
      if (boid) {
        console.log("Updating: ", boid.name);
      }
      
      cb(null, boid);
    })
};

module.exports = {
  FindBoidById,
  Get,
};
