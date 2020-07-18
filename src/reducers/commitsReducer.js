import CommitsActionTypes from '../actions/actionTypes/commitsActionTypes';

const INITIAL_STATE = {
  commits: [],
  isFetching: false,
  error: null,
}

const commitsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CommitsActionTypes.FETCH_COMMITS_START:
      return {
        ...state,
        isFetching: true,
      }
    case CommitsActionTypes.FETCH_COMMITS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        commits: action.payload,
        error: null,
      }
    case CommitsActionTypes.FETCH_COMMITS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      }
    default:
      return state;
  }
}

export default commitsReducer;
