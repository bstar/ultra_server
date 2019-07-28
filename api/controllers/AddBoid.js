'use strict';
const models = require('../models');

function AddBoid (req, res) {
  var params = req.swagger.params.boid.value;

  models.boid.create(params).then(boid => {
    res.json(boid);
  });
}

function Add (boidData, cb) {
  
  // Object.keys(boidData).forEach((key) => (boidData[key] == null) && delete boidData[key]);

  
  models.boid.create(boidData).then(boid => {
    
    boidData.attributes.boidId = boid.id;
    models.attributes.create(boidData.attributes).then(cb);
  });
}

module.exports = {
  AddBoid,
  Add,
}
