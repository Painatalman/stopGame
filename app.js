var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();
var server = require('http').Server(app);

// HELPERS
var Timeout = require('./scripts/helpers/commonjs/Timeout');


app.io = require('socket.io')(server, {log: true});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

/**
* GAME OPTIONS
*/
var
  gameTurnTime =  1000 * 10 * 1,
  gameTimer,
  gameOptions,
  playerPlays,
  letterOptions = "abcdefghijklmnopqrstuvwxyz",
  currentLetter;

app.io.on('connection', function(socket){
  console.log('a user connected');
  console.log(socket.id);
  app.io.emit('chat message', socket.id + "is now online!");

  socket.on('disconnect', function(){
    console.log('user disconnected');
    app.io.emit('chat message', socket.id + "is now offline!");
  });

  socket.on('chat message', function(msg){
    console.log(msg);
    console.log('message: ' + msg);
    app.io.emit('chat message', this.id + " said: "+msg);
  });

  socket.on('game result', function(msg){
    console.log(socket.id + " played ");
    console.log(msg);

    // add player to the message
    msg.player = socket.id;

    // TODO: evaluate results

    for (parameter in msg) {
      console.log("\t - "+ parameter+": "+msg[parameter]);
    }

    app.io.emit('game result', msg);
  })

  socket.on('game start', function(msg){
    // start Timeout object
    if (!gameTimer) {
      gameTimer = new Timeout(function gameFinish(){
        console.log("GAME END!");

        // destroy timer
        gameTimer = undefined;

        app.io.emit('game end');
      }, gameTurnTime);
    }

    // check if game is already going
    if (gameTimer.isCleared()){
      console.log("GAME ON!");

      letter = letterOptions[Math.floor(Math.random() * letterOptions.length)];

      gameTimer.start();

      app.io.emit('game start', {
        letter: letter,
        gameTurnTime: gameTurnTime
      })
    }
    // send current game data if there is already a game running
    else {
      console.log("game already started");

      app.io.to(socket.id).emit('game already started', {
        'letter': letter,
      });
    }
  });


  socket.on('game end', function(msg){
    console.log("player "+socket.id+" played: "+msg);
    app.io.emit('game result', {
      results: msg
    });
  });



});


// module.exports = app;

// #!/usr/bin/env node
// var debug = require('debug')('my-application');

app.set('port', process.env.PORT || 3000);

server.listen(app.get('port'), function() {
  console.log('Express server listening on port something');
});
