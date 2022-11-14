import produce from 'immer';
import { uniqBy } from 'lodash';

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
  loadMore: any;
}

// The initial state of the Login container
export const initialState: IPayload = {
  isLoading: true,
  myPlant: [],
  myMoreInfo: [],
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
        draft.loadMore = payload.next;
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
      case HomeActions.Types.ATTACH_POLICY.begin:
        break;
      case HomeActions.Types.ATTACH_POLICY.succeeded:
        break;
      case HomeActions.Types.ATTACH_POLICY.failed:
        break;
      case HomeActions.Types.UPDATE_LIST_PLANT.default:
        const id = payload?.uuid;
        const newData = payload.data;
        const dataUpdate: any = [
          ...draft.myPlant,
          {
            ...draft.myPlant.filter((item: any) => item.uuid === id)[0],
            status: newData === null ? false : true,
          },
        ];
        draft.myPlant = dataUpdate;
        break;
      default:
        break;
    }
  });

export default homeReducer;
