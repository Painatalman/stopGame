// ACTION TYPES
export const ADD_MESSAGE = 'ADD_MESSAGE'
export const CLEAR_MESSAGES = 'CLEAR_MESSAGES'

// ACTION CREATORS
// https://github.com/happypoulp/redux-tutorial/blob/master/01_simple-action-creator.js
export function addMessageCreator(message) {
  return {
    type: ADD_MESSAGE,
    message
  }
}
export function clearMessagesCreator() {
  return {
    type: CLEAR_MESSAGES
  }
}

export function addMessage() {
  return (dispatch, getState) => {
    const { counter } = getState()

    if (counter % 2 === 0) {
      return
    }

    dispatch(increment())
  }
}

export function incrementAsync(delay = 1000) {
  return dispatch => {
    setTimeout(() => {
      dispatch(increment())
    }, delay)
  }
}