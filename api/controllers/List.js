'use strict';
const passport = require('passport');
const models = require('../models');


const DeleteListById = (req, res) => {

  const params = req.swagger.params;

  models.list.destroy({
      where: { id: params.id.value }
    })
    .then(status => {
      res.json({ deleted: status });
    })
};

const GetAllLists = (req, res, next) => {

  passport.authenticate('jwt', { session: false }, (err, user, info) => {

    const params = req.query;
    const limit = params.limit ? parseInt(params.limit, 10) : 50;

    if (err) console.log(err);

    if (user.type && user.type.match(/(^super$|^admin$)/)) {
      models.list.findAll({
        where: {},
        limit,
      })
      .then(lists => {
        res.send(lists);
      });
    } else {
      res.status(500).send([{ error: info.message }]);
    }
  })(req, res, next);
};

const GetPersonalLists = (req, res, next) => {

  passport.authenticate('jwt', { session: false }, (err, user, info) => {

    const params = req.query;
    const limit = params.limit ? parseInt(params.limit, 10) : 50;

    if (err) console.log(err);

    if (info != undefined) {
      console.log(info.message);
      res.send(info.message);
    } else {
      models.list.findAll({
        where: { type: 'personal', userName: user.name },
        limit,
      })
      .then(lists => {
        res.send(lists);
      });
    }
  })(req, res, next);
};

module.exports = {
  DeleteListById,
  GetAllLists,
  GetPersonalLists,
}
