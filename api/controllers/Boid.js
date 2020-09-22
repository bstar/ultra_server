'use strict';
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const passport = require('passport');
const models = require('../models');


const UpdateBoidData = (req, res, next) => {

    passport.authenticate('jwt', { session: false }, (err, user, info) => {

        if (err) return res.json({ status: 'error', message: err });

        const params = req.swagger.params;
        const listId = params.listId.value;
        const { boidId, rank, team, gm, grade } = req.body;
    
        models.list.find({
            where: { id: listId },
            include: [{ model: models.boid }],
            limit: 1
        })
        .then(list => {

            try {
                const boid = list.boids.find(boid => (boid.id === boidId));

                if (rank) boid.listdata.rank = rank;
                if (team) boid.listdata.team = team;
                if (gm) boid.listdata.gm = gm;
                if (grade) boid.listdata.grade = grade;

                if (list.userName === user.name) {
                    boid.listdata.save(); 
                    return res.json({ status: 'success' });
                }

                return res.status(401).json({ status: 'unauthorized' });

            } catch (error) {
                res.json({ status: 'error', message: 'Rank could not be set.' });
            }
        });
    })(req, res, next);
};

const UpdateBoidRankBatch = (req, res, next) => {

    passport.authenticate('jwt', { session: false }, (err, user, info) => {

        if (err) return res.json({ status: 'error', message: err });

        const params = req.swagger.params;
        const listId = params.listId.value;
        const players = req.body;
        const ids = Object.keys(players).map(key => key);

        models.list.find({
            where: { id: listId },
            include: [{ model: models.boid }],
            limit: 1
        })
        .then(list => {

            try {
                const boids = list.boids;

                ids.map(id => {
                    
                    const boid = boids.find(boid => boid.id === id);

                    if (boid) {
                        boid.listdata.rank = players[boid.id];
                        boid.listdata.save();
                    }
                });

                res.json({ status: 'success', message: 'Boid rankings updated' });

            } catch (error) {
                res.json({ status: 'failure', message: 'Ranks could not be set', error });
            }
        });
    })(req, res, next);
};

const UpdateBoidBatch = (req, res, next) => {

    passport.authenticate('jwt', { session: false }, (err, user, info) => {

        if (err) return res.json({ status: 'error', message: err });

        const players = req.body.players;

        players.map(player => {
            models.boid.find({
                where: { id: player.id },
                limit: 1,
            })
            .then(boid => {

                try {
                    Object.keys(player).map(key => {

                        if (key !== 'id') boid[key] = player[key];
                    });

                    boid.save();
                    res.json({ status: 'success', message: 'Boid batch data updated' });

                } catch (error) {
                    res.json({ status: 'failure', message: 'Data could not be set', error });
                }
            });
        });
    })(req, res, next);
};

module.exports = {
  UpdateBoidData,
  UpdateBoidRankBatch,
  UpdateBoidBatch,
};
