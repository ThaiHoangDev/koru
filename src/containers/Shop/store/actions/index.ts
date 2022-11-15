import { actionTypesFactory } from 'redux-action-type-factory';
import { createAction } from 'redux-actions';

import { createActionGenerator } from '@Utils/actionGenerator';

export namespace ShopActions {
  export const Types = actionTypesFactory(
    'Shop',
    'GET_MY_ORDER',
    'INCREASE_MY_ITEM',
    'DECREASE_MY_ITEM',
    'DELETE_MY_ITEM',
    'ADD_TO_CARD',
  );

  export const getMyOrder = createActionGenerator(Types.GET_MY_ORDER);
  export const inCreaseMyItem = createActionGenerator(Types.INCREASE_MY_ITEM);
  export const decreaseMyItem = createActionGenerator(Types.DECREASE_MY_ITEM);
  export const deleteMyItem = createActionGenerator(Types.DELETE_MY_ITEM);
  export const addToCard = createActionGenerator(Types.ADD_TO_CARD);
}
