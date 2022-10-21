import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import ErrorBoundary from 'react-native-error-boundary';

import { ErrorComp } from '@Components/error-comp';

import AppContainer from '@Containers/App';
import { store, persistor } from './store';
import { LogBox } from 'react-native';


LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

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
