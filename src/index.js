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
    <UseWalletProvider
      chainId={56}
      connectors={{
        bsc: {
          web3ReactConnector() {
            return new BscConnector({ supportedChainIds: [56, 97] })
          },
          handleActivationError(err) {
            if (err instanceof UserRejectedRequestError) {
              return new ConnectionRejectedError()
            }
          },
        },
      }}
    >
      {window.location.href.indexOf('staging') >= 0 ? <AppProtected/> : <App/>}
    </UseWalletProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
