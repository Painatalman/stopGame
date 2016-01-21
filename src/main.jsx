import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

import StopApp from './components/StopApp.jsx'

const middleware = process.env.NODE_ENV === 'production' ?
  [ thunk ] :
  [ thunk, logger() ]
const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore)
const store = createStoreWithMiddleware(reducer)

render(
  <Provider store={store}>
  <StopApp />
  </Provider>,
  document.getElementById('app')
);
