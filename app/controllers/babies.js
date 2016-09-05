var express = require('express');
var router = express.Router();
var db = require('../models');
var uuid = require('uuid');

module.exports = function(app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Is the baby born?'
  });
});

router.get('/:id/edit', function(req, res, next) {
  db.Baby.findOne({
    id: req.params.id,
    include: [db.Status, db.Subscriber]
  }).then(function(baby) {
    if (!baby || req.query.token !== baby.token) {
      res.send(404);
    } else {
      res.render('edit', {
        title: baby.name,
        baby: baby
      });
    }
  });
});

router.get('/:id/view', function(req, res, next) {
  db.Baby.findOne({
    id: req.params.id,
    include: [db.Status]
  }).then(function(baby) {
    if (!baby) {
      res.send(404);
    } else {
      res.render('view', {
        title: baby.name,
        baby: baby
      });
    }
  });
});

router.post('/create', function (req, res, next) {
  db.Baby.create({
    name: req.body.name,
    token: uuid.v4()
  }).then(function(baby) {
    res.redirect('/' + baby.id + '/edit?token=' + baby.token);
  });
});