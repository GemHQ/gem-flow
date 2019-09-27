import React, { createContext, useReducer } from 'react';
import Reducer from './Reducer';
const CTX = createContext();

export default (props) => {

  const initialState = {
    users: [],
  };
  const stateHook = useReducer(Reducer, initialState);

  return (
    <CTX.Provider value={stateHook}>
      {props.children}
    </CTX.Provider>
  )
}

export { CTX };

