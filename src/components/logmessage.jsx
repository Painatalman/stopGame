import React, {Component} from 'react';


export default class LogMessage extends Component {
  render() {
    return (
      <div className={`log__message log__message--${this.props.type}`} >
        {this.props.message}
      </div>
    )
  }
}
