var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var _ = require('underscore');
var sendgrid = require('sendgrid')('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');
var path = require("path");

var db = require('./db.js');

// if running on Heroku, process.env.PORT will be Heroku-specific, if local, server will run on port 5000
var port = process.env.PORT || 5000;

app.use(bodyParser.json());

// render static template "board.html"
app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/board.html'));
});

// render static template "creative.html"
app.get('/creative',function(req,res){
  res.sendFile(path.join(__dirname+'/creative.html'));
});

// render static template "culinary.html"
app.get('/culinary',function(req,res){
  res.sendFile(path.join(__dirname+'/culinary.html'));
});

// handle new subscription creation
app.post("/subscription/new", function(req, res) {
  var body = _.pick(req.body, 'email');
  // needs to be replaced eventually by REGEX
  if (!_.isString(body.email) || body.email.trim().length === 0 || !_.contains(body.email, '@')) {
        res.status(400).json({"error": "The request body was not formatted correctly."});
  }

  body.email = body.email.trim().toLowerCase();

  // simple email template sent whenever a news subscription is created
  var email     = new sendgrid.Email({
    to      : body.email,
    from    : 'steakout.mailer@gmail.com',
    subject : 'Node Mailer Test',
    html    : '<h2>Welcome to the Steakout mailing list!</h2><p>If you would like to unsubscribe, please click the following <a href="https://www.npmjs.com/package/request">link</a></p>'
  });
  sendgrid.send(email, function(err, json) {
    if (err) { console.error(err); }
    console.log(json);
  });

  // create a row in the subscription table ("subscribed" attribute is true by default)
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

// sync database before starting server, "force: true" erases old database and creates clean database
db.sequelize.sync({ force: true }).then(function() {
  app.listen(port, function() {
    console.log('server listening on port: ' + port);
  });
})
