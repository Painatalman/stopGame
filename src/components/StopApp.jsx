'use strict';

import React, {Component} from 'react';
import LogScreen from './logscreen.jsx';
import ChatForm from './chatform.jsx';
import GameForm from './gameform.jsx';

import './stopapp.css';
// import MessageStore from '../state.js';
// import {doSomething, addMessage} from '../actions/messageactions.js';

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

// socket.on('game status', function(msg){
//   document.getElementById("game-timer").innerText = msg.time;
// });

// received a game result
// socket.on('game result', function(msg){
//   console.log("received", msg);
//
//   var playerStatsMessage = "";
//   for (property in msg) {
//     if (property === "player") {
//       playerStatsMessage = msg[property] +": " + playerStatsMessage;
//     }
//     else {
//       playerStatsMessage += " | " + msg[property] + "(" + property + ")";
//     }
//   }
//   displayMessage(messageDisplayNode, playerStatsMessage, "alert");
// })

// for now, this will be the default state manager
export default class StopApp extends Component {
  // THIS WILL BE THE GLOBAL STATE OF THE WHOLE APP

  componentDidMount() {
    // when the assignment store says its data changed, we update
    // MessageStore.onChange = this.onChange;
  }

  onChange() {
    // this.setState(this.getStateFromStore());
  }

  constructor(props) {
    super(props);

  }
  // initializer
  componentWillMount() {

      this.setState({
          messages: [],
          limit: 0,
          gameStatus: {
              running: false,
              letter: '',
              timeLeft: '0'
          }
        });

      this.props.socket.on('chat message', (msg) => {
        this.addMessage({message:msg, type:'regular'});
       });
      this.props.socket.on('game start', (msg) => {
        this.addMessage({message:"Game started with letter " + msg.letter, type:"alert"});
      });
      this.props.socket.on('game end', (msg) => {
        // SEND INPUTS
        this.addMessage({message:"Game end", type:"alert"});

        const
          playerData = {},
          parameters = document.querySelectorAll('input[data-game]');

          [].forEach.call(parameters, function(el) {
            playerData[el.dataset.game] = el.value;
          });

        // console.log("sending data", playerData);

        this.props.socket.emit('game result', playerData);
      });
  }
  resetMessages() {
        this.setState({messages: []});
  }
  addMessage(message) {
    let messages = this.state.messages;
    messages.push(message);

    this.setState({messages:messages});
  }
  requestNewMessage(messageText) {
    this.props.socket.emit('chat message', messageText);
  }
  requestNewGame() {
    this.props.socket.emit('game start');
  }
  render() {
    return (
      <div id='StopApp' className="StopApp-wrapper">
        <LogScreen messages={this.state.messages}/>

        <div id='Panel' className='Panel-wrapper'>
          <ChatForm onSubmit={this.requestNewMessage.bind(this)} />
          <GameForm onSubmit={this.requestNewGame.bind(this)} />
        </div>
      </div>
    )
  }
}
