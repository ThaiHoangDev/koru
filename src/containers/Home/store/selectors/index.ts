import { createSelector } from 'reselect';

import { initialState } from '../reducers';

const homeState = (state: any) => state.home || initialState;

const makeSelectIsRequesting = () => createSelector(homeState, state => state.isLoading);

const makeSelectMyPlant = () => createSelector(homeState, state => state.myPlant);
const makeSelectMyMoreInfo = () => createSelector(homeState, state => state.myMoreInfo);

export { makeSelectIsRequesting, makeSelectMyPlant, makeSelectMyMoreInfo };
