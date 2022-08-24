import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import ErrorBoundary from 'react-native-error-boundary';

import { ErrorComp } from '@Components/error-comp';

import AppContainer from '@Containers/App';
import createStore from './store';

const { store, persistor } = createStore();

export { store };

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ErrorBoundary FallbackComponent={ErrorComp}>
        <AppContainer />
      </ErrorBoundary>
    </PersistGate>
  </Provider>
);

export default App;
