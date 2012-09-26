
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , reports = require('./routes/reports')
  , http = require('http')
  , path = require('path')
  , mongoose = require('mongoose')
  , fs = require('fs')
  , socket = require('socket.io');
  
var app = express();

io = socket.listen(app);

// MongoDB
mongoose.connect('mongodb://localhost:27017/test');
  
Schema = mongoose.Schema;

// DB Schema  
RatingObj = new Schema({
    badge: String,
    rating: String,
    comment: String,
    location: {},
    coord: {}
});
  
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

app.get('/', routes.index);
app.get('/api/reports', reports.list);
app.get('/dashboard', routes.dashboard);
app.put('/api/rating', routes.submit);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});


