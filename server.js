var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var _ = require('underscore');
var sendgrid = require('sendgrid')('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');
var path = require("path");

var db = require('./db.js');
var port = process.env.PORT || 5000;


// code to connect React
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

app.use(express.static('./views'));

app.use(bodyParser.json());

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname, 'board.html'));
  //__dirname : It will resolve to your project folder.
});

app.get('/creative',function(req,res){
  res.sendFile(path.join(__dirname, 'creative.html'));
  //__dirname : It will resolve to your project folder.
});

app.get('/culinary',function(req,res){
  res.sendFile(path.join(__dirname, 'culinary.html'));
  //__dirname : It will resolve to your project folder.
});

app.get('/backoffice/subscriptions', function(req, res) {
  db.subscription.findAll().then(function(subscriptions) {
    var subscriptionArray = [];
    console.log(Array.isArray(subscriptionArray));
    for (var subscription in subscriptions) {
      if (subscriptions.hasOwnProperty(subscription)) {
        subscriptionArray.push(subscriptions[subscription].dataValues);

        // console.log('\t' + subscriptions[subscription].dataValues.id);
        // console.log('\t\t' + typeof(subscriptions[subscription].dataValues.id));
        // console.log('\t' + subscriptions[subscription].dataValues.email);
        // console.log('\t\t' + typeof(subscriptions[subscription].dataValues.email));
        // console.log('\t' + subscriptions[subscription].dataValues.subscribed);
        // console.log('\t\t' + typeof(subscriptions[subscription].dataValues.subscribed));
        // console.log('\t' + JSON.stringify(subscriptions[subscription].dataValues.createdAt));
        // console.log('\t\t' + typeof(JSON.stringify(subscriptions[subscription].dataValues.createdAt)));
        // console.log('\t' + JSON.stringify(subscriptions[subscription].dataValues.updatedAt));
        // console.log('\t\t' + typeof(JSON.stringify(subscriptions[subscription].dataValues.updatedAt)));
      }
    }
    console.log(subscriptionArray);
    console.log(Array.isArray(subscriptionArray));
    res.render('backoffice.jsx', {subscriptions: subscriptionArray});
  });
});

app.get('/subscriptions', function(req, res) {
  db.subscription.findAll().then(function(subscriptions) {
    res.send(subscriptions);
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
})

/* serves all the static files */
app.get(/^(.+)$/, function(req, res){
   console.log('static file request : ' + req.params);
   res.sendfile( __dirname + req.params[0]);
});


db.sequelize.sync({ force: false }).then(function() {
  app.listen(port, function() {
    console.log('server listening on port: ' + port);
  });
})
