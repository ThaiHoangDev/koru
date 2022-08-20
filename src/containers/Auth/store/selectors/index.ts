import { createSelector } from 'reselect';

import { initialState } from '../reducers';

const authState = (state: any) => state.auth || initialState;

const makeSelectIsRequesting = () => createSelector(authState, state => state.isRequesting);

const makeSelectRegisterSuccess = () => createSelector(authState, state => state.isRegisterSuccess);

const makeSelectVerifySuccess = () => createSelector(authState, state => state.isVerifySuccess);

const makeSelectErrors = () => createSelector(authState, state => state.errors);

const makeSelectShowAuthModal = () => createSelector(authState, state => state.showAuthModal);

const makeSelectResendSuccess = () => createSelector(authState, state => state.isResendSuccess);
const makeSelectStepSignUp = () => createSelector(authState, state => state.stepSignUp);

export {
  makeSelectIsRequesting,
  makeSelectVerifySuccess,
  makeSelectErrors,
  makeSelectRegisterSuccess,
  makeSelectShowAuthModal,
  makeSelectResendSuccess,
  makeSelectStepSignUp
};
