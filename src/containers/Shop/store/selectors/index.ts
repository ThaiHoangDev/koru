import { createSelector } from 'reselect';

import { initialState } from '../reducers';

const shopState = (state: any) => state.shop || initialState;

const makeSelectIsRequesting = () => createSelector(shopState, state => state.isLoading);

const makeSelectMyOrder = () => createSelector(shopState, state => state.myOrder);

export { makeSelectIsRequesting, makeSelectMyOrder };
