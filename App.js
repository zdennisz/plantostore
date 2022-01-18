import { Provider } from 'react-redux';
import React from 'react';
import store from './Store/store'
import AppNavigator from './navigation/AppNavigator';


export default App = () => {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
