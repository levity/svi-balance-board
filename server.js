var connect = require('connect'),
  fs = require('fs'),
  socketIO = require('socket.io'),
  jspack = require('./lib/node-jspack/jspack').jspack,
  express = require('express'),
  osc = require('./lib/osc')
  
// handle regular http stuff
var app = express.createServer();
  
app.configure(function() {
  app.set('views', __dirname + '/views');
  app.use(express['static'](__dirname + '/static'));
});

app.get('/', function(req, res, next) {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  fs.readFile('./views/index.html', 'utf8', function (err, html) {
    res.end(html);
  });
});

app.listen(8081);

var io = socketIO.listen(app);

// socket.io, I choose you
io.sockets.on('connection', function(socket) {
  
  // prepare listening socket
  var dgram = require('dgram'),
    osc_serv = dgram.createSocket('udp4')

  // parse the message from Osculator client
  // not really doing any determination via OSC spec
  // just dumb-parsing the buffer
  osc_serv.on('message', function (msg, a) {
    var val = osc.decode(msg);
    json = JSON.stringify(val);
    socket.send(json);
  })

  // listen for incoming messages from Osculator client
  // be sure to set port and IP address to where your
  // Osculator client routes OSC messages.
  // Don't use default values.
  osc_serv.bind(60000, '10.22.35.95')

});