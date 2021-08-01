import { combineReducers } from '@reduxjs/toolkit';

import categoryReducer from './categorySlice';

const rootReducer = combineReducers({
  category: categoryReducer,
});

export default rootReducer;
