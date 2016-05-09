var express = require('express');
var app = express();
var path = require("path");
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname, 'test.html'));
});

app.post('/getemail',function(req,res){
  console.log(req.body);
  res.send({ status: 'SUCCESS' });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
