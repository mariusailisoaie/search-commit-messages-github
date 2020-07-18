import { combineReducers } from 'redux';

import commitsReducer from './commitsReducer';
import rateLimitReducer from './rateLimitReducer';

const rootReducer = combineReducers({
  commits: commitsReducer,
  rateLimit: rateLimitReducer,
});

export default rootReducer;
