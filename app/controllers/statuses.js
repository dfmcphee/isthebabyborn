var express = require('express');
var router = express.Router();
var db = require('../models');

var mailgun = require('mailgun-js')({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN
});

function updateSubscribers(babyId, status) {
  db.Baby.findOne({
    id: babyId,
    include: [db.Subscriber]
  }).then(function(baby) {
    var emailText = 'Status for <strong>' + baby.name + '</strong> changed to "' + status + '".';
    var emailHTML = '<p>Status for ' + baby.name + ' changed to "' + status + '".</p>';
    emailHTML += '<p><a href="https://' + process.env.SITE_URL + '/' + baby.id + '/view">View updates</a></p>';

    for (var i=0; i < baby.Subscribers.length; i++) {
      var data = {
        from: 'Is the baby born? <notifications@isthebabyborn.mcfeed.me>',
        to: baby.Subscribers[i].email,
        subject: 'Status update on ' + baby.name,
        text: emailText,
        html: emailHTML
      };

      mailgun.messages().send(data, function (error, body) {
        console.log('Email sent.');
      });
    }
  });
}

module.exports = function(app) {
  app.use('/', router);
};

router.post('/:baby_id/status/create', function (req, res, next) {
  var content = req.body.content;

  if (req.body.type !== 'custom') {
    content = req.app.locals.statusTypes[req.body.type];
  }

  db.Status.create({
    content: content,
    type: req.body.type,
    BabyId: req.params.baby_id
  }).then(function(status) {
    updateSubscribers(req.params.baby_id, status.content)
    res.redirect('/' + req.params.baby_id + '/edit?token=' + req.body.token);
  });
});
