import produce from 'immer';

import { HomeActions } from '../actions';

type ACTION = {
  type: string;
  payload: any;
};

export interface IPayload {
  isLoading: boolean;
  myPlant: any;
  loadMore: any;
}

// The initial state of the Login container
export const initialState: IPayload = {
  isLoading: false,
  myPlant: [],
  loadMore: null,
};

const homeReducer = (state = initialState, { type, payload }: ACTION) =>
  produce(state, draft => {
    switch (type) {
      case HomeActions.Types.GET_MY_PLANT.begin:
        draft.isLoading = true;
        break;
      case HomeActions.Types.GET_MY_PLANT.succeeded:
        draft.isLoading = false;
        draft.myPlant = [...draft.myPlant, ...payload.results];
        draft.loadMore = payload.next;
        break;
      default:
        break;
    }
  });

export default homeReducer;
