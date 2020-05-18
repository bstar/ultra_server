'use strict';
const models = require('../models');


const FindTagById = (req, res) => {

  const params = req.swagger.params;
  const id = params.id.value;

  models.tag.find({
      where: { id },
    })
    .then(tag => {
      res.json(tag);
    });
}

module.exports = {
  FindTagById,
};
