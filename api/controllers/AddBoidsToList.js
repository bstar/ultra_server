'use strict';
const models = require('../models');


const AddBoidsToList = (req, res) => {

  const params = req.swagger.params;
  const listId = params.id.value;
  const boidIds = params.boidIds.value.boidIds;

  models.list.find({
      where: { id: listId },
      include: [{ model: models.boid }],
    })
    .then(list => {
      list.addBoids(boidIds).then(result => {

        console.log(JSON.stringify(result,null,2));
        res.json(result);
      });
  });
};

module.exports = {
  AddBoidsToList,
};
