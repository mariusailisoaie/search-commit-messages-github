import CommitsActionTypes from './actionTypes/commitsActionTypes';

import axios from 'axios';

export const fetchCommitsStart = () => ({
  type: CommitsActionTypes.FETCH_COMMITS_START,
});

export const fetchCommitsSuccess = commits => ({
  type: CommitsActionTypes.FETCH_COMMITS_SUCCESS,
  payload: commits,
});

export const fetchCommitsFailure = error => ({
  type: CommitsActionTypes.FETCH_COMMITS_FAILURE,
  payload: error,
});

export const fetchCommitsStartAsync = ({ owner, repo }) => {
  return async dispatch => {
    dispatch(fetchCommitsStart());

    try {
      const commits = await axios.post(`https://search-commits-github-backend.netlify.app/.netlify/functions/api/getCommits`, { owner, repo });
      dispatch(fetchCommitsSuccess(commits.data));
    } catch (error) {
      dispatch(fetchCommitsFailure(error));
    }
  }
}
