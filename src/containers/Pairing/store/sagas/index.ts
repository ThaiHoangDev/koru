import { put, takeLatest, call } from 'redux-saga/effects';
import { ToastAndroid, PermissionsAndroid } from 'react-native';
import EspIdfProvisioningReactNative from '@digitalfortress-dev/esp-idf-provisioning-react-native';
import { PairActions } from '../actions';
import * as apiService from '../services';
import { navigate } from '@Utils/navigator';
import { store } from '@Store/index';
import { showErrorWithString } from '@Utils/helper';

function* scanDevicesSaga({ payload }: any) {}

function* scanNetworks() {
  EspIdfProvisioningReactNative.scanNetworks()
    .then((res: any[]) => {
      console.log(res, 'netWorks__________');
      store.dispatch(PairActions.scanNetworks.success(res));
      ToastAndroid.show('Number of networks found: ' + res.length, ToastAndroid.LONG);
    })
    .catch((e: any) => {
      store.dispatch(PairActions.scanNetworks.fail(e));
      showErrorWithString(e, () => {});
      ToastAndroid.show('Scan networks error', ToastAndroid.LONG);
      console.log(e);
    });
}

function* provCreds({ payload }: any) {
  try {
    const { ssid, passwordWifi } = payload;
    yield EspIdfProvisioningReactNative.provisionNetwork(ssid, passwordWifi)
      .then((resp: any) => {
        navigate('TabBar');
        store.dispatch(PairActions.provCreds.success());
        ToastAndroid.show('Credentials provided with success', ToastAndroid.LONG);
      })
      .catch((e: any) => {
        store.dispatch(PairActions.provCreds.fail());
        ToastAndroid.show('Provide creds error', ToastAndroid.LONG);
        console.log(e);
      });
  } catch (error) {}
}

function* provCustomWithByteData({ payload }: any) {
  const { uuid, secret } = payload;
  try {
    yield EspIdfProvisioningReactNative.setProofOfPossession('abcd1234');
    const string = `https://dev.api.plantkoru.com/plant/v1/plants/${uuid}/certificate?secret=${secret}`;
    const strToBuf = (str: string) => {
      var buf = new ArrayBuffer(str.length);
      var bufView = new Uint8Array(buf);
      for (let i = 0; i < str.length; i++) {
        bufView[i] = str.charCodeAt(i);
      }
      return bufView;
    };
    const stringAsByteArray = strToBuf(string);
    const hexArrayOfCmdContent = Object.keys(stringAsByteArray).map(i => stringAsByteArray[Number(i)]!.toString(16));
    yield EspIdfProvisioningReactNative.sendCustomDataWithByteData('certificatePem', hexArrayOfCmdContent)
      .then((resp: any) => {
        ToastAndroid.show('Custom data with byte accuracy provisioned successfully', ToastAndroid.LONG);
        navigate('ChooseWifi');
      })
      .catch((e: { message: any }) => {
        console.log(e && e.message ? e.message : 'error querying live data');
      });
  } catch (error) {
    console.log(error, 'error querying live data22');
  }
}

function* getListPlantSaga({ payload }: any): any {
  try {
    const { data } = yield call(apiService.getListPlantApi, payload);
    yield put(PairActions.getListPlant.success(data));
  } catch (error) {
    yield put(PairActions.getListPlant.fail(error));
  }
}
function* getListPlantGroupSaga({ payload }: any): any {
  try {
    const { data } = yield call(apiService.getListPlantGroupApi, payload);
    yield put(PairActions.getListPlantGroup.success(data));
  } catch (error) {
    yield put(PairActions.getListPlantGroup.fail(error));
  }
}

function* createPlantSaga({ payload }: any) {
  try {
    const { data } = yield call(apiService.createPlantApi, payload);
    yield put(PairActions.createPlant.success(data));
    yield put(PairActions.provCustomWithByteData.request(data.data));
    yield;
  } catch (error) {
    console.log(error, 'create plant errror____');
    yield put(PairActions.createPlant.fail(error));
  }
}

export default function* fetchData() {
  yield takeLatest(PairActions.Types.GET_LIST_PLANT.begin, getListPlantSaga);
  yield takeLatest(PairActions.Types.GET_LIST_PLANT_GROUP.begin, getListPlantGroupSaga);
  yield takeLatest(PairActions.Types.CREATE_PLANT.begin, createPlantSaga);
  yield takeLatest(PairActions.Types.PROV_CUSTOM.begin, provCustomWithByteData);
  yield takeLatest(PairActions.Types.SCAN_NETWORKS.begin, scanNetworks);
  yield takeLatest(PairActions.Types.PROV_CREDS.begin, provCreds);
}
