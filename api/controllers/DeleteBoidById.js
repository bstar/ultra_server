'use strict';
const models = require('../models')

function DeleteBoidById(req, res) {
  var params = req.swagger.params;

  models.boid.destroy({
      where: { id: params.id.value }
    })
    .then((status) => {
      res.json({ deleted: status });
    })
}

module.exports = {
  DeleteBoidById : DeleteBoidById
}
