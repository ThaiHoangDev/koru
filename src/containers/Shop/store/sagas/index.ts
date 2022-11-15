import { put, takeLatest, call } from 'redux-saga/effects';

// import * as apiService from '../services';

import { ShopActions } from '../actions';
import { MY_ORDER_LIST_DATA } from '../constant';

function* getMyOrderSaga({ payload }: any) {
  try {
    // const { data } = yield call(apiService.getMyPlantAPI, payload);
    yield put(ShopActions.getMyOrder.success(MY_ORDER_LIST_DATA));
  } catch (error) {
    yield put(ShopActions.getMyOrder.fail(error));
  }
}

function* increaseMyItemSaga({ payload }: any) {
  try {
    yield put(ShopActions.inCreaseMyItem.success(payload));
  } catch (error) {
    yield put(ShopActions.inCreaseMyItem.fail(error));
  }
}

function* decreaseMyItemSaga({ payload }: any) {
  try {
    yield put(ShopActions.decreaseMyItem.success(payload));
    // yield put(ShopActions.DecreaseMyItem.success(payload));
  } catch (error) {
    yield put(ShopActions.decreaseMyItem.fail(error));
  }
}

function* deleteMyItemSaga({ payload }: any) {
  try {
    const newMyOrder = MY_ORDER_LIST_DATA.filter((item: any, index: number) => index !== payload);
    yield put(ShopActions.deleteMyItem.success(newMyOrder));
  } catch (error) {
    yield put(ShopActions.deleteMyItem.fail(error));
  }
}

function* addToCardSaga({ payload }: any) {
  try {
    yield put(ShopActions.addToCard.success(payload));
  } catch (error) {
    yield put(ShopActions.addToCard.fail(error));
  }
}

export default function* fetchData() {
  yield takeLatest(ShopActions.Types.GET_MY_ORDER.begin, getMyOrderSaga);
  yield takeLatest(ShopActions.Types.INCREASE_MY_ITEM.begin, increaseMyItemSaga);
  yield takeLatest(ShopActions.Types.DECREASE_MY_ITEM.begin, decreaseMyItemSaga);
  yield takeLatest(ShopActions.Types.DELETE_MY_ITEM.begin, deleteMyItemSaga);
  yield takeLatest(ShopActions.Types.ADD_TO_CARD.begin, addToCardSaga);
}
