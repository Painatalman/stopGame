// ACTION TYPES
export const REQUEST_START_GAME = 'REQUEST_START_GAME'
export const START_GAME = 'START_GAME'
export const END_GAME = 'END_GAME'
export const SHOW_GAME_STATUS = 'SHOW_GAME_STATUS'
export const SHOW_GAME_RESULT = 'SHOW_GAME_RESULT'

// ACTION CREATORS
// https://github.com/happypoulp/redux-tutorial/blob/master/01_simple-action-creator.js
export function requestStartGameCreator(message) {
  return {
    type: REQUEST_START_GAME
  }
}
export function endGameCreator() {
  return {
    type: END_GAME
  }
}
export function startGameCreator(gameStatus) {
  return {
    type: START_GAME,
    gameStatus
  }
}
export function showGameStatus(gameStatus) {
  return {
    type: SHOW_GAME_STATUS,
    gameStatus
  }
}
export function showGameResult(gameResult) {
  return {
    type: SHOW_GAME_RESULT,
    gameResult
  }
}