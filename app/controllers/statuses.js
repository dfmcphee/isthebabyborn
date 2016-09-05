var express = require('express');
var router = express.Router();
var db = require('../models');

module.exports = function(app) {
  app.use('/', router);
};

router.post('/:baby_id/status/create', function (req, res, next) {
  db.Status.create({
    content: req.body.content,
    BabyId: req.params.baby_id
  }).then(function(status) {
    res.redirect('/' + req.params.baby_id + '/edit?token=' + req.body.token);
  });
});
