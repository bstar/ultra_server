'use strict';
const models = require('../models');

function AddTag (req, res) {
  var params = req.swagger.params.tag.value;

  models.tag.create(params).then(tag => {
    res.json(tag);
  });
}

module.exports = {
  AddTag,
}
