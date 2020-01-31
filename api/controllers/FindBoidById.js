'use strict';
const models = require('../models');

const FindBoidById = (req, res) => {

  const params = req.swagger.params;

  models.boid.find({
      where: { id: params.id.value },
    })
    .then(boid => {
      res.json(boid);
    });
}

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
}

module.exports = {
  FindBoidById,
  Get,
}
