import CommitsActionTypes from './actionTypes/commitsActionTypes';

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

export const fetchCommitsStartAsync = () => {
  return dispatch => {
    // const commits = 
  }
}

// export const fetchCollectionsStartAsync = () => {
//   return dispatch => {
//     const collectionsRef = firestore.collection('collections');
//     dispatch(fetchCollectionsStart());

//     collectionsRef.get().then(snapshot => {
//       const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
//       dispatch(fetchCollectionsSuccess(collectionsMap));
//     }).catch(error => dispatch(fetchCollectionsFailure(error.message)));
//   }
// }
