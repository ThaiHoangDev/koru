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
    yield put(ShopActions.InCreaseMyItem.success(payload));
  } catch (error) {
    yield put(ShopActions.InCreaseMyItem.fail(error));
  }
}

function* decreaseMyItemSaga({ payload }: any) {
  try {
    yield put(ShopActions.DecreaseMyItem.success(payload));
    // yield put(ShopActions.DecreaseMyItem.success(payload));
  } catch (error) {
    yield put(ShopActions.DecreaseMyItem.fail(error));
  }
}

function* deleteMyItemSaga({ payload }: any) {
  try {
    const newMyOrder = MY_ORDER_LIST_DATA.filter((item: any, index: number) => index !== payload);
    yield put(ShopActions.DeleteMyItem.success(newMyOrder));
  } catch (error) {
    yield put(ShopActions.DeleteMyItem.fail(error));
  }
}

export default function* fetchData() {
  yield takeLatest(ShopActions.Types.GET_MY_ORDER.begin, getMyOrderSaga);
  yield takeLatest(ShopActions.Types.INCREASE_MY_ITEM.begin, increaseMyItemSaga);
  yield takeLatest(ShopActions.Types.DECREASE_MY_ITEM.begin, decreaseMyItemSaga);
  yield takeLatest(ShopActions.Types.DELETE_MY_ITEM.begin, deleteMyItemSaga);
}
