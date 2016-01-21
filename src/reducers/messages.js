import { ADD_MESSAGE, CLEAR_MESSAGES } from '../actions/messages'

const initialState = [];

export default function messages(state = initialState, action) {
  switch (action.type) {
    case ADD_MESSAGE:
      return [... state, action.message]
    case CLEAR_MESSAGES:
      return []
    default:
      return state
  }
}

export function getMessages(state) {
    return state
}