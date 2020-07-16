import React from 'react';
import './App.css';
import SearchCommits from './components/SearchCommits/SearchCommits';

function App() {
  return (
    <div className='App'>
      <h1>Search commit messages on github</h1>

      <SearchCommits />
    </div>
  );
}

export default App;
