import React from 'react';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import RootNavigation from './src/navigation/rootNavigation';

export default () => {
  return(
    <Provider store={store}>
        <RootNavigation />
    </Provider>
  );
}