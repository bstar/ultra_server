'use strict';
const models = require('../models');

function AddAttributes (req, res){
  var params = req.swagger.params.attributes.value;

  models.attributes.create(params).then(attributes => {
    res.json(attributes);
  })
}

module.exports = {
  AddAttributes: AddAttributes
}
