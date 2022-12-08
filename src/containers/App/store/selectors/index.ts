import { createSelector } from 'reselect';

import { initialState, IPropInitApp } from '../reducers';

const globalState = (state: IPropInitApp | any) => state.global || initialState;

const makeSelectIsRequesting = () => createSelector(globalState, state => state.isRequesting);

const makeSelectIsInitializing = () => createSelector(globalState, state => state.isInitializing);
const makeSelectIsSkipIntro = () => createSelector(globalState, state => state.isSkipIntro);
const makeSelectIsAppError = () => createSelector(globalState, state => state.isError);

const makeSelectIsLoggedIn = () => createSelector(globalState, state => state.isLoggedIn);

export {
  makeSelectIsRequesting,
  makeSelectIsInitializing,
  makeSelectIsLoggedIn,
  makeSelectIsSkipIntro,
  makeSelectIsAppError,
};
