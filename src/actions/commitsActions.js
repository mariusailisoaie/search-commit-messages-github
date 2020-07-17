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
  console.log('log: fetchCommitsStartAsync -> owner, repo', owner, repo);
  const allCommits = [];

  return async dispatch => {
    dispatch(fetchCommitsStart());

    try {
      const commits = await axios.get(`https://api.github.com/repos/${ owner }/${ repo }/commits?page=1&per_page=100`);

      if (commits.headers.link) {
        const linkLength = parseInt(commits.headers.link.split(',')[1].split('?page=')[1].split('&')[0]);

        for (let i = 1; i < linkLength + 1; i++) {
          const commitsPerPage = await axios.get(`https://api.github.com/repos/${ owner }/${ repo }/commits?page=${ i }&per_page=100`);
          allCommits.push(commitsPerPage.data);
        }

        dispatch(fetchCommitsSuccess(...allCommits.flat()));
      } else {
        dispatch(fetchCommitsSuccess(...commits.data));
      }
    } catch (error) {
      dispatch(fetchCommitsFailure(error));
    }
  }
}
