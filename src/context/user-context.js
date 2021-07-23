import React, { createContext, useReducer } from 'react';

const initialState = {
  bannerPictureUrl: null,
  description: null,
  facebookUrl: null,
  instagramUrl: null,
  name: null,
  profilePictureUrl: null,
  accessToken: null,
  ownNfts: []
};

let reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_DATA':
      return {
        ...state,
        ...action.payload
      };

    case 'SET_ACCESS_TOKEN':
      return {
        ...state,
        accessToken: action.payload
      };

    case 'SET_OWN_NFTS':
      return {
        ...state,
        ownNfts: action.payload
      };

    default:
      return;
  }
};

const UserContext = createContext(initialState);

function UserProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <UserContext.Provider value={{ state, dispatch }}>{props.children}</UserContext.Provider>;
}
export { UserContext, UserProvider };