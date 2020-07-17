import { createSelector } from 'reselect';

const commitsSelector = state => state.commits;

export const getCommitsSelector = createSelector([commitsSelector], commits => commits.commits);

export const areCommitsFetchingSelector = createSelector([commitsSelector], commits => commits.isFetching);
