'use strict';
const models = require('../models');

function FindBoidById (req, res) {
  const params = req.swagger.params;
  const queryParams = req.query;
  const noAtts = queryParams.noatts ? JSON.parse(queryParams.noatts) : false;
  const include = !noAtts && [{ model: models.attributes }];

  models.boid.find({
      where: { id: params.id.value },
      include,
    })
    .then((boid) => {
      res.json(boid);
    });
}

function Get (id, cb) {
      
  models.boid.findOne({
      where: { id: id },
      limit: 1,
      // include: [{ model: models.attributes }],
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
