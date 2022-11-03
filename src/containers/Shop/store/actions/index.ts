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
  );

  export const getMyOrder = createActionGenerator(Types.GET_MY_ORDER);
  export const InCreaseMyItem = createActionGenerator(Types.INCREASE_MY_ITEM);
  export const DecreaseMyItem = createActionGenerator(Types.DECREASE_MY_ITEM);
  export const DeleteMyItem = createActionGenerator(Types.DELETE_MY_ITEM);
}
