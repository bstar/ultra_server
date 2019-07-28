'use strict';
const models = require('../models')

function UpdateBoidById(req, res){
  var params = req.swagger.params;

  models.boid.find({
      where: { id: params.id.value },
      limit: 1
    })
    .then((boid) => {
      if (boid) {
        boid.update(params.updated_boid.value)
        .then((boid) => {
          res.json(boid.get({ plain: true }));
        })
      }
    });
}

function UpdateAttributes (csvBoid, cb) {
  
  models.boid.find({
      where: { id: csvBoid.id },
      limit: 1
    })
    .then((boid) => {
      
      if (boid) {
        console.log("csvBoid.combined_rating", csvBoid.combined_rating);
        console.log("boid.combined_rating", boid.combined_rating);
        csvBoid.att_growth = csvBoid.combined_rating - boid.combined_rating;
        boid.update(csvBoid)
        .then((boid) => {
          
          csvBoid.attributes.boidId = boid.id;
          csvBoid.attributes.att_growth = csvBoid.att_growth;
          console.log(`Boid Updated: ${boid.name}, ${csvBoid.att_growth}`)
          models.attributes.create(csvBoid.attributes).then(cb);
        })
      } else {
        console.log("Boid not found.")
        cb();
      }
    });
}

// function UpdateAttributes (boid, cb) {
// 
//   boid.attributes.boidId = boid.id;
//   models.attributes.create(boid.attributes).then(cb);
// }

module.exports = {
  UpdateBoidById : UpdateBoidById,
  UpdateAttributes: UpdateAttributes,
}
