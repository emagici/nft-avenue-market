import React, { createContext, useReducer } from 'react';

const initialState = {
  appLoading: false,
  articles: []
};

let reducer = (state, action) => {
  switch (action.type) {
    case 'START_LOADING':
      return {
        ...state,
        appLoading: true
      };

    case 'STOP_LOADING':
      return {
        ...state,
        appLoading: false
      };

    case 'UPDATE_ARTICLES':
      return {
        ...state,
        articles: action.payload
      };
    case 'ADD_ARTICLE':
      return {
        ...state,
        articles: [
          ...state.articles.filter(item => item.id !== action.payload.id),
          action.payload
        ]
      };

    default:
      return;
  }
};

const SharedContext = createContext(initialState);

function SharedProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <SharedContext.Provider value={{ state, dispatch }}>{props.children}</SharedContext.Provider>;
}
export { SharedContext, SharedProvider };
