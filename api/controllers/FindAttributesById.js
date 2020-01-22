'use strict';
const models = require('../models')

// finds by boidId
const FindAttributesById = (req, res) => {
  var params = req.swagger.params;

  models.attributes.find({
      where: { boidId: params.id.value }
    })
    .then((attribute) => {
      res.json(attribute);
    });
}

module.exports = {
  FindAttributesById,
}
