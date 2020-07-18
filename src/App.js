import React from 'react';
import './App.css';

import ReactNotification from 'react-notifications-component';
import SearchCommitsContainer from './containers/SearchCommitsContainer';

function App() {
  return (
    <div className='App'>
      <ReactNotification />

      <h1>Search commit messages on github</h1>

      <SearchCommitsContainer />
    </div>
  );
}

export default App;
