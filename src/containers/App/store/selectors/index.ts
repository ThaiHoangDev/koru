import { createSelector } from 'reselect';

import { initialState } from '../reducers';

const globalState = (state: any) => state.global || initialState;

const makeSelectIsRequesting = () => createSelector(globalState, state => state.isRequesting);

const makeSelectIsInitializing = () => createSelector(globalState, state => state.isInitializing);

const makeSelectIsLoggedIn = () => createSelector(globalState, state => state.isLoggedIn);


export {
  makeSelectIsRequesting,
  makeSelectIsInitializing,
  makeSelectIsLoggedIn,
};
