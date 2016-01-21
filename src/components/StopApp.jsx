'use strict';

import React, {Component} from 'react';
import LogScreen from './log';
import './stopapp.css';
import Panel from './panel';

export default class StopApp extends Component {
  constructor(props) {
    super(props);
    // THIS WILL BE THE GLOBAL STATE
    this.state = {
      messages: [],
      filteredBy: "NONE",
      limit: 0
    }
  }  
  resetMessages() {
        this.setState({messages: []});
  }
  render() {
    return (
      <div id='StopApp' className="StopApp-wrapper">
        StopApp
        <LogScreen />
        <Panel />
      </div>
    )
  }
}