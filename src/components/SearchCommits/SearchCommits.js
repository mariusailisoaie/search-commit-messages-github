import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import './SearchCommits.scss';

import { addNotification } from '../../utils/notifications.utils';
import { createStructuredSelector } from 'reselect';
import { fetchCommitsStartAsync } from '../../actions/commitsActions';
import { areCommitsFetchingSelector, getCommitsSelector } from '../../selectors/commitsSelector';

import axios from 'axios';
import ms from 'ms';

import Spinner from '../Spinner/Spinner';

const SearchCommits = ({ fetchCommitsStartAsync, isFetching, commits }) => {
  console.log('log: SearchCommits -> commits', commits);
  const [repoDetails, setRepoDetails] = useState({ owner: '', repo: '' });
  const [rate, setRate] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const rateLimit = await axios.get(`https://api.github.com/rate_limit`);
        setRate(rateLimit.data.rate);
      } catch (error) {
        addNotification('Error!', `${ error }`, 'danger', 'top', 'center', 'fadeIn', 'fadeOut', 4000);
      }
    })();
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();

    if (rate.remaining === 0) {
      addNotification(
        `API rate limit exceeded`,
        `Unable to make more requests! Please try again in ${ new Date(new Date(rate.reset * 1000) - Date.now()).getMinutes() } minutes.`,
        'danger',
        'top',
        'center',
        'fadeIn',
        'fadeOut',
        6000,
      );

      return;
    }

    fetchCommitsStartAsync({ owner: repoDetails.owner, repo: repoDetails.repo });
  }

  const handleChange = e => {
    const { name, value } = e.target;

    setRepoDetails({ ...repoDetails, [name]: value });
  }

  return (
    <div className='container'>
      <div className='form-container'>
        <form onSubmit={ handleSubmit }>
          <input onChange={ handleChange } type='text' name='owner' placeholder='Owner' required />
          <input onChange={ handleChange } type='text' name='repo' placeholder='Repo' required />
          <input type='submit' value='Submit' hidden />
        </form>
      </div>

      {
        isFetching ? <Spinner /> :
          <div className='commits-container'>
            { commits.length ? <div>This repo has a total of { commits.length } commits.</div> : null }
            {
              commits.map((commit, index) =>
                <div key={ index } className='commit'>
                  <div className='commit-message'>{ commit.commit.message }</div>
                  <div className='author-and-time'>
                    <img src={ commit.author && commit.author.avatar_url } className='author-avatar' alt='avatar' />
                    <div className='commit-time'>{ commit.author && commit.author.login } commited { ms(Date.now() - new Date(commit.commit.author.date), { long: true }) } ago</div>
                  </div>
                </div>
              )
            }
          </div>
      }
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  isFetching: areCommitsFetchingSelector,
  commits: getCommitsSelector,
});

const mapDispatchToProps = dispatch => ({
  fetchCommitsStartAsync: repoInfo => dispatch(fetchCommitsStartAsync(repoInfo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchCommits);
