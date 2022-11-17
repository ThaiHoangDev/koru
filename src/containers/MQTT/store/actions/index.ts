import { actionTypesFactory } from 'redux-action-type-factory';
import { createActionGenerator } from '@Utils/actionGenerator';

export namespace MQTTActions {
  export const Types = actionTypesFactory('MQTT', 'INIT_MQTT', 'MQTT_PUBLISH', 'MQTT_DISCONNECT');

  export const init_MQTT = createActionGenerator(Types.INIT_MQTT);
  export const disconnect_MQTT = createActionGenerator(Types.MQTT_DISCONNECT);
  export const connectedMQTT = createActionGenerator(Types.MQTT_PUBLISH);
}
