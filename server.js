var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var _ = require('underscore');
var sendgrid = require('sendgrid')('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');
var path = require("path");

var db = require('./db.js');
var port = process.env.PORT || 5000;


app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());
app.use(express.static('./views'));

app.use(bodyParser.json());

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname, 'board.html'));
});

app.get('/creative',function(req,res){
  res.sendFile(path.join(__dirname, 'creative.html'));
});

app.get('/culinary',function(req,res){
  res.sendFile(path.join(__dirname, 'culinary.html'));
});















app.get('/backoffice/subscriptions', function(req, res) {
  db.subscription.findAll().then(function(subscriptions) {
    var subscriptionArray = [];
    console.log(Array.isArray(subscriptionArray));
    for (var subscription in subscriptions) {
      if (subscriptions.hasOwnProperty(subscription)) {
        subscriptionArray.push(subscriptions[subscription].dataValues);
      }
    }
    console.log(subscriptionArray);
    console.log(Array.isArray(subscriptionArray));
    res.render('backoffice.jsx', {subscriptions: subscriptionArray});
  });
});

app.get('/subscriptions', function(req, res) {
  var query = req.query;
  var where = {};

  if (query.hasOwnProperty('email') && query.email.trim().length > 0) {
    where.email = query.email.trim();
  }

  if (query.hasOwnProperty('subscribed') && query.subscribed === 'true') {
    where.subscribed = true;
  } else if (query.hasOwnProperty('subscribed') && query.subscribed === 'false') {
    where.subscribed = false;
  }

  db.subscription.findAll({where: where}).then(function(subscriptions) {
    console.log(where);
    res.send(subscriptions);
  }, function(error) {
    res.status(500).send();
  });
});

app.get('/subscriptions/:id', function(req, res) {
  var subscriptionId = parseInt(req.params.id, 10);
  db.subscription.findById(subscriptionId).then(function(subscription) {
    if (!!subscription) {
      res.json(subscription.toJSON());
    } else {
      res.status(404).send();
    }
  }, function(error) {
    res.status(500).send();
  });
});

app.post("/subscriptions/new", function(req, res) {
  var body = _.pick(req.body, 'email');
  if (!_.isString(body.email) || body.email.trim().length === 0 || !_.contains(body.email, '@')) {
        res.status(400).json({"error": "The request body was not formatted correctly."});
  }

  body.email = body.email.trim().toLowerCase();

  var email     = new sendgrid.Email(
    {
      to      : body.email,
      from    : 'steakout.mailer@gmail.com',
      subject : 'Node Mailer Test',
      html    : '<h2>Welcome to the Steakout mailing list!</h2><p>If you would like to unsubscribe, please click the following <a href="https://www.npmjs.com/package/request">link</a></p>'
    }
  );
  sendgrid.send(email, function(err, json) {
    if (err) { console.error(err); }
    console.log(json);
  });

  db.subscription.create(body).then(function(subscription) {
    if (subscription) {
      res.send(subscription.toJSON());
    } else {
      res.status(500).send();
    }
  }).catch(function(error) {
    res.status(500).send();
  })
});

app.delete('/subscriptions/:id', function(req, res) {
  var subscriptionId = parseInt(req.params.id, 10);
  db.subscription.destroy({
    where: {
      id: subscriptionId
    }
  }).then(function(rowsDeleted) {
    if (rowsDeleted === 0) {
      res.status(404).json({
        'error': 'no subscription with that id found'
      });
    } else {
      res.status(204).send();
    }
  }).catch(function() {
    res.status(500).send();
  });
});

app.put('/subscriptions/:id', function(req, res) {
  var subscriptionId = parseInt(req.params.id, 10);
  body = _.pick(req.body, 'email', 'subscribed');
  var attributes = {};

  if (body.hasOwnProperty('email')) {
    attributes.email = body.email;
  }

  if (body.hasOwnProperty('subscribed') && _.isBoolean(body.subscribed)) {
    attributes.subscribed = body.subscribed;
  }

  db.subscription.findById(subscriptionId).then(function(subscription) {
    if (subscription) {
      return subscription.update(attributes);
    } else {
      res.status(404).send();
    }
  }, function() {
    res.status(500).send();
  }).then(function(subscription) {
    res.json(subscription.toJSON());
  }, function(error) {
    res.status(400).json(error);
  });

});

















app.post("/reviews/new", function(req, res) {
  var body = _.pick(req.body, 'name', 'phone_number', 'message');
  if (!_.isString(body.name) || body.name.trim().length === 0) {
        res.status(400).json({"error": "The request body was not formatted correctly."});
  }
  if (!_.isString(body.phone_number) || body.phone_number.trim().length === 0) {
        res.status(400).json({"error": "The request body was not formatted correctly."});
  }
  if (!_.isString(body.message) || body.message.trim().length === 0) {
        res.status(400).json({"error": "The request body was not formatted correctly."});
  }

  body.name = body.name.trim().toLowerCase();
  body.phone_number = body.phone_number.replace(/[^0-9]/g, '').trim();
  body.message = body.message.trim();

  db.review.create(body).then(function(subscription) {
    if (subscription) {
      res.send(subscription.toJSON());
    } else {
      res.status(500).send();
    }
  }).catch(function(error) {
    res.status(500).send();
  })
});

app.get('/reviews/:id', function(req, res) {
  var reviewId = parseInt(req.params.id, 10);
  db.review.findById(reviewId).then(function(review) {
    if (!!review) {
      res.json(review.toJSON());
    } else {
      res.status(404).send();
    }
  }, function(error) {
    res.status(500).send();
  });
});

app.get('/reviews', function(req, res) {
  var query = req.query;
  var where = {};

  if (query.hasOwnProperty('name') && query.name.trim().length > 0) {
    where.name = query.name.trim();
  }
  if (query.hasOwnProperty('phone_number') && query.phone_number.replace(/[^0-9]/g, '').trim().length > 0) {
    where.phone_number = query.phone_number.replace(/[^0-9]/g, '').trim();
  }
  if (query.hasOwnProperty('message') && query.message.trim().length > 0) {
    where.message = {
      $like: '%' + query.message.trim() + '%'
    };
  }

  db.review.findAll({where: where}).then(function(reviews) {
    console.log(where);
    res.send(reviews);
  }, function(error) {
    res.status(500).send();
  });
});

app.delete('/reviews/:id', function(req, res) {
  var reviewId = parseInt(req.params.id, 10);
  db.review.destroy({
    where: {
      id: reviewId
    }
  }).then(function(rowsDeleted) {
    if (rowsDeleted === 0) {
      res.status(404).json({
        'error': 'no subscription with that id found'
      });
    } else {
      res.status(204).send();
    }
  }).catch(function() {
    res.status(500).send();
  });
});

// app.put('/reviews/:id', function(req, res) {
//   var reviewId = parseInt(req.params.id, 10);
//   body = _.pick(req.body, 'name', 'phone_number', 'message');
//   var attributes = {};
//
//   if (body.hasOwnProperty('name') && _.isString(body.subscribed)) {
//     attributes.email = body.email;
//   }
//
//   if (body.hasOwnProperty('subscribed') && _.isBoolean(body.subscribed)) {
//     attributes.subscribed = body.subscribed;
//   }
//
//   db.subscription.findById(subscriptionId).then(function(subscription) {
//     if (subscription) {
//       return subscription.update(attributes);
//     } else {
//       res.status(404).send();
//     }
//   }, function() {
//     res.status(500).send();
//   }).then(function(subscription) {
//     res.json(subscription.toJSON());
//   }, function(error) {
//     res.status(400).json(error);
//   });
//
// });
















db.sequelize.sync({ force: false }).then(function() {
  app.listen(port, function() {
    console.log('server listening on port: ' + port);
  });
})
