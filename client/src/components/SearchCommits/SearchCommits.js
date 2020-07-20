import React, { useState, useEffect } from 'react';

import './SearchCommits.scss';

import { addNotification } from '../../utils/notifications.utils';

import ms from 'ms';

import Spinner from '../Spinner/Spinner';

const SearchCommits = ({ fetchCommitsStartAsync, fetchRateLimitStartAsync, isFetching, commits, rateLimit }) => {
  const [repoDetails, setRepoDetails] = useState({ owner: '', repo: '' });
  const [filteredCommits, setFilteredCommits] = useState([]);

  useEffect(() => {
    fetchRateLimitStartAsync();
    setFilteredCommits(commits);
  }, [fetchRateLimitStartAsync, commits]);

  const handleSubmit = async e => {
    e.preventDefault();

    if (rateLimit.remaining === 0) {
      addNotification(
        `API rate limit exceeded`,
        `Unable to make more requests! Please try again in ${ new Date(new Date(rateLimit.reset * 1000) - Date.now()).getMinutes() } minutes.`,
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

  const handleFilterCommits = ({ target: { value } }) => {
    setFilteredCommits(commits.filter(({ commit }) => commit.message.toLowerCase().includes((value).toLowerCase())));
  }

  return (
    <div className='container'>
      <div className='form-container'>
        <form onSubmit={ handleSubmit }>
          <input onChange={ handleChange } className='owner-input' type='text' name='owner' placeholder='Owner' required />
          <input onChange={ handleChange } className='repo-input' type='text' name='repo' placeholder='Repo' required />
          <input type='submit' value='Submit' hidden />
        </form>
      </div>

      {
        isFetching ? <Spinner /> :
          <div className='commits-container'>
            { commits.length ?
              <div>
                <div>This repo has a total of { commits.length } commits on the master branch.</div>
                <input onChange={ handleFilterCommits } className='filter-commits' type='text' name='filterCommits' placeholder='Filter commits' />
              </div> : null }
            {
              filteredCommits.map((commit, index) =>
                <div key={ index } className='commit'>
                  <div className='commit-message'>{ commit.commit.message }</div>
                  <div className='author-time-changes'>
                    <img src={ commit.author && commit.author.avatar_url } className='author-avatar' alt='avatar' />
                    <div className='commit-time'>{ commit.author && commit.author.login } commited { ms(Date.now() - new Date(commit.commit.author.date), { long: true }) } ago</div>
                    <a className='see-changes' href={ commit.html_url } target='_blank' rel='noopener noreferrer'>see changes on github</a>
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
