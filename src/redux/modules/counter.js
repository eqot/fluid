/* @flow */
// ------------------------------------
// Constants
// ------------------------------------
export const COUNTER_INCREMENT = 'COUNTER_INCREMENT'
export const BLOCK_MOVE = 'BLOCK_MOVE'

import initialState from '../../../blocks.json'

// ------------------------------------
// Actions
// ------------------------------------
// NOTE: "Action" is a Flow interface defined in https://github.com/TechnologyAdvice/flow-interfaces
// If you're unfamiliar with Flow, you are completely welcome to avoid annotating your code, but
// if you'd like to learn more you can check out: flowtype.org.
// DOUBLE NOTE: there is currently a bug with babel-eslint where a `space-infix-ops` error is
// incorrectly thrown when using arrow functions, hence the oddity.
export function increment (value: number = 1): Action {
  return {
    type: COUNTER_INCREMENT,
    payload: value
  }
}

export function move (blocks, dx: number = 0, dy: number = 0): Action {
  return {
    type: BLOCK_MOVE,
    payload: {blocks, dx, dy}
  }
}

// This is a thunk, meaning it is a function that immediately
// returns a function for lazy evaluation. It is incredibly useful for
// creating async actions, especially when combined with redux-thunk!
// NOTE: This is solely for demonstration purposes. In a real application,
// you'd probably want to dispatch an action of COUNTER_DOUBLE and let the
// reducer take care of this logic.
export const doubleAsync = (): Function => {
  return (dispatch: Function, getState: Function): Promise => {
    return new Promise((resolve: Function): void => {
      setTimeout(() => {
        dispatch(increment(getState().counter))
        resolve()
      }, 200)
    })
  }
}

export const actions = {
  increment,
  move,
  doubleAsync
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [COUNTER_INCREMENT]: (state: number, action: {payload: number}): number => state + action.payload,

  [BLOCK_MOVE]: (state, { payload }) => {
    let blockUids = []
    payload.blocks.forEach((block) => {
      blockUids.push(block.props.uid)
    })

    const blocks = state.blocks.map((block) => {
      if (blockUids.indexOf(block.uid) >= 0) {
        block.x += payload.dx
        block.y += payload.dy
      }

      return block
    })

    return {
      ...state,
      blocks
    }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
// const initialState = 0
export default function counterReducer (state: number = initialState, action: Action): number {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
