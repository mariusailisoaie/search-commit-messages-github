import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';

ReactDOM.render(
  <Provider store={ store }>
    <React.StrictMode>
      <PersistGate persistor={ persistor }>
        <App />
      </PersistGate>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
