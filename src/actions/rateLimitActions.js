import RateLimitActionTypes from './actionTypes/rateLimitActionTypes';

import axios from 'axios';

export const fetchRateLimitStart = () => ({
  type: RateLimitActionTypes.FETCH_RATE_LIMIT_START,
});

export const fetchRateLimitSuccess = rateLimit => ({
  type: RateLimitActionTypes.FETCH_RATE_LIMIT_SUCCESS,
  payload: rateLimit,
});

export const fetchRateLimitFailure = error => ({
  type: RateLimitActionTypes.FETCH_RATE_LIMIT_FAILURE,
  payload: error,
});

export const fetchRateLimitStartAsync = () => {
  return async dispatch => {
    dispatch(fetchRateLimitStart());

    try {
      const rateLimit = await axios.get(`https://api.github.com/rate_limit`);
      dispatch(fetchRateLimitSuccess(rateLimit.data))
    } catch (error) {
      dispatch(fetchRateLimitFailure(error));
    }
  }
}
