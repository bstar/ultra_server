'use strict';
const models = require('../models')

const DeleteListById = (req, res) => {

  const params = req.swagger.params;

  models.list.destroy({
      where: { id: params.id.value }
    })
    .then(status => {
      res.json({ deleted: status });
    })
}

module.exports = {
  DeleteListById,
}
