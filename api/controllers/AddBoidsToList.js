'use strict';
const models = require('../models');


const updateRanks = (listId, ids) => {

  const ranks = ids.reduce((acc, id, rank) => {
    return { ...acc, ...{ [id]: rank + 1 } };
  }, {});

  models.list.find({
      where: { id: listId },
      include: [{ model: models.boid }],
      limit: 1
  })
  .then(list => {
      try {
          const boids = list.boids;
          ids.map(id => {
              const boid = boids.find(boid => boid.id === id);

              if (boid) {
                  boid.listdata.rank = ranks[boid.id];
                  boid.listdata.save();
              }
          });
          console.log("Ranks updated.")
      } catch (error) {
          console.log("Rank updates failed.")
      }
  });
};

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
        if (boidIds.length > 1) updateRanks(listId, boidIds);
        res.json(result);
      });
  }).then(() => {
    console.log("All Boids Added to List.");
  });
};

module.exports = {
  AddBoidsToList,
};
