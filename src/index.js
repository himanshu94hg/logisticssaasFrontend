import './index.css';
import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './redux/store';
import { Provider } from 'react-redux'

ReactDOM.render(
  <>
    <Provider store={store}>
      <div>
        <App />
      </div>
    </Provider>
  </>,
  document.getElementById('root')
);

