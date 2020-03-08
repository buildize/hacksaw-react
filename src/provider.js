import React from 'react';
import context from './context';

const Provider = context.Provider;

export default ({ store, children }) => {
  return (
    <Provider value={store}>
      {children}
    </Provider>
  )
}
