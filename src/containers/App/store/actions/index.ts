import { actionTypesFactory } from 'redux-action-type-factory';
import { createAction } from 'redux-actions';
import { createActionGenerator } from '@Utils/actionGenerator';

export namespace AppActions {
  export const Types = actionTypesFactory(
    'APP',
    'INIT_APP',
    'CONNECTED_MQTT',
    'SCAN_FOR_PERIPHERALS',
    'INITIATE_CONNECTION',
    'INTRO_APP',
    'REFRESH_TOKEN',
  );

  export const initApp = createActionGenerator(Types.INIT_APP);
  export const refreshToken = createActionGenerator(Types.REFRESH_TOKEN);
  export const introApp = createAction<boolean>(Types.INTRO_APP.default);
  export const bluInitApp = createActionGenerator(Types.INITIATE_CONNECTION);
  export const connectedMQTT = createAction<boolean>(Types.CONNECTED_MQTT.default);
}
