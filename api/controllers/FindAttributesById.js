'use strict';
const models = require('../models')

function FindById(req, res) {
  var params = req.swagger.params;

  models.attribute.find({
      where: { id: params.id.value }
    })
    .then((attribute) => {
      res.json(attribute);
    });
}

module.exports = {
  FinddById : FindById
}
