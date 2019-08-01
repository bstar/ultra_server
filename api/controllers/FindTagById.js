'use strict';
const models = require('../models')

function FindTagById(req, res) {
  var params = req.swagger.params;

  models.tag.find({
      where: { id: params.id.value },
    })
    .then(tag => {
      res.json(tag);
    });
}

function Get (id, cb) {
      
  models.tag.findOne({
      where: { id: id },
      limit: 1,
      // include: [{ model: models.attributes }],
    })
    .then(tag => {
      
      if (tag) {
        console.log("Updating: ", tag.name);
      }
      
      cb(null, tag);
    })
}

module.exports = {
  FindTagById : FindTagById,
  Get: Get,
}
