import { ListPlant } from './../../interfaces/index';
import { createSelector } from 'reselect';

import { initialState } from '../reducers';

const pairState = (state: any) => state.pair || initialState;

const makeSelectIsRequesting = () => createSelector(pairState, state => state.isRequesting);

const makeSelectStepPairing = () => createSelector(pairState, state => state.stepPairing);
const makeSelectUuid = () => createSelector(pairState, state => state.uuid);
const makeSelectPop = () => createSelector(pairState, state => state.pop);
const makeSelectNetworks = () => createSelector(pairState, state => state.netWorks);
const makeSelectListPlant = () => createSelector(pairState, state => state.ListPlant);

export {
  makeSelectIsRequesting,
  makeSelectStepPairing,
  makeSelectUuid,
  makeSelectPop,
  makeSelectNetworks,
  makeSelectListPlant,
};
