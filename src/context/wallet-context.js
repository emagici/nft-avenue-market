import React, { createContext, useReducer, useEffect } from 'react';

const storageKey = "fomo-wallet-session-storage";

const initialState = {
  userConnected: false,
  walletId: null
};

let reducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER_CONNECTED':
      return {
        ...state,
        userConnected: true
      };

    case 'SET_USER_DISCONNECTED':
      return {
        ...state,
        userConnected: false
      };

    case 'SET_WALLET_ID':
      return {
        ...state,
        walletId: action.payload
      };

    case 'RESET_ALL':
      return {
        userConnected: false,
        walletId: null
      };

    default:
      return;
  }
};

const WalletContext = createContext(initialState);

function WalletProvider(props) {
  const [state, dispatch] = useReducer(
    reducer, 
    initialState, 
    (initial) => JSON.parse(sessionStorage.getItem(storageKey)) || initial
  );

  useEffect(() => {
    sessionStorage.setItem(storageKey, JSON.stringify(state));
  }, [state]);
  
  return <WalletContext.Provider value={{ state, dispatch }}>{props.children}</WalletContext.Provider>;
}
export { WalletContext, WalletProvider };