
/**
 * Module dependencies.
 */

var debug = false;

var express = require('express')
  , routes = require('./routes')
  , index = require('./routes/index')
  , reports = require('./routes/reports')
  , dashboard = require('./routes/dashboard')
  , form = require('./routes/form')
  , geo = require('./routes/geo')
  , path = require('path')
  , mongoose = require('mongoose')
  , fs = require('fs')
  
var app = express()
  , http = require('http')
  , server = http.createServer(app)
  , io = require('socket.io').listen(server);

// MongoDB
//mongoose.connect('mongodb://nodejitsu:a66410a8c7b55a0e240075bdf8411dc6@alex.mongohq.com:10062/nodejitsudb467066459176');
mongoose.connect('mongodb://localhost:27017/test');

Schema = mongoose.Schema;

// DB Schema  
RatingObj = new Schema({
    badge: String,
    rating: String,
    comment: String,
    location: {},
    coords: {long: Number, lat: Number}
});

RatingObj.statics.findNearStatic = function(coords, cb) {
  this.find({coords: {$nearSphere: coords, $maxDistance: 5}}, cb);
}

RatingObj.statics.findAllStatic = function(cb) {
  this.find("", cb);
}

Rating = mongoose.model('Rating', RatingObj);



app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', index.display);
app.get('/api/reports', reports.list);
app.get('/dashboard', dashboard.display);
app.get('/form', form.form);
app.post('/form', form.submit);
app.post('/geo', geo.findNearby);
app.get('/geo', geo.findAll);

if (debug) {
var request = require('request');
request.post({
  url: 'http://localhost:3000/form',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    badge: 419,
    rating: 5,
    comment: "Cop directed traffic at broken spotlight for 6 straight hours.",
    coords: {long: -122.2719461 , lat: 37.8052615}
  })
}, function(error, response, body){
  console.log(body);
});
};
http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});



