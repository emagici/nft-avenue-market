import React, { createContext, useReducer, useEffect } from 'react';

//react local storage
//reference: https://stackoverflow.com/a/64547542/4490058
const storageKey = "fomo-user-session-storage";

const initialState = {
  bannerPictureUrl: null,
  description: null,
  facebookUrl: null,
  twitterUrl: null,
  discordUrl: null,
  instagramUrl: null,
  name: null,
  profilePictureUrl: null,
  accessToken: null,
  sign: null,
  ownNfts: [],
  id: null
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

    case 'SET_USER_ID':
      return {
        ...state,
        id: action.payload
      };

    case 'SET_SIGN':
        return {
          ...state,
          sign: action.payload
        };

    case 'SET_OWN_NFTS':
      return {
        ...state,
        ownNfts: action.payload
      };

    case 'RESET_ALL':
      return {
        bannerPictureUrl: null,
        description: null,
        facebookUrl: null,
        twitterUrl: null,
        discordUrl: null,
        instagramUrl: null,
        name: null,
        profilePictureUrl: null,
        accessToken: null,
        sign: null,
        ownNfts: [],
        id: null
      };

    default:
      return;
  }
};

const UserContext = createContext(initialState);

function UserProvider(props) {
  const [state, dispatch] = useReducer(
    reducer, 
    initialState, 
    (initial) => JSON.parse(sessionStorage.getItem(storageKey)) || initial
  );

  useEffect(() => {
    sessionStorage.setItem(storageKey, JSON.stringify(state));
  }, [state]);

  return <UserContext.Provider value={{ state, dispatch }}>{props.children}</UserContext.Provider>;
}
export { UserContext, UserProvider, initialState };