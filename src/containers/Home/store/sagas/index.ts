import { put, takeLatest, call, select } from 'redux-saga/effects';
import AWSSDK from 'aws-sdk';
import moment from 'moment';

import * as apiService from '../services';
import { HomeActions } from '../actions';
import { MORE_INFO_DATA } from '../constants';
import { MQTTConfig } from '@Utils/constants';
import { store } from '@Store/index';
import { navigate, navigationRef } from '@Utils/navigator';

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
            console.log(moment(test.state.reported.ts * 1000).format('yyyy, dd, hh:mm'), 'get shadow success');
            store.dispatch(
              HomeActions.updateListPlant({
                uuid: product.uuid,
                data: moment().diff(moment(test.state.reported.ts * 1000), 'minutes') < 3 ? test.state.reported : null,
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

function* removePlantSaga({ payload }: any): any {
  try {
    const res = yield call(apiService.removePlantService, payload);
    yield put(HomeActions.removePlant.success());
  } catch (error: any) {
    navigate('MessageAlert', { visible: true, title: error?.message || 'Remove plant failed!' });
    yield put(HomeActions.removePlant.fail());
  }
}
function* updatePlantSaga({ payload }: any): any {
  try {
    yield call(apiService.updatePlantService, payload);
    yield put(HomeActions.updatePlant.success());
    navigate('MessageAlert', {
      visible: true,
      title: 'Update plant success!',
      callBack: () => navigationRef.current?.goBack(),
    });
  } catch (error: any) {
    navigate('MessageAlert', { visible: true, title: error?.message || 'Update plant failed!' });
    yield put(HomeActions.updatePlant.fail(error));
  }
}

export default function* fetchData() {
  yield takeLatest(HomeActions.Types.GET_MY_PLANT.begin, getMyPlantSaga);
  yield takeLatest(HomeActions.Types.POST_FAN.begin, postFan);
  yield takeLatest(HomeActions.Types.GET_MORE_INFO.begin, getMoreInfoSaga);
  yield takeLatest(HomeActions.Types.GET_PLANT_STATE_HISTORY.begin, getPlantStateHistorySaga);
  yield takeLatest(HomeActions.Types.GET_THING_SHADOW.begin, getThingShadow);
  yield takeLatest(HomeActions.Types.REMOVE_PLANT.begin, removePlantSaga);
  yield takeLatest(HomeActions.Types.UPDATE_PLANT.begin, updatePlantSaga);
}
