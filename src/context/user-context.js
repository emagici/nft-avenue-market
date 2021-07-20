import React, { createContext, useReducer } from 'react';

const initialState = {
  bannerPictureUrl: null,
  description: null,
  facebookUrl: null,
  instagramUrl: null,
  name: null,
  profilePictureUrl: null,
};

let reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_DATA':
      return {
        ...state,
        ...action.payload
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