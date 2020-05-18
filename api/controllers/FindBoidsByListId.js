'use strict';
const models = require('../models');


const FindBoidsByListId = (req, res) => {

  const params = req.swagger.params;
  const id = params.id.value;

  models.list.find({
    where: { id },
    include: [{ model: models.boid }],
  })
  .then(list => {
    res.json(list.boids);
  })
};

module.exports = {
  FindBoidsByListId,
};
