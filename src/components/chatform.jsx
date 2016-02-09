import React, {Component} from 'react';

export default class ChatForm extends Component {
  constructor(props) {
    super(props);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(event.target.message.value);
  }

  render() {
    return (
      <form id='ChatForm' onSubmit={this.handleSubmit.bind(this)} className="chat-form panel-form">
        <input autoComplete="off" name="message" className="panel-form__input panel-form__input--message"></input>
        <button className="panel-form__button">Send</button>
      </form>
    )
  }
}
