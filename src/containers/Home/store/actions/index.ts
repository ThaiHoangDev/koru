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
    'GET_PLANT_STATE_HISTORY',
    'GET_THING_SHADOW',
    'REMOVE_PLANT',
    'UPDATE_PLANT',
  );

  export const getMyPlant = createActionGenerator(Types.GET_MY_PLANT);
  export const postFan = createActionGenerator(Types.POST_FAN);
  export const getMoreInfo = createActionGenerator(Types.GET_MORE_INFO);
  export const getThingShadow = createActionGenerator(Types.GET_THING_SHADOW);
  export const removePlant = createActionGenerator(Types.REMOVE_PLANT);
  export const updatePlant = createActionGenerator(Types.UPDATE_PLANT);
  export const updateListPlant = createAction(Types.UPDATE_LIST_PLANT.default);
  export const getPlantStateHistory = createActionGenerator(Types.GET_PLANT_STATE_HISTORY);
}
