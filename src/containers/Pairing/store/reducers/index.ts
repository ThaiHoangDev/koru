import produce from 'immer';

import { PairActions } from '../actions';

type ACTION = {
  type: string;
  payload: any;
};

export interface IPayload {
  isRequesting: boolean;
  stepPairing: number;
  uuid: string;
  pop: string;
  netWorks: any;
  listPlant: any;
  perpage: number;
  page: number;
}

// The initial state of the Login container
export const initialState: IPayload = {
  isRequesting: true,
  stepPairing: 1,
  uuid: '',
  pop: '',
  netWorks: [],
  listPlant: [],
  perpage: 10,
  page: 1,
};

const authReducer = (state = initialState, { type, payload }: ACTION) =>
  produce(state, draft => {
    switch (type) {
      case PairActions.Types.STEP_PAIRING.begin:
        draft.stepPairing = payload;
        break;
      case PairActions.Types.SCAN_DEVICES.begin:
        draft.isRequesting = true;
        draft.stepPairing = payload;
        break;
      case PairActions.Types.SCAN_DEVICES.succeeded:
        draft.isRequesting = false;
        draft.stepPairing = payload;
        break;
      case PairActions.Types.SCAN_NETWORKS.begin:
        draft.isRequesting = true;
        draft.stepPairing = payload;
        break;
      case PairActions.Types.SCAN_NETWORKS.succeeded:
        draft.isRequesting = false;
        draft.stepPairing = payload;
        break;
      case PairActions.Types.SCAN_NETWORKS.failed:
        draft.isRequesting = false;
        draft.netWorks = payload;
        break;
      case PairActions.Types.GET_LIST_PLANT.begin:
        draft.isRequesting = true;
      case PairActions.Types.GET_LIST_PLANT.succeeded:
        draft.isRequesting = false;
        draft.listPlant = payload?.results;
        draft.perpage = payload?.perpage;
        break;
      case PairActions.Types.GET_LIST_PLANT.failed:
        draft.isRequesting = false;
        draft.listPlant = [];
        break;
      default:
        break;
    }
  });

export default authReducer;
