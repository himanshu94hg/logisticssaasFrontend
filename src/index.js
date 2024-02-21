import React from 'react';
import ReactDOM from 'react-dom';
import store from './redux/store';
import { Provider } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { Suspense } from 'react';
import Loading from './Component/loader';

ReactDOM.render(
  <>
    <Suspense fallback={<Loading/>}>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
    </Suspense>
  </>,
  document.getElementById('root')
);

