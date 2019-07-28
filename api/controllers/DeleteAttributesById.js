'use strict';
const models = require('../models')

function DeleteAttributesById(req, res) {
  var params = req.swagger.params;

  models.attributes.destroy({
      where: { id: params.id.value }
    })
    .then((status) => {
      res.json({ deleted: status });
    })
}

module.exports = {
  DeleteAttributesById : DeleteAttributesById
}
