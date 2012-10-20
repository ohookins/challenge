// UUID function
var uuid = require(__dirname+'/uuid.js');

// Templating and routing
var express = require('express');
var app = express();

// Upload tracking
var uploads = {};

// Set up locations and templating
app.use(express.static(__dirname+'/assets'));
app.set('views', 'views');
app.set('view engine', 'jade');
app.locals.pretty = true;

// Index page with upload form
app.get('/', function(req, res) {
  res.render('index', { title: 'Upload Page' }, function(err, html) {
    if (err) {
      console.log(err);
      res.send(500, 'Something broke!');
    } else {
      res.send(html);
    }
  });
  console.log('rendered index');
});

// Get an upload "ticket"
app.get('/ticket', function(req, res) {
  var ticket = uuid.createUUID();
  res.json(ticket);
  console.log('Gave ticket ' + ticket);
});

app.post('/upload', function(req, res) {
  console.log("received upload");

  req.on('data', function() {
    uploads['foo'] = 0;
  });

  console.log(uploads);
  res.send(200);
});

console.log('express listening on 9090');
app.listen(9090);
