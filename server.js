var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var _ = require('underscore');
var sendgrid = require('sendgrid')('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');
var path = require("path");

var db = require('./db.js');
var port = process.env.PORT || 3000;

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.set('views', __dirname + '/views');

app.use(bodyParser.urlencoded({
  extended: true
}));

// app.use(bodyParser.json());

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname, 'board.html'));
});

app.get('/creative',function(req,res){
  res.sendFile(path.join(__dirname, 'creative.html'));
});

app.get('/culinary',function(req,res){
  res.sendFile(path.join(__dirname, 'culinary.html'));
});

app.get('/trucks',function(req,res){
  res.sendFile(path.join(__dirname, 'truck_main.html'));
});

app.get('/subscription_success',function(req,res){
  res.sendFile(path.join(__dirname, 'subscription_success.html'));
});

app.get('/backoffice', function(req, res) {
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
    res.render('backoffice.html', {subscriptionArray});
  });
});

app.get('/backoffice/showsubscribed', function(req, res) {
  db.subscription.findAll({where: {subscribed: true}}).then(function(subscriptions) {
    var subscriptionArray = [];
    console.log(Array.isArray(subscriptionArray));
    for (var subscription in subscriptions) {
      if (subscriptions.hasOwnProperty(subscription)) {
        subscriptionArray.push(subscriptions[subscription].dataValues);
      }
    }
    console.log(subscriptionArray);
    console.log(Array.isArray(subscriptionArray));
    res.render('backoffice.html', {subscriptionArray});
  });
});

app.get('/backoffice/showunsubscribed', function(req, res) {
  db.subscription.findAll({where: {subscribed: false}}).then(function(subscriptions) {
    var subscriptionArray = [];
    console.log(Array.isArray(subscriptionArray));
    for (var subscription in subscriptions) {
      if (subscriptions.hasOwnProperty(subscription)) {
        subscriptionArray.push(subscriptions[subscription].dataValues);
      }
    }
    console.log(subscriptionArray);
    console.log(Array.isArray(subscriptionArray));
    res.render('backoffice.html', {subscriptionArray});
  });
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

  console.log("\n\n\n\n");
  console.log(req.body);
  console.log("\n\n\n\n");

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
      res.redirect('/subscription_success');
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
  console.log(subscriptionId);
  console.log(req.body);
  var body = _.pick(req.body, 'email', 'subscribed');
  console.log(body);
  var attributes = {};

  if (body.hasOwnProperty('email')) {
    attributes.email = body.email;
    console.log("I was!: " + attributes.email);
  }

  if (body.hasOwnProperty('subscribed') && _.isBoolean(body.subscribed)) {
    attributes.subscribed = body.subscribed;
    console.log("I was triggered!: " + attributes.subscribed);
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

app.post('/backoffice/subscription/new', function(req, res) {
  var body = _.pick(req.body, 'email');

  if (!_.isString(body.email) || body.email.trim().length === 0 || !_.contains(body.email, '@')) {
        res.status(400).json({"error": "The request body was not formatted correctly."});
  }

  body.email = body.email.trim().toLowerCase();

  db.subscription.findOrCreate({where: {email: body.email}}).spread(function(subscription, created) {
    console.log(subscription.get({
      plain: true
    }));
    console.log('was created below?');
    console.log(created)
    if (created) {
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
    }

    if (subscription) {
      res.redirect('/backoffice');
    } else {
      res.status(500).send();
    }

  }).catch(function(error) {
    res.status(500).send();
  });
});

app.post('/test', function(req, res) {
  var email     = new sendgrid.Email(
    {
      to      : 'steakout.mailer@gmail.com',
      from    : 'steakout.mailer@gmail.com',
      subject : 'Node Mailer Test',
      html    : req.body.sendEmail
    }
  );
  db.subscription.findAll({where: {subscribed: true}}).then(function(subscriptions) {
    var subscriptionArray = [];
    console.log(Array.isArray(subscriptionArray));
    for (var subscription in subscriptions) {
      if (subscriptions.hasOwnProperty(subscription)) {
        subscriptionArray.push(subscriptions[subscription].dataValues);
      }
    }
    console.log(subscriptionArray);
    for (var i = 0; i < subscriptionArray.length; i++) {
      // console.log(subscriptionArray[i].email);
      email.addTo(subscriptionArray[i].email);
    }
    console.log(Array.isArray(subscriptionArray));
    sendgrid.send(email, function(err, json) {
      if (err) { console.error(err); }
      console.log(json);
    });
    console.log('this should execute');
    res.render('backoffice.html', {subscriptionArray});
  });

  console.log(req.body.sendEmail);
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

db.sequelize.sync({ force: false }).then(function() {
  app.listen(port, function() {
    console.log('server listening on port: ' + port);
  });
})
