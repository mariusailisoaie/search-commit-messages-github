import React, { useState, useEffect } from 'react';

import './SearchCommits.scss';

import { addNotification } from '../../utils/notifications.utils';

import ms from 'ms';

import Spinner from '../Spinner/Spinner';

const SearchCommits = ({ fetchCommitsStartAsync, fetchRateLimitStartAsync, isFetching, commits, rateLimit }) => {
  const [repoDetails, setRepoDetails] = useState({ owner: '', repo: '' });

  useEffect(() => {
    fetchRateLimitStartAsync();
  }, [fetchRateLimitStartAsync]);

  const handleSubmit = async e => {
    e.preventDefault();

    if (rateLimit.rate.remaining === 0) {
      addNotification(
        `API rate limit exceeded`,
        `Unable to make more requests! Please try again in ${ new Date(new Date(rateLimit.rate.reset * 1000) - Date.now()).getMinutes() } minutes.`,
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

export default SearchCommits;
