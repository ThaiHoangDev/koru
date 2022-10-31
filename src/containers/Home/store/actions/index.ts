import { actionTypesFactory } from 'redux-action-type-factory';
import { createAction } from 'redux-actions';

import { createActionGenerator } from '@Utils/actionGenerator';

export namespace HomeActions {
  export const Types = actionTypesFactory('Home', 'GET_MY_PLANT');

  export const getMyPlant = createActionGenerator(Types.GET_MY_PLANT);
}
