'use strict';
const models = require('../models')

function DeleteTagById(req, res) {
  var params = req.swagger.params;

  models.tag.destroy({
      where: { id: params.id.value }
    })
    .then((status) => {
      res.json({ deleted: status });
    })
}

module.exports = {
  DeleteTagById: DeleteTagById
}
