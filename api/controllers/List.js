'use strict';
const passport = require('passport');
const models = require('../models');


const AddList = (req, res, next) => {

  passport.authenticate('jwt', { session: false }, (err, user, info) => {

    const params = req.swagger.params.list.value;

    if (err) console.log(err);

    params.userName = user.name;
    params.key = params.key || 'personal';
    params.category = params.category || 'main';

    if (['admin', 'super'].includes(user.type)) {
      params.type = params.type || 'default';
    } else {
      params.type = 'personal'; // force personal lists for non-admins
    }

    models.list.create(params).then(list => {
      res.status(200).json(list);
    });

  })(req, res, next);
};

// TODO needs passport auth and user filter
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

    if (['admin', 'super'].includes(user.type)) {
      models.list.findAll({
        where: {},
        include: [{ model: models.boid }],
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
      res.send(info.message);
    } else {
      models.list.findAll({
        where: { key: 'personal', userName: user.name },
        include: [{ model: models.boid }],
        limit,
      })
      .then(lists => {

        res.send(lists);
      });
    }
  })(req, res, next);
};

const GetGlobalLists = (req, res, next) => {

  passport.authenticate('jwt', { session: false }, (err, user, info) => {

    const params = req.query;
    const limit = params.limit ? parseInt(params.limit, 10) : 50;

    if (err) console.log(err);

    if (info != undefined) {
      console.log(info.message);
      res.send(info.message);
    } else {
      models.list.findAll({
        where: { key: 'global' },
        include: [{ model: models.boid }],
        limit,
      })
      .then(lists => {
        res.send(lists);
      });
    }
  })(req, res, next);
};

// TODO needs passport auth and user filter
const RemoveBoidFromList = (req, res) => {

  const params = req.swagger.params;
  const listId = params.listId.value;
  const boidId = params.boidId.value;

  models.list.find({
      where: { id: listId },
      include: [{ model: models.boid }],
    })
    .then(list => {
      list.removeBoid(boidId).then(result => {
        res.json({ status: 'success', message: 'Player removed from list' });
      });
  });
};

module.exports = {
  AddList,
  DeleteListById,
  GetAllLists,
  GetPersonalLists,
  GetGlobalLists,
  RemoveBoidFromList,
};
