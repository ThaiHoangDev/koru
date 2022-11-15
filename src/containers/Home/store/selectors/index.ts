import { createSelector } from 'reselect';

import { initialState } from '../reducers';

const homeState = (state: any) => state.home || initialState;

const makeSelectIsRequesting = () => createSelector(homeState, state => state.isLoading);

const makeSelectMyPlant = () => createSelector(homeState, state => state.myPlant);
const makeSelectLoadMore = () => createSelector(homeState, state => state.loadMore);
const makeSelectMyMoreInfo = () => createSelector(homeState, state => state.myMoreInfo);
const makeSelectMyPlantHistory = () => createSelector(homeState, state => state.myPlantHistory);

export {
  makeSelectIsRequesting,
  makeSelectMyPlant,
  makeSelectLoadMore,
  makeSelectMyMoreInfo,
  makeSelectMyPlantHistory,
};
