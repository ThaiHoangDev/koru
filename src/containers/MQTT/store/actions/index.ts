import { actionTypesFactory } from 'redux-action-type-factory';
import { createActionGenerator } from '@Utils/actionGenerator';

export namespace MQTTActions {
  export const Types = actionTypesFactory(
    'MQTT',
    'INIT_MQTT',
    'MQTT_PUBLISH'
  );

  export const initApp = createActionGenerator(Types.INIT_MQTT);
  export const connectedMQTT = createActionGenerator(Types.MQTT_PUBLISH);
}
