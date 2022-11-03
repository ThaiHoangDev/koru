import produce from 'immer';
import { uniqBy } from 'lodash';

import { PairActions } from '../actions';

type ACTION = {
  type: string;
  payload: any;
};

export interface IPayload {
  isRequesting: boolean;
  uuid: string;
  listUuid: any;
  pop: string;
  netWorks: any;
  listPlant: any;
  listPlantGroup: any;
}

// The initial state of the Login container
export const initialState: IPayload = {
  isRequesting: true,
  uuid: '',
  listUuid: [],
  pop: '',
  netWorks: [],
  listPlant: [],
  listPlantGroup: [],
};

const authReducer = (state = initialState, { type, payload }: ACTION) =>
  produce(state, draft => {
    switch (type) {
      case PairActions.Types.SCAN_DEVICES.begin:
      case PairActions.Types.CREATE_PLANT.begin:
      case PairActions.Types.CONNECT_BLE.begin:
      case PairActions.Types.PROV_CREDS.begin:
        draft.isRequesting = true;
        break;
      case PairActions.Types.SCAN_DEVICES.succeeded:
        draft.isRequesting = false;
        draft.listUuid = payload;
        break;
      case PairActions.Types.SCAN_NETWORKS.begin:
        draft.isRequesting = true;
        break;
      case PairActions.Types.SCAN_NETWORKS.succeeded:
        draft.isRequesting = false;
        draft.netWorks = payload;
        break;
      case PairActions.Types.SCAN_NETWORKS.failed:
        draft.isRequesting = false;
        draft.netWorks = payload;
        break;
      case PairActions.Types.GET_LIST_PLANT.begin:
        draft.isRequesting = true;
        break;
      case PairActions.Types.GET_LIST_PLANT.succeeded:
        draft.isRequesting = false;
        draft.listPlant = uniqBy(!!payload.next ? [...draft.listPlant, ...payload?.results] : payload?.results, []);
        break;
      case PairActions.Types.GET_LIST_PLANT.failed:
        draft.isRequesting = false;
        draft.listPlant = [];
        break;
      case PairActions.Types.GET_LIST_PLANT_GROUP.begin:
        break;
      case PairActions.Types.GET_LIST_PLANT_GROUP.succeeded:
        draft.listPlantGroup = payload?.results;
        draft.isRequesting = false;
        break;
      case PairActions.Types.GET_LIST_PLANT_GROUP.failed:
      case PairActions.Types.CREATE_PLANT.failed:
      case PairActions.Types.SCAN_DEVICES.failed:
      case PairActions.Types.CONNECT_BLE.failed:
      case PairActions.Types.PROV_CREDS.failed:
        draft.isRequesting = false;
        break;
      case PairActions.Types.CREATE_PLANT.succeeded:
        draft.isRequesting = false;
        break;
      case PairActions.Types.CONNECT_BLE.succeeded:
        draft.isRequesting = false;
        draft.uuid = payload;
        break;
      default:
        break;
    }
  });

export default authReducer;
