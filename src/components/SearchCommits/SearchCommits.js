import React, { useState, useEffect } from 'react';

import './SearchCommits.scss';

import { addNotification } from '../../utils/notifications.utils';

import axios from 'axios';
import ms from 'ms';

import Spinner from '../Spinner/Spinner';

const SearchCommits = () => {
  const [combinedCommitsArray, setCombinedCommitsArray] = useState([]);
  const [repoDetails, setRepoDetails] = useState({ owner: '', repo: '' });
  const [isFetching, setIsFetching] = useState(false);
  const [rate, setRate] = useState({});

  const allCommits = [];

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

    setIsFetching(true);

    try {
      const commits = await axios.get(`https://api.github.com/repos/${ repoDetails.owner }/${ repoDetails.repo }/commits?page=1&per_page=100`);

      if (commits.headers.link) {
        const linkLength = parseInt(commits.headers.link.split(',')[1].split('?page=')[1].split('&')[0]);

        for (let i = 1; i < linkLength + 1; i++) {
          const commitsPerPage = await axios.get(`https://api.github.com/repos/${ repoDetails.owner }/${ repoDetails.repo }/commits?page=${ i }&per_page=100`);
          allCommits.push(commitsPerPage.data);
        }

        setCombinedCommitsArray([...allCommits.flat()]);
        setIsFetching(false);
      } else {
        setIsFetching(true);
        setCombinedCommitsArray([...commits.data]);
        setIsFetching(false);
      }
    } catch (error) {
      addNotification('Error!', `${ error }`, 'danger', 'top', 'center', 'fadeIn', 'fadeOut', 4000);
    }
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
            { combinedCommitsArray.length ? <div>This repo has a total of { combinedCommitsArray.length } commits.</div> : null }
            {
              combinedCommitsArray.map((commit, index) =>
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
