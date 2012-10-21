// UUID function
var uuid = require(__dirname+'/uuid.js');

// Pull in modules and set up main objects
var express = require('express');
var app = express();
var formidable = require('formidable'),
    util = require('util');

// Upload tracking
var uploads = {};

// Set up locations, middleware and templating
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

// Accept an upload
app.post('/upload', function(req, res) {
  var form = new formidable.IncomingForm();
  form.keepExtensions = true;

  req.on('data', function() {
    // This doesn't give absolutely accurate results, but it is close enough.
    console.log("Received " + form.bytesReceived + " bytes of " + form.bytesExpected);
  });

  form.parse(req, function(err, fields, files) {
    res.send(200);
    console.log(util.inspect({fields: fields, files: files}));
  });
});

console.log('express listening on 9090');
app.listen(9090);
