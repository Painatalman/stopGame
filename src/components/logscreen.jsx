import React, {Component} from 'react';

import './logscreen.css';
import LogMessage from './logmessage.jsx';

export default class LogScreen extends Component {

  render() {
    return (
      <ul id='LogScreen' className='LogScreen-wrapper'>
      {
        this.props.messages.map(function (message, iterator){
          return <LogMessage message={message.message} type={message.type} key={iterator}/>
        })
      }
      </ul>
    )
  }
}
