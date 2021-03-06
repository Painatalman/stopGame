var
  socket = io(),
  messageDisplayNode = document.getElementById('messages');

function displayMessage(messageDisplayNodeList, message, messageTypeClass) {
  var messageNode = document.createElement('li');

  messageNode.classList.add('log__message');

  if (messageTypeClass) {
    messageNode.classList.add(messageTypeClass);
  }
  else {
    // just a text message
    messageNode.classList.add('log__message--text');
  }

  messageNode.innerText = message;

  messageDisplayNodeList.appendChild(messageNode);
}

socket.on('chat message', function(msg) {

  displayMessage(messageDisplayNode, msg);

});

document.getElementById("chat-form").addEventListener('submit', function(e) {
  e.preventDefault();

  var messageNode = document.getElementById("m");

  socket.emit('chat message', messageNode.value);
  messageNode.value = '';

});

socket.on('game start', function(msg) {
  displayMessage(messageDisplayNode, "Game started with letter " + msg.letter, "log__message--alert");
});

socket.on('game end', function(msg) {
  // SEND INPUTS
  displayMessage(messageDisplayNode, "Game end", "alert");

  var
    playerData = {},
    parameters = document.querySelectorAll('input[data-game]');

    [].forEach.call(parameters, function(el) {
      playerData[el.dataset.game] = el.value;
    });

  console.log("sending data", playerData);

  socket.emit('game result', playerData);
});

socket.on('game status', function(msg){
  document.getElementById("game-timer").innerText = msg.time;
});

// received a game result
socket.on('game result', function(msg){
  console.log("received", msg);

  var playerStatsMessage = "";
  for (property in msg) {
    if (property === "player") {
      playerStatsMessage = msg[property] +": " + playerStatsMessage;
    }
    else {
      playerStatsMessage += " | " + msg[property] + "(" + property + ")";
    }
  }
  displayMessage(messageDisplayNode, playerStatsMessage, "alert");
})

document.getElementById("game-form").addEventListener('submit', function(e) {
  e.preventDefault();

  var messageNode = document.getElementById("m");

  socket.emit('game start');

});
