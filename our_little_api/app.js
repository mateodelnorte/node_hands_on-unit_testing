
var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/funk', function (req, res) {
  res.send({ YouGotThe: 'funk' }); 
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("started our_little_api server listening on port " + app.get('port'));
});
