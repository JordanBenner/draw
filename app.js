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

//register click event

$(document).ready(function(){

    function parallax(){
        var prlx_effect_1= -((window.pageYOffset / 4) *2.25 );
        $('.prlx-1').css({"position": "relative","bottom":prlx_effect_1, "transition": "0s ease-in-out"});
           // jQ('.prlx-1').css({"position": "relative"});
           // jQ('.prlx-1').animate({"bottom":prlx_effect_1},"fast");

        var prlx_effect_2= -(window.pageYOffset / 5 );
        $('.prlx-2').css({"position": "relative","bottom":prlx_effect_2, "transition": "0s ease-in-out"});

    }

    window.addEventListener("scroll", parallax, false);

});
