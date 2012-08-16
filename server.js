var http = require('http');
var server = http.createServer();
var bytes = 0;
var now = 0;

var time = function() {
  Math.round(Date.now()/1000);
}

var streamData = function (data) {
  bytes += data.length;
};

var endReq = function() {};

var handleReq = function (request, response) {
  request.on('data', streamData);
  request.on('end', endReq);
  request.setEncoding('utf8');
  switch (request.method) {
    case 'GET': {
      response.writeHead(200, {'Content-Type': 'text/plain'});
      response.end(Math.round(bytes/1024) + " Kbytes received\n");
      break;
    }
    case 'POST': {
      bytes = 0;
      now = time();
      response.writeHead(201);
      response.end();
      break;
    }
  }
};

server.on('request', handleReq);

server.listen(8080)

console.log('Server running at http://127.0.0.1:8080/');
