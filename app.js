'use strict';

var SwaggerExpress = require('swagger-express-mw');
var express = require('express');
var app = express();
var debug = require('debug')('express-sequelize');
var cors = require('cors');
var models = require('./api/models');
var log = require('electron-log');
var cors = require('cors');

app.use(cors());

const serverPort = process.env.SERVERPORT ? JSON.parse(process.env.SERVERPORT) : 10010;

module.exports = app;

var config = {
  appRoot: __dirname // required config
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { 
    console.error(err);
    log.error('Error', String(err)); }


  // install middleware
  swaggerExpress.register(app);

  // var port = process.env.PORT || 10010;
  var port = serverPort;

  models.sequelize.sync().then(() => {
    /**
     * Listen on provided port, on all network interfaces.
     */
     
    // log.warn('APP', err)

    // app.use(express.static('../ui/build'))
    app.use('/swagger-ui', express.static(`${__dirname}/public/swagger-ui`));
    // app.use(express.static('./public/swagger-ui'))
    
    app.listen(port, function() {
      // debug('Express server listening on port ' + app.address().port);
      log.warn('Express server listening on port ' + port);
    });
    app.on('error', onError);
    app.on('listening', onListening);
  }).catch((err) => {
    log.error(err);
  });;


  // if (swaggerExpress.runner.swagger.paths['/hello']) {
  //   console.log('try this:\ncurl http://127.0.0.1:' + port + '/hello?name=Scott');
  // }
});


/**
 * Event listener for HTTP server "error" event.
 */

function onError (error) {
  if (error.syscall !== 'listen') {
    log.error(error)
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
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

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  // var addr = server.address();
  // var bind = typeof addr === 'string'
  //   ? 'pipe ' + addr
  //   : 'port ' + addr.port;
  // debug('Listening on ' + bind);
}
