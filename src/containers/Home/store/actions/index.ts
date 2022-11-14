import { actionTypesFactory } from 'redux-action-type-factory';
import { createAction } from 'redux-actions';

import { createActionGenerator } from '@Utils/actionGenerator';

export namespace HomeActions {
  export const Types = actionTypesFactory(
    'Home',
    'GET_MY_PLANT',
    'POST_FAN',
    'GET_MORE_INFO',
    'UPDATE_LIST_PLANT',
    'ATTACH_POLICY',
  );

  export const getMyPlant = createActionGenerator(Types.GET_MY_PLANT);
  export const postFan = createActionGenerator(Types.POST_FAN);
  export const getMoreInfo = createActionGenerator(Types.GET_MORE_INFO);
  export const attachPolicy = createActionGenerator(Types.ATTACH_POLICY);
  export const updateListPlant = createAction(Types.UPDATE_LIST_PLANT.default);
}
