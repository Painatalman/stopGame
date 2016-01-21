import { REQUEST_START_GAME, START_GAME, END_GAME, SHOW_GAME_STATUS, SHOW_GAME_RESULT } from '../actions/game'

const initialState = void 0;

export default function game(state = initialState, action) {
  switch (action.type) {
    case SHOW_GAME_STATUS:
     return action.gameStatus;
    default:
      return state;
  }
}

export function getMessages(state) {
    return state.messages
}