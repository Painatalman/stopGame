import React, {Component} from 'react';

import './logscreen.css';
import LogMessage from './LogMessage';

export default class LogScreen extends Component {
  render() {
    return (
      <ul id='LogScreen' className='LogScreen-wrapper'>
        <LogMessage />
      </ul>
    )
  }
}


