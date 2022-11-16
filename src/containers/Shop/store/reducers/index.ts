import produce from 'immer';
import { uniqBy } from 'lodash';

import { ShopActions } from '../actions';
import { IMyOrderList } from '../constant';

type ACTION = {
  type: string;
  payload: any;
};

export interface IPayload {
  isLoading: boolean;
  myOrder: any;
}

// The initial state of the Login container
export const initialState: IPayload = {
  isLoading: true,
  myOrder: [],
};

const shopReducer = (state = initialState, { type, payload }: ACTION) =>
  produce(state, draft => {
    switch (type) {
      case ShopActions.Types.GET_MY_ORDER.begin:
        draft.isLoading = true;
        draft.myOrder = payload;
        break;
      case ShopActions.Types.GET_MY_ORDER.succeeded:
        draft.isLoading = false;
        draft.myOrder = payload;
        break;
      case ShopActions.Types.GET_MY_ORDER.failed:
        draft.isLoading = false;
        break;
      // Increase Item
      case ShopActions.Types.INCREASE_MY_ITEM.begin:
        const increment = draft.myOrder.filter(
          (item: IMyOrderList) => (item.uuid === payload.uuid && ++item.quantity) || item,
        );
        draft.isLoading = true;
        draft.myOrder = increment;
        break;
      case ShopActions.Types.INCREASE_MY_ITEM.succeeded:
        const incrementt = draft.myOrder.filter(
          (item: IMyOrderList) => (item.uuid === payload.uuid && item.quantity) || item,
        );
        draft.isLoading = false;
        draft.myOrder = incrementt;
        break;
      case ShopActions.Types.INCREASE_MY_ITEM.failed:
        draft.isLoading = false;
        break;
      // Decrease Item
      case ShopActions.Types.DECREASE_MY_ITEM.begin:
        const decrement = draft.myOrder.filter(
          (item: IMyOrderList) => (item.uuid === payload.uuid && --item.quantity) || item,
        );
        draft.isLoading = true;
        draft.myOrder = decrement;
        break;
      case ShopActions.Types.DECREASE_MY_ITEM.succeeded:
        const decrementt = draft.myOrder.filter(
          (item: IMyOrderList) => (item.uuid === payload.uuid && item.quantity) || item,
        );
        draft.isLoading = false;
        draft.myOrder = decrementt;
        break;
      case ShopActions.Types.DECREASE_MY_ITEM.failed:
        draft.isLoading = false;
        break;
      // Delete Item
      case ShopActions.Types.DELETE_MY_ITEM.begin:
        const deleteItem = draft.myOrder.filter((item: IMyOrderList) => item.uuid !== payload.uuid);
        draft.isLoading = true;
        draft.myOrder = deleteItem;
        break;
      case ShopActions.Types.DELETE_MY_ITEM.succeeded:
        const deleteItemm = draft.myOrder.filter((item: IMyOrderList) => item.uuid !== payload.uuid);
        draft.isLoading = false;
        draft.myOrder = deleteItemm;
        break;
      case ShopActions.Types.DELETE_MY_ITEM.failed:
        draft.isLoading = false;
        break;
      // Add To Card
      case ShopActions.Types.ADD_TO_CARD.begin:
        const add = draft.myOrder.filter((item: IMyOrderList) => (item.uuid === payload ? ++item.quantity : payload));
        draft.isLoading = true;
        draft.myOrder = add;
        break;
      case ShopActions.Types.ADD_TO_CARD.succeeded:
        draft.isLoading = false;
        draft.myOrder = [...draft.myOrder, { ...draft.myOrder[0], uuid: payload }];
        break;
      case ShopActions.Types.ADD_TO_CARD.failed:
        draft.isLoading = false;
        break;
      default:
        break;
    }
  });

export default shopReducer;
