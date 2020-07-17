import { combineReducers } from 'redux';

import commitsReducer from './commitsReducer';

const rootReducer = combineReducers(
  { commits: commitsReducer, }
)

export default rootReducer;
