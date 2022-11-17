import { actionTypesFactory } from 'redux-action-type-factory';
import { createAction } from 'redux-actions';
import { createActionGenerator } from '@Utils/actionGenerator';

export namespace AWSActions {
  export const Types = actionTypesFactory('AWS', 'AWS_CONNECT', 'AWS_RECONNECT_REQUEST');

  export const awsConnectRequest = createActionGenerator(Types.AWS_CONNECT);
  export const awsReconnectRequest = createActionGenerator(Types.AWS_RECONNECT_REQUEST);
}
