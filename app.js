var express = require('express');
var config = require('./config/config');
var db = require('./app/models');

var app = express();

require('./config/express')(app, config);

db.sequelize
  .sync({
    force: false
  })
  .then(function () {
    app.listen(config.port, function () {
      console.log('Express server listening on port ' + config.port);
    });
  }).catch(function (e) {
    throw new Error(e);
  });
