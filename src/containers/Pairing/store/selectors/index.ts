import { createSelector } from 'reselect';

import { initialState } from '../reducers';

const pairState = (state: any) => state.pair || initialState;

const makeSelectIsRequesting = () => createSelector(pairState, state => state.isRequesting);

const makeSelectStepPairing = () => createSelector(pairState, state => state.stepPairing);
const makeSelectUuid = () => createSelector(pairState, state => state.listUuid);
const makeSelectPop = () => createSelector(pairState, state => state.pop);
const makeSelectNetworks = () => createSelector(pairState, state => state.netWorks);
const makeSelectListPlant = () => createSelector(pairState, state => state.listPlant);
const makeSelectListPlantGroup = () => createSelector(pairState, state => state.listPlantGroup);

export {
  makeSelectIsRequesting,
  makeSelectStepPairing,
  makeSelectUuid,
  makeSelectPop,
  makeSelectNetworks,
  makeSelectListPlant,
  makeSelectListPlantGroup,
};
