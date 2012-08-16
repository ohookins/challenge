var http = require('http');
var server = http.createServer();
var bytes = 0;
var timerID = 0;

var streamData = function (data) {
  bytes += data.length;
};

var printInfo = function() {
  console.log(bytes + " bytes received");
};

var endReq = function() {
  console.log(bytes + " bytes received by " + Math.round(Date.now()/1000));
  bytes = 0;
  clearInterval(timerID);
};

var handleReq = function (request, response) {
  timerID = setInterval(printInfo, 1000);
  request.on('data', streamData);
  request.on('end', endReq);
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.end('Hello World\n');
};

server.on('request', handleReq);

server.listen(8080)

console.log('Server running at http://127.0.0.1:8080/');
