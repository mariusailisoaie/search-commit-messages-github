import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { fetchCommitsStartAsync } from '../actions/commitsActions';
import { fetchRateLimitStartAsync } from '../actions/rateLimitActions';
import { areCommitsFetchingSelector, getCommitsSelector } from '../selectors/commitsSelector';
import { getRateLimitSelector } from '../selectors/rateLimitSelector';

import SearchCommits from '../components/SearchCommits/SearchCommits';

const mapStateToProps = createStructuredSelector({
  isFetching: areCommitsFetchingSelector,
  commits: getCommitsSelector,
  rateLimit: getRateLimitSelector,
});

const mapDispatchToProps = dispatch => ({
  fetchCommitsStartAsync: repoInfo => dispatch(fetchCommitsStartAsync(repoInfo)),
  fetchRateLimitStartAsync: () => dispatch(fetchRateLimitStartAsync()),
});

const SearchCommitsContainer = connect(mapStateToProps, mapDispatchToProps)(SearchCommits);

export default SearchCommitsContainer;
