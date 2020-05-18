'use strict';
const models = require('../models')


const FindListById = (req, res) => {

  const params = req.swagger.params;
  const id = params.id.value;

  models.list.find({
      where: { id },
      include: [{ model: models.boid }],
    })
    .then(list => {
      if (!list) {
        return res.json({ error: 'List does not exist.' })
      }
      
      res.json(list);
    });
};

module.exports = {
  FindListById,
};
