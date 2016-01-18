'use strict';

import React from 'react';
import './StopApp.css';

export default class StopApp extends React.Component {
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
    // The second parameter is an object of attributes for the element (if any)
    return <div className="StopApp-wrapper">
      Something something Dark Side
      </div>;
  }
};
