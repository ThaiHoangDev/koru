import { put, takeLatest, call, select } from 'redux-saga/effects';
import AWSSDK from 'aws-sdk';

import * as apiService from '../services';
import { HomeActions } from '../actions';
import { MORE_INFO_DATA } from '../constants';
import { MQTTConfig } from '@Utils/constants';
import { store } from '@Store/index';

function* getMyPlantSaga({ payload }: any) {
  try {
    const { data } = yield call(apiService.getMyPlantAPI, payload);
    yield put(HomeActions.getMyPlant.success(data));
    yield put(HomeActions.getThingShadow.request());
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
function* getPlantStateHistorySaga({ payload }: any) {
  try {
    const { data } = yield call(apiService.getPlantStateHistoryAPI, payload);
    yield put(HomeActions.getPlantStateHistory.success(data.states));
  } catch (error) {
    yield put(HomeActions.getPlantStateHistory.fail(error));
  }
}

function* getThingShadow({ payload }: any): any {
  const username = yield select((state: any) => state.home.myPlant);
  try {
    const iotSDK = yield new AWSSDK.IotData({
      endpoint: MQTTConfig.host,
    });
    yield Promise.all(
      Object.values(username).map(async (product: any) => {
        return await iotSDK.getThingShadow({ thingName: `${product.uuid}` }, async function (err: any, data: any) {
          if (err) {
            store.dispatch(
              HomeActions.updateListPlant({
                uuid: product.uuid,
                data: null,
              }),
            );
            console.log(err, 'errrrorrrr');
          } else {
            const test = JSON.parse(data?.payload);
            console.log(test, 'test_____');
            store.dispatch(
              HomeActions.updateListPlant({
                uuid: product.uuid,
                data: test.state.reported,
              }),
            );
          }
        });
      }),
    );
  } catch (error) {
    console.log('GET_THING_SHADOW_ errrr');
  }
}

export default function* fetchData() {
  yield takeLatest(HomeActions.Types.GET_MY_PLANT.begin, getMyPlantSaga);
  yield takeLatest(HomeActions.Types.POST_FAN.begin, postFan);
  yield takeLatest(HomeActions.Types.GET_MORE_INFO.begin, getMoreInfoSaga);
  yield takeLatest(HomeActions.Types.GET_PLANT_STATE_HISTORY.begin, getPlantStateHistorySaga);
  yield takeLatest(HomeActions.Types.GET_THING_SHADOW.begin, getThingShadow);
}
