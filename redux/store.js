import { createStore, applyMiddleware } from 'redux'
import { combineReducers } from 'redux'
import thunk from 'redux-thunk'

import friends from './reducers/friends'
const combinedReducers = combineReducers({
  friends: friends,
})

const store = createStore(
  combinedReducers,
  applyMiddleware(thunk)
)

export { store }