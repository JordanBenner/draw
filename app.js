var express = require('express');
var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);

app.set('view engine', 'hbs');
app.use('/static', express.static('public'));

app.get('/', function (request, response) {
  response.render('index.hbs');
});

io.on('connection', function (client) {
  console.log('Connected', client.id);

  client.on('disconnect', function () {
    console.log('EXITED', client.id);
  });

  client.on('draw-line', function (msg) {
    console.log(msg);
    io.emit('line-broadcast', msg);
  });
});

http.listen(9000, function () {
  console.log('Listening on port 9000');
});

//calling api
var express = require('express');
var chargebee = require("chargebee");
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

chargebee.configure({site : "<<site_name>>",
  api_key : "<<api_key>>"
};
