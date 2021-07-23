import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AppProtected from './AppProtected';
import reportWebVitals from './reportWebVitals';

import {
  BscConnector,
  UserRejectedRequestError,
} from '@binance-chain/bsc-connector'

import {
  ConnectionRejectedError,
  UseWalletProvider,
} from 'use-wallet'

ReactDOM.render(
  <React.StrictMode>
      {window.location.href.indexOf('staging') >= 0 ? <AppProtected/> : <App/>}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
