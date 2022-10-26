import { createSelector } from 'reselect';

import { initialState } from '../reducers';

const homeState = (state: any) => state.home || initialState;

const makeSelectIsRequesting = () => createSelector(homeState, state => state.isLoading);

const makeSelectMyPlant = () => createSelector(homeState, state => state.myPlant);

export { makeSelectIsRequesting, makeSelectMyPlant };
