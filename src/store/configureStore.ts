import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistReducer, persistStore } from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension';

/**
 * This import defaults to localStorage for web and AsyncStorage for react-native.
 *
 * Keep in mind this storage *is not secure*. Do not use it to store sensitive information
 * (like API tokens, private and sensitive data, etc.).
 *
 * If you need to store sensitive information, use redux-persist-sensitive-storage.
 * @see https://github.com/CodingZeal/redux-persist-sensitive-storage
 */
import AsyncStorage from '@react-native-community/async-storage';

import apiMiddleware from './middlewares/api';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  /**
   * Blacklist state that we do not need/want to persist
   */
  blacklist: [
    // 'auth',
  ],
};

export default (rootReducer: any) => {
  const middlewares = [apiMiddleware];
  const enhancers = [];
  const reduxSagaMonitorOptions = {};

  // Connect the sagas to the redux store
  const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);
  middlewares.push(sagaMiddleware);

  enhancers.push(applyMiddleware(...middlewares));

  // Redux persist
  const persistedReducer = persistReducer(persistConfig, rootReducer);

  const store = createStore(persistedReducer, composeWithDevTools(...enhancers));
  const persistor = persistStore(store);

  const storeExtend = Object.assign(store);

  // Extensions
  storeExtend.runSaga = sagaMiddleware.run;
  storeExtend.injectedReducers = {}; // Reducer registry
  storeExtend.injectedSagas = {}; // Saga registry

  // Make reducers hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  // if (module.hasOwnProperty('hot')) {
  //   module.hot!.accept('../reducers', () => {
  //     storeExtend.replaceReducer(createReducer(storeExtend.injectedReducers));
  //   });
  // }

  return { store, persistor };
};
