import { put, takeLatest, call } from 'redux-saga/effects';
import * as apiService from '../services';
import { HomeActions } from '../actions';
import { MORE_INFO_DATA } from '../constants';

function* getMyPlantSaga({ payload }: any) {
  try {
    const { data } = yield call(apiService.getMyPlantAPI, payload);
    yield put(HomeActions.getMyPlant.success(data));
  } catch (error) {
    yield put(HomeActions.getMyPlant.fail(error));
  }
}

function* postFan({ payload }: any) {
  const body = { fan: Number(payload) };
  try {
    yield call(apiService.postJanAPI, body);
    yield put(HomeActions.postFan.success());
  } catch (error) {
    yield put(HomeActions.postFan.fail(error));
  }
}
function* getMoreInfoSaga({ payload }: any) {
  try {
    yield put(HomeActions.getMoreInfo.success(MORE_INFO_DATA));
  } catch (error) {
    yield put(HomeActions.getMoreInfo.fail(error));
  }
}

export default function* fetchData() {
  yield takeLatest(HomeActions.Types.GET_MY_PLANT.begin, getMyPlantSaga);
  yield takeLatest(HomeActions.Types.POST_FAN.begin, postFan);
  yield takeLatest(HomeActions.Types.GET_MORE_INFO.begin, getMoreInfoSaga);
}
