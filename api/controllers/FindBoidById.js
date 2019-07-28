'use strict';
const models = require('../models')

function FindBoidById(req, res) {
  var params = req.swagger.params;

  models.boid.find({
      where: { id: params.id.value },
      include: [{ model: models.attributes }]
    })
    .then((boid) => {
      res.json(boid);
    });
}

function Get (id, cb) {
      
  console.log(id);
  
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
  FindBoidById : FindBoidById,
  Get: Get,
}
