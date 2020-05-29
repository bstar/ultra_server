const jwtSecret = require('./jwt');
const bcrypt = require('bcrypt');

const BCRYPT_SALT_ROUNDS = 12;
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const models = require('../models');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;


passport.use(
    'register',
    new localStrategy(
        {
            usernameField: 'name',
            passwordField: 'password',
            session: false,
        },
        (name, password, done) => {

            try {
                models.user.findOne({
                    where: {
                        name,
                    },
                }).then(user => {
                    if (user !== null) {
                        console.log('name already taken');
                        return done(null, false, { message: 'name already taken' });
                    } else {
                        bcrypt.hash(password, BCRYPT_SALT_ROUNDS).then(hashedPassword => {
                            models.user.create({ name, password: hashedPassword }).then(user => {
                                console.log('user created');
                                return done(null, user);
                            });
                        });
                    }
                });
            } catch (err) {
                done(err);
            }
        },
    ),
);

passport.use(
    'login',
    new localStrategy(
        {
            usernameField: 'name',
            passwordField: 'password',
            session: false,
        },
        (name, password, done) => {
            try {
                models.user.findOne({
                    where: {
                        name,
                    },
                }).then(user => {
                    if (user === null) {
                        return done(null, false, { message: 'bad username' });
                    } else {
                        bcrypt.compare(password, user.password).then(response => {
                            if (response !== true) {
                                console.log('passwords do not match');
                                return done(null, false, { message: 'passwords do not match' });
                            }
                            console.log('user found & authenticated');
                            return done(null, user);
                        });
                    }
                });
            } catch (err) {
                done(err);
            }
        },
    ),
);

const opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('JWT'),
    secretOrKey: jwtSecret.secret,
};

passport.use(
    'jwt',
    new JWTstrategy(opts, (jwt_payload, done) => {
        try {
            models.user.findOne({
                where: {
                    name: jwt_payload.id,
                },
            }).then(user => {
                if (user) {
                    console.log('user found in db in passport');
                    done(null, user);
                } else {
                    console.log('user not found in db');
                    done(null, false);
                }
            });
        } catch (err) {
            done(err);
        }
    }),
);
