var Timer = require('../src/timerjs/Timer');

var
  gameTurnTime = {
    hours: 0,
    minutes: 1,
    seconds: 0,
    milliseconds: 0
  },
  gameTimer,
  gameOptions,
  playerPlays,
  letterOptions = "abcdefghijklmnopqrstuvwxyz",
  currentLetter;

module.exports = function(io) {

  io.on('connection', function(socket) {
    console.log('a user connected');
    console.log(socket.id);
    io.emit('chat message', socket.id + "is now online!");

    socket.on('disconnect', function() {
      console.log('user disconnected');
      io.emit('chat message', socket.id + "is now offline!");
    });

    socket.on('chat message', function(msg) {
      console.log(msg);
      console.log('message: ' + msg);
      io.emit('chat message', this.id + " said: " + msg);
    });

    socket.on('game result', function(msg) {
      console.log(socket.id + " played ");
      console.log(msg);

      // add player to the message
      msg.player = socket.id;

      // TODO: evaluate results

      for (parameter in msg) {
        console.log("\t - " + parameter + ": " + msg[parameter]);
      }

      io.emit('game result', msg);
    })

    socket.on('game start', function(msg) {
      // start Timeout object
      if (!gameTimer) {
        gameTimer = new Timer({
          callback: function gameFinish() {
            console.log("GAME END!");

            // destroy timer
            gameTimer = undefined;

            io.emit('game end');
          },
          interval: {
            hours: 0,
            minutes: 0,
            seconds: 1,
            milliseconds: 0
          },
          duration: {
            hours: 0,
            minutes: 2,
            seconds: 2,
            milliseconds: 0
          },
          intervalCallback: function intervalCallback() {
            io.emit('game status', {
              time: gameTimer.getTimeLeftAsText()
            });
          },
          debug: true
        });
      }

      // check if game is already going
      if (gameTimer.isCleared()) {
        console.log("GAME ON!");

        letter = letterOptions[Math.floor(Math.random() * letterOptions.length)];

        gameTimer.start();

        io.emit('game start', {
          letter: letter,
          gameTurnTime: gameTurnTime
        })
      }
      // send current game data if there is already a game running
      else {
        console.log("game already started");

        io.to(socket.id).emit('game already started', {
          'letter': letter,
        });
      }
    });

    socket.on('game end', function(msg) {
      console.log("player " + socket.id + " played: " + msg);
      io.emit('game result', {
        results: msg
      });
    });

  });
}
