import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './redux/store';
import { Provider } from 'react-redux'
import './index.css';



ReactDOM.render(
  <>
    <Provider store={store}>
        <App />
    </Provider>
  </>,
  document.getElementById('root')
);

