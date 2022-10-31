import { actionTypesFactory } from 'redux-action-type-factory';
import { createAction } from 'redux-actions';

import { createActionGenerator } from '@Utils/actionGenerator';

export namespace PairActions {
  export const Types = actionTypesFactory(
    'PAIRING',
    'STEP_PAIRING',
    'SCAN_DEVICES',
    'SCAN_NETWORKS',
    'GET_LIST_PLANT',
    'GET_LIST_PLANT_GROUP',
    'CREATE_PLANT',
    'CONNECT_BLE',
    'PROV_CUSTOM',
  );

  export const stepPair = createActionGenerator(Types.STEP_PAIRING);
  export const scanDevices = createActionGenerator(Types.SCAN_DEVICES);
  export const scanNetworks = createActionGenerator(Types.SCAN_NETWORKS);
  export const getListPlant = createActionGenerator(Types.GET_LIST_PLANT);
  export const getListPlantGroup = createActionGenerator(Types.GET_LIST_PLANT_GROUP);
  export const createPlant = createActionGenerator(Types.CREATE_PLANT);
  export const connectBLE = createActionGenerator(Types.CONNECT_BLE);
  export const provCustomWithByteData = createActionGenerator(Types.PROV_CUSTOM);
}
