import React from 'react';
import './App.css';

import ReactNotification from 'react-notifications-component';
import SearchCommits from './components/SearchCommits/SearchCommits';

function App() {
  return (
    <div className='App'>
      <ReactNotification />

      <h1>Search commit messages on github</h1>

      <SearchCommits />
    </div>
  );
}

export default App;
