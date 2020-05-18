'use strict';
const models = require('../models');


const AddBoidsToList = (req, res) => {

  const params = req.swagger.params;
  const id = params.id.value;
  const boidIds = JSON.parse(params.boidIds.value).boidIds;

  models.list.find({
      where: { id },
      include: [{ model: models.boid }],
    })
    .then(list => {
      list.addBoids(boidIds).then(result => {
        res.json(result);
      });
  });
};

module.exports = {
  AddBoidsToList,
};
