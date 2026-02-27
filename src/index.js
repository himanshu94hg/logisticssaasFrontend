import React from 'react';
import { createRoot } from 'react-dom/client';
import store from './redux/store';
import { Provider } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import './responsive.css'

createRoot(document.getElementById('root')).render(
  <>
    {/* <Suspense fallback={<Loading/>}> */}
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
    {/* </Suspense> */}
  </>,
  document.getElementById('root')
);

