import produce from 'immer';

import { HomeActions } from '../actions';
import { PlantProps } from '../interfaces';

type ACTION = {
  type: string;
  payload: any;
};

export interface IPayload {
  isLoading: boolean;
  myPlant: PlantProps[];
  myMoreInfo: any;
  myPlantHistory: any;
  loadMore: any;
}

// The initial state of the Login container
export const initialState: IPayload = {
  isLoading: true,
  myPlant: [],
  myMoreInfo: [],
  myPlantHistory: [],
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
        draft.myPlant = !!payload.next ? [...draft.myPlant, ...payload?.results] : payload?.results;
        draft.loadMore = !!payload.next;
        break;
      case HomeActions.Types.GET_MY_PLANT.failed:
        draft.isLoading = false;
        break;
      //More Info
      case HomeActions.Types.GET_MORE_INFO.begin:
        draft.isLoading = true;
        break;
      case HomeActions.Types.GET_MORE_INFO.succeeded:
        draft.isLoading = false;
        draft.myMoreInfo = payload;
        break;
      case HomeActions.Types.GET_MORE_INFO.failed:
        draft.isLoading = false;
        break;
      case HomeActions.Types.GET_THING_SHADOW.begin:
        break;
      case HomeActions.Types.GET_THING_SHADOW.succeeded:
        break;
      case HomeActions.Types.GET_THING_SHADOW.failed:
        break;
      case HomeActions.Types.UPDATE_LIST_PLANT.default:
        draft.myPlant = draft.myPlant.map(obj =>
          obj.uuid === payload.uuid ? { ...obj, status: !!payload.data, reported: payload.data } : obj,
        );
        break;
      // Plant state history
      case HomeActions.Types.GET_PLANT_STATE_HISTORY.begin:
        draft.isLoading = true;
        break;
      case HomeActions.Types.GET_PLANT_STATE_HISTORY.succeeded:
        draft.isLoading = false;
        draft.myPlantHistory = payload;
        break;
      case HomeActions.Types.GET_PLANT_STATE_HISTORY.failed:
        draft.isLoading = false;
        break;
      default:
        break;
    }
  });

export default homeReducer;
