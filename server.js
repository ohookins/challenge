// UUID function
var uuid = require(__dirname+'/uuid.js');

// Pull in modules and set up main objects
var express = require('express');
var app = express();
var formidable = require('formidable'),
    util = require('util');
var $ = require('jQuery');

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

// Return the current progress of an upload
app.get('/progress/:id', function(req, res) {
  console.log("Requested progress for upload " + req.params.id);
  if (uploads[req.params.id] == undefined) {
    res.send(404);
  } else {
    res.json(uploads[req.params.id]);
  }
});

// Accept an upload
app.post('/upload/:id', function(req, res) {
  var form = new formidable.IncomingForm();
  form.keepExtensions = true;

  req.on('data', function() {
    // This doesn't give absolutely accurate results, but it is close enough.
    uploads[req.params.id] = {
                               'received': form.bytesReceived,
                               'total':    form.bytesExpected,
                               'percent':  (form.bytesReceived/form.bytesExpected)*100 + "%"
                             };
  });

  form.parse(req, function() {
    res.send(201);
    delete uploads[req.params.id];
  });
  /*
  form.parse(req, function(err, fields, files) {
    res.send(201);
    console.log(util.inspect({fields: fields, files: files}));
  });
  */
});

// Log uploads every second
var uploadLogger = function() {
  $.each(uploads, function(upload, fields) {
    console.log("Upload: " + upload + ": " + fields['received'] + " of " + fields['total']);
  });
}
setInterval(uploadLogger, 1000);

// Start up the server
console.log('express listening on 9090');
app.listen(9090);
