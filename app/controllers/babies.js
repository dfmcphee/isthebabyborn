var express = require('express');
var router = express.Router();
var db = require('../models');
var uuid = require('uuid');
var moment = require('moment');

module.exports = function(app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Is the baby born?'
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

router.get('/:id/edit', function(req, res, next) {
  db.Baby.find({
    where: {
      id: req.params.id,
      token: req.query.token
    },
    include: [db.Subscriber]
  }).then(function(baby) {
    if (!baby) {
      res.send(404);
    } else {
      baby.getStatuses({
        order: [['createdAt', 'DESC']]
      }).then(function(statuses) {
        res.render('edit', {
          title: baby.name,
          baby: baby,
          statuses: statuses,
          statusTypes: req.app.locals.statusTypes,
          moment: moment,
          fullUrl: 'https://' + req.get('host')
        });
      });
    }
  });
});

router.get('/:id/view', function(req, res, next) {
  successMessage = req.query.flash ? true : false
  db.Baby.find({
    where: {
      id: req.params.id
    }
  }).then(function(baby) {
    if (!baby) {
      res.send(404);
    } else {
      baby.getStatuses({
        order: [['createdAt', 'DESC']]
      }).then(function(statuses) {
        res.render('view', {
          title: baby.name,
          baby: baby,
          statuses: statuses,
          moment: moment,
          successMessage: successMessage
        });
      });
    }
  });
});
