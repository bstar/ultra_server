'use strict';
const models = require('../models')


const UpdateBoidRank = (req, res) => {

  const params = req.swagger.params;
  const listId = params.listId.value;
  const boidId = params.boidId.value;
  const rank = params.rank.value;

  models.list.find({
      where: { id: listId },
      include: [{ model: models.boid }],
      limit: 1
    })
    .then(list => {

      try {
        const boid = list.boids.find(boid => (boid.id === boidId));

        boid.listdata.rank = rank;
        boid.listdata.save(); 
        res.json({ status: 'success' });
      }
      catch(error) {
        res.json({ status: 'error', message: 'Rank could not be set.' });
      }
    });
};

module.exports = {
  UpdateBoidRank,
}
