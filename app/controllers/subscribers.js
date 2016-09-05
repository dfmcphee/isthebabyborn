var express = require('express');
var router = express.Router();
var db = require('../models');

module.exports = function(app) {
  app.use('/', router);
};

router.post('/:baby_id/subscribe', function (req, res, next) {
  db.Subscriber.findOrCreate({
    where: {
      email: req.body.email,
      BabyId: req.params.baby_id
    }
  }).then(function(status) {
    res.redirect('/' + req.params.baby_id + '/view?flash=subscribed');
  });
});
