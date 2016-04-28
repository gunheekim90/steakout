var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var _ = require('underscore');
var sendgrid = require('sendgrid')('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');
var path = require("path");

var db = require('./db.js');
var port = process.env.PORT || 5000;

app.use(bodyParser.json());

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/board.html'));
  //__dirname : It will resolve to your project folder.
});

app.get('/creative',function(req,res){
  res.sendFile(path.join(__dirname+'/creative.html'));
  //__dirname : It will resolve to your project folder.
});

app.get('/culinary',function(req,res){
  res.sendFile(path.join(__dirname+'/culinary.html'));
  //__dirname : It will resolve to your project folder.
});

app.post("/subscription/new", function(req, res) {
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

/*serves all the static files */
app.get(/^(.+)$/, function(req, res){
   console.log('static file request : ' + req.params);
   res.sendfile( __dirname + req.params[0]);
});


db.sequelize.sync({ force: true }).then(function() {
  app.listen(port, function() {
    console.log('server listening on port: ' + port);
  });
})
