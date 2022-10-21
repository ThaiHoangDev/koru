import { actionTypesFactory } from 'redux-action-type-factory';
import { createAction } from 'redux-actions';

import { createActionGenerator } from '@Utils/actionGenerator';

export namespace PairActions {
  export const Types = actionTypesFactory('PAIRING', 'STEP_PAIRING', 'SCAN_DEVICES', 'SCAN_NETWORKS');

  export const stepPair = createActionGenerator(Types.STEP_PAIRING);
  export const scanDevices = createActionGenerator(Types.SCAN_DEVICES);
  export const scanNetworks = createActionGenerator(Types.SCAN_NETWORKS);
}
