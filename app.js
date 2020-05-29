'use strict';

var SwaggerExpress = require('swagger-express-mw');
var express = require('express');
var passport = require('passport');
var app = express();
var bodyParser = require('body-parser');
// var debug = require('debug')('express-sequelize');
var cors = require('cors');
var models = require('./api/models');
var log = require('electron-log');
var cors = require('cors');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());

app.set('trust proxy', true);

const serverPort = process.env.SERVERPORT ? JSON.parse(process.env.SERVERPORT) : 10010;
require('./api/config/passport');

module.exports = app;

var config = {
  appRoot: __dirname,
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { 
    console.error(err);
    log.error('Error', String(err));
  }

  swaggerExpress.register(app);

  var port = serverPort;

  models.sequelize.sync().then(() => {
    // app.use(express.static('../ui/build'))
    app.use('/swagger-ui', express.static(`${__dirname}/public/swagger-ui`));
    
    app.listen(port, function() {
      log.warn('Express server listening on port ' + port);
    });
    app.on('error', onError);
    app.on('listening', onListening);
  }).catch(err => {
    log.error(err);
  });
});


function onError (error) {
  if (error.syscall !== 'listen') {
    log.error(error)
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      log.error(bind + ' requires elevated privileges')
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      log.error(bind + ' is already in use')
      process.exit(1);
      break;
    default:
      log.error('Defaulr', error)
      throw error;
  }
}

function onListening() {
  // var addr = server.address();
  // var bind = typeof addr === 'string'
  //   ? 'pipe ' + addr
  //   : 'port ' + addr.port;
  // debug('Listening on ' + bind);
};
