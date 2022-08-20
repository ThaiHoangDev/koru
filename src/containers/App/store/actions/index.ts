import { actionTypesFactory } from 'redux-action-type-factory';
import { createAction } from 'redux-actions';
import { createActionGenerator } from '@Utils/actionGenerator';

export namespace AppActions {
  export const Types = actionTypesFactory('APP', 'INIT_APP', 'CONNECTED_MQTT');

  export const initApp = createActionGenerator(Types.INIT_APP);
  export const connectedMQTT = createAction<boolean>(Types.CONNECTED_MQTT.default);
}
