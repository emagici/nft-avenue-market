import React, { createContext, useReducer } from 'react';

const initialState = {
  appLoading: false,
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
