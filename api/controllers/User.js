'use strict';
const passport = require('passport');
const jwt = require('jsonwebtoken');
const models = require('../models');
const jwtSecret = require('../config/jwt');


const GetAllUsers = (req, res) => {
  
    const params = req.query;
    const limit = params.limit ? parseInt(params.limit, 10) : 50;
   
    models.user.findAll({
        where: {},
        limit,
    })
    .then(users => {
        res.json(users);
    });
};

const UserExists = (req, res) => {
  
    const params = req.swagger.params;
    const name = params.name.value;

    models.user.findOne({
        where: { name },
    })
    .then(user => {

        if (user) return res.json({ exists: true });

        return res.json({ exists: false }) 
    });
};

const AddUser = (req, res) => {

    const params = req.swagger.params.user.value;
  
    models.user.create(params).then(user => {
        res.json(user);
    });
};

const DeleteUserById = (req, res) => {

  const params = req.swagger.params;

  models.user.destroy({
        where: { id: params.id.value }
    })
    .then(status => {
        res.json({ deleted: status });
    });
};

const Register = (req, res, next) => {

    passport.authenticate('register', (err, user, info) => {

        if (err) console.log(err);

        if (info != undefined) {
            console.log(info.message);
            res.send(info.message);
        } else {
            req.logIn(user, err => {
                models.user.findOne({
                    where: {
                        name: req.body.name,
                    },
                })
                .then(user => {
                    user
                    .update({
                        name: req.body.name,
                        type: req.body.type,
                        team_id: req.body.team_id,
                        email: req.body.email,
                        ipaddress: req.ip,
                    })
                    .then(() => {
                        console.log('user created in db');
                        res.status(200).send({ message: 'User created' });
                    });
                });
            });
        }
    })(req, res, next);
};


const Login = (req, res, next) => {

    passport.authenticate('login', (err, user, info) => {

        if (err) console.log(err);
        
        if (info != undefined) {
            console.log(info.message);
            res.send(info.message);
        } else {
            req.logIn(user, err => {
                models.user.findOne({
                    where: {
                        name: user.name,
                    },
                }).then(user => {
                    console.log("USER", user)
                    const token = jwt.sign({ id: user.name, team: user.team_id, role: user.type, email: user.email, exp: Math.floor(Date.now() / 1000) + (360 * 100000) }, jwtSecret.secret);
                    res.status(200).send({
                        auth: true,
                        token,
                        message: `User (${user.name}) found & logged in.`,
                    });
                });
            });
        }
    })(req, res, next);
};


module.exports = {
    GetAllUsers,
    UserExists,
    AddUser,
    DeleteUserById,
    Register,
    Login,
};
  