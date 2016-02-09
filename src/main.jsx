import React from 'react';
import { render } from 'react-dom';

import StopApp from './components/StopApp.jsx';;

// TODO: try changing to let or even const later on
var socket = io();

render(
  <StopApp socket={socket}/>,
  document.getElementById('app')
);
