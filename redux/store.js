import { createStore, applyMiddleware } from 'redux';
import { combineReducers } from 'redux';
import thunk from 'redux-thunk';

import friends from './reducers/friends';
import user from './reducers/user';

const combinedReducers = combineReducers({
  friends,
  user,
});

const store = createStore(combinedReducers, applyMiddleware(thunk));

export { store };
