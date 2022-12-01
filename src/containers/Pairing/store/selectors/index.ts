import { createSelector } from 'reselect';

import { initialState } from '../reducers';

const pairState = (state: any) => state.pair || initialState;

const makeSelectIsRequesting = () => createSelector(pairState, state => state.isRequesting);

const makeSelectUuid = () => createSelector(pairState, state => state.listUuid);
const makeSelectUuidConnected = () => createSelector(pairState, state => state.uuid);
const makeSelectPop = () => createSelector(pairState, state => state.pop);
const makeSelectNetworks = () => createSelector(pairState, state => state.netWorks);
const makeSelectListPlant = () => createSelector(pairState, state => state.listPlant);
const makeSelectListPlantGroup = () => createSelector(pairState, state => state.listPlantGroup);
const makeSelectListPlantLoadMore = () => createSelector(pairState, state => state.loadMore);

export {
  makeSelectIsRequesting,
  makeSelectUuid,
  makeSelectPop,
  makeSelectNetworks,
  makeSelectListPlant,
  makeSelectListPlantGroup,
  makeSelectUuidConnected,
  makeSelectListPlantLoadMore,
};
