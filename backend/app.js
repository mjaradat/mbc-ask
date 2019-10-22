const fs = require('fs');
const https = require('https');
const http = require('http');
const WebSocket = require('ws');

const server = http.createServer();
const wss = new WebSocket.Server({ server });
console.log(http)


// wss.on('connection', function connection(ws) {
//   ws.on('message', function incoming(message) {
//     console.log('received: %s', message);
//   });

//   ws.send('something');
// });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(data) {
    console.log("client => ", data)
    console.log(wss)
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });
});

server.listen(1337);

// */


/*

var WebSocketServer = require('websocket').server;
var http = require('http');

var server = http.createServer(function (request, response) {
  // process HTTP request. Since we're writing just WebSockets
  // server we don't have to implement anything.
});
server.listen(1337, function () { });

// create the server
wsServer = new WebSocketServer({
  httpServer: server
});

// WebSocket server
wsServer.on('request', function (request) {
  // console.log("request", request)
  var connection = request.accept(null, request.origin);
  
  // This is the most important callback for us, we'll handle
  // all messages from users here.
  connection.on('message', function (message) {
    console.log(message)
    if (message.type === 'utf8') {
      // process WebSocket message
    }
    console.log(wsServer)


    // wss.clients.forEach(function each(client) {
    //   if (client !== ws && client.readyState === WebSocket.OPEN) {
    //     client.send(data);
    //   }
    // });
  });

  connection.on('close', function (connection) {
    console.log("closed")
  });
});

// */