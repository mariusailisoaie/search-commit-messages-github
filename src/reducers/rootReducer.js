import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import commitsReducer from './commitsReducer';
import rateLimitReducer from './rateLimitReducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['commits']
}

const rootReducer = combineReducers({
  commits: commitsReducer,
  rateLimit: rateLimitReducer,
});

export default persistReducer(persistConfig, rootReducer);
