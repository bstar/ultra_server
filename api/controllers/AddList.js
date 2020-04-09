'use strict';
const models = require('../models');


const AddList = (req, res) => {

  const params = req.swagger.params.list.value;

  models.list.create(params).then(list => {
    res.json(list);
  });
}

module.exports = {
  AddList,
};
