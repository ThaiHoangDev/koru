/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';

import globalReducer from '@Containers/App/store/reducers';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default (injectedReducers = {}) => {
  const appReducer = combineReducers({
    ...injectedReducers,
    global: globalReducer,
  });

  return appReducer;
};
