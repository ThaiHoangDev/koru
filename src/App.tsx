import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { enableES5 } from 'immer';

import AppContainer from './containers/App';
import createStore from './store';

const { store, persistor } = createStore();

export { store }

export type AppDispatch = typeof store.dispatch;

enableES5();

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AppContainer />
    </PersistGate>
  </Provider>
);

export default App;
