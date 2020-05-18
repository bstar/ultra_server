'use strict';
const models = require('../models');


const AddList = (req, res) => {

  const params = req.swagger.params.list.value;

  models.list.create(params).then(list => {
    res.json(list);
    // list.addBoid('MTMyOTVDYW5hZGExLzEzLzE5OTc', { through: { rank: 5 } }).then(() => {
    //   res.json(list);
    // })
  }, {
    include: [models.boid],
  });
}

module.exports = {
  AddList,
};
