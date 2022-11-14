import { put, takeLatest, call } from 'redux-saga/effects';
import { Auth } from 'aws-amplify';
import AWSSDK from 'aws-sdk';

import * as apiService from '../services';
import { HomeActions } from '../actions';
import { MORE_INFO_DATA } from '../constants';
import { MQTTConfig } from '@Utils/constants';
import { store } from '@Store/index';
import { MQTTActions } from '@Containers/MQTT/store/actions';

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

function* attachPolicySaga({ payload }: any): any {
  try {
    const data = yield Auth.currentCredentials();
    const iotSDK = new AWSSDK.IotData({
      endpoint: MQTTConfig.host,
    });
    yield call(apiService.attachPolicyService, data.identityId);
    yield put(MQTTActions.subscriptionMQTT.request('$aws/things/+/shadow/update/accepted'));
    yield Promise.all(
      Object.values(payload).map(async (product: any) => {
        return await iotSDK.getThingShadow({ thingName: `${product.uuid}` }, async function (err, data: any) {
          if (err) {
            store.dispatch(
              HomeActions.updateListPlant({
                uuid: product.uuid,
                data: null,
              }),
            );
          } else {
            const test = JSON.parse(data?.payload);
            store.dispatch(
              HomeActions.updateListPlant({
                uuid: product.uuid,
                data: test.state,
              }),
            );
          }
        });
      }),
    );
    put(HomeActions.attachPolicy.success());
  } catch (error) {
    put(HomeActions.attachPolicy.fail(error));
  }
}

export default function* fetchData() {
  yield takeLatest(HomeActions.Types.GET_MY_PLANT.begin, getMyPlantSaga);
  yield takeLatest(HomeActions.Types.POST_FAN.begin, postFan);
  yield takeLatest(HomeActions.Types.GET_MORE_INFO.begin, getMoreInfoSaga);
  yield takeLatest(HomeActions.Types.ATTACH_POLICY.begin, attachPolicySaga);
}
