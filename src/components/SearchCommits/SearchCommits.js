import React, { useState, useEffect } from 'react';

import './SearchCommits.scss';

import { addNotification } from '../../utils/notifications.utils';

import axios from 'axios';

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
        console.log('log: SearchCommits -> rateLimit.data', rateLimit.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();

    if (rate.remaining === 0) {
      addNotification(
        `API rate limit exceeded`,
        // `Unable to make more requests! Please try again in ${ Date(rate.reset - Math.floor(Date.now() / 1000)) } minutes.`,
        `Unable to make more requests! Please try again in ${ Date(rate.reset * 1000) } minutes.`,
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
            { combinedCommitsArray.map((commit, index) => <div key={ index } className='commit'>{ commit.commit.message }</div>) }
          </div>
      }
    </div>
  )
}

export default SearchCommits;
