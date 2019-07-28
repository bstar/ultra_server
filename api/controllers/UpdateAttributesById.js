'use strict';
const models = require('../models')

function UpdateAttributesById(req, res){
  var params = req.swagger.params;

  models.attributes.find({
      where: { id: params.id.value }
    })
    .then((attributes) => {
      if (attributes) {
        attributes.update(params.updated_attributes.value)
        .then((attributes) => {
          res.json(attributes.get({ plain: true }));
        })
      }
    });
}

module.exports = {
  UpdateAttributesById : UpdateAttributesById
}
