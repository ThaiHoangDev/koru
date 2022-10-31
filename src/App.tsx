import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import ErrorBoundary from 'react-native-error-boundary';
import { Amplify } from 'aws-amplify';
import { ErrorComp } from '@Components/error-comp';

import AppContainer from '@Containers/App';
import { store, persistor } from './store';
import { LogBox } from 'react-native';
import { amplifyConfig } from '@Utils/amplifyConfig';

// LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
// LogBox.ignoreAllLogs(); //Ignore all log notifications

Amplify.configure(amplifyConfig);

if (__DEV__) {
  import('./ReactotronConfig').then();
}

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
