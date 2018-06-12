var request = require('request');
var jwt = require('jsonwebtoken');
var config = require('./config');
var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());


app.post('/api/v1/users/sts', function (req, res, next) {
  var identity = req.body.identity;
  var clientId = req.body.clientId;
  var clientSecret = config.credentials[clientId];
  console.info("clientSecret is: " + clientSecret);
  var isAnonymous = req.body.isAnonymous || false;
  var aud = req.body.aud || "https://idproxy.kore.com/authorize";
  var options = {
    "iat": new Date().getTime(),
    "exp": new Date(new Date().getTime() + 24 * 60 * 60 * 1000).getTime(),
    "aud": aud,
    "iss": clientId,
    "sub": identity,
    "isAnonymous": isAnonymous
  }
  var token = jwt.sign(options, clientSecret);
  res.header("Access-Control-Allow-Origin", "*");
  res.send({
    "jwt": token
  });
});


app.get('/', (req, res) => {
  console.info(req.body);
  res.json({
    "message": "I am running"
  });
});


app.listen(port);


console.log('Proxy API server started on: ' + port);