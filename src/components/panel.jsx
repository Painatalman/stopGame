import React, {Component} from 'react';

import ChatForm from './ChatForm';
import GameForm from './GameForm';

export default class Panel extends Component {
  render() {
    return (
      <div id='Panel' className='Panel-wrapper'>
        <ChatForm />
        <GameForm />
      </div>
    )
  }
}


