import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { fetchCommitsStartAsync } from '../actions/commitsActions';
import { areCommitsFetchingSelector, getCommitsSelector } from '../selectors/commitsSelector';

import SearchCommits from '../components/SearchCommits/SearchCommits';

const mapStateToProps = createStructuredSelector({
  isFetching: areCommitsFetchingSelector,
  commits: getCommitsSelector,
});

const mapDispatchToProps = dispatch => ({
  fetchCommitsStartAsync: repoInfo => dispatch(fetchCommitsStartAsync(repoInfo)),
});

const SearchCommitsContainer = connect(mapStateToProps, mapDispatchToProps)(SearchCommits);

export default SearchCommitsContainer;
