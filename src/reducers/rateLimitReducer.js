import RateLimitActionTypes from '../actions/actionTypes/rateLimitActionTypes';

const INITIAL_STATE = {
  rateLimit: null,
  error: null,
}

const rateLimitReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RateLimitActionTypes.FETCH_RATE_LIMIT_START:
      return {
        ...state,
      }
    case RateLimitActionTypes.FETCH_RATE_LIMIT_SUCCESS:
      return {
        ...state,
        rateLimit: action.payload,
        error: null,
      }
    case RateLimitActionTypes.FETCH_RATE_LIMIT_FAILURE:
      return {
        ...state,
        error: action.payload,
      }
    default:
      return state;
  }
}

export default rateLimitReducer;
