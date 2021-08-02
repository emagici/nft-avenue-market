import React, { createContext, useReducer, useEffect } from 'react';

//react local storage
//reference: https://stackoverflow.com/a/64547542/4490058
const storageKey = "fomo-web3-session-storage";

const initialState = {
  userConnected: false,
  web3Data: null
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

    case 'SET_WEB3_DATA':
      return {
        ...state,
        web3Data: action.payload
      };

    case 'RESET_ALL':
      return {
        userConnected: false,
        web3Data: null
      };

    default:
      return;
  }
};

const Web3Context = createContext(initialState);

function Web3Provider(props) {
  const [state, dispatch] = useReducer(
    reducer,
    initialState,
    (initial) => JSON.parse(sessionStorage.getItem(storageKey)) || initial
  );

  useEffect(() => {
    sessionStorage.setItem(storageKey, JSON.stringify(state));
  }, [state]);

  return <Web3Context.Provider value={{ state, dispatch }}>{props.children}</Web3Context.Provider>;
}
export { Web3Context, Web3Provider };