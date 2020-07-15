import React, { useState, useEffect } from 'react';

import axios from 'axios';

const SearchCommits = () => {
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [combinedCommitsArray, setCombinedCommitsArray] = useState([]);

  const allCommits = [];

  useEffect(() => {
    const getCommits = async () => {
      const commits = await axios.get(`https://api.github.com/repos/mariusailisoaie/crwn-clothing/commits?page=1&per_page=100`);
      const linkLength = commits.headers.link.split(',').length;
      setNumberOfPages(linkLength);
    }

    getCommits();
  });

  const handleClick = async () => {
    for (let i = 1; i < numberOfPages + 2; i++) {
      const commitsPerPage = await axios.get(`https://api.github.com/repos/mariusailisoaie/crwn-clothing/commits?page=${ i }&per_page=100`);
      allCommits.push(commitsPerPage.data);
    }

    const combinedCommits = [...allCommits[0], ...allCommits[1], ...allCommits[2]]
    setCombinedCommitsArray(combinedCommits);

    console.log('log: handleClick -> combinedCommitsArray', combinedCommitsArray);
  }

  return (
    <div>
      <h1>Search commits</h1>
      <button onClick={ handleClick }>Search commits</button>

      {
        combinedCommitsArray.map((commit, index) => <div key={ index }>{ commit.commit.message }</div>)
      }
    </div>
  )
}

export default SearchCommits;
