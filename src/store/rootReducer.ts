import { combineReducers } from '@reduxjs/toolkit';

import gameReducer from './gameSlice';
import authenticationReducer from './authenticationSlice';

const rootReducer = combineReducers({
  game: gameReducer,
  authentication: authenticationReducer,
});

export default rootReducer;
