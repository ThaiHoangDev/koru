import { put, takeLatest, call } from 'redux-saga/effects';
import { ToastAndroid } from 'react-native';
import EspIdfProvisioningReactNative from '@digitalfortress-dev/esp-idf-provisioning-react-native';
import { PairActions } from '../actions';
import * as apiService from '../services';
import { navigate, navigationRef } from '@Utils/navigator';
import { store } from '@Store/index';
import { showErrorMessage, showErrorWithString } from '@Utils/helper';
import { IS_ANDROID } from '@Constants/app';

function* scanNetworks() {
  EspIdfProvisioningReactNative.scanNetworks()
    .then((res: any[]) => {
      store.dispatch(PairActions.scanNetworks.success(res));
      IS_ANDROID && ToastAndroid.show('Number of networks found: ' + res.length, ToastAndroid.LONG);
    })
    .catch((e: any) => {
      store.dispatch(PairActions.scanNetworks.fail(e));
      showErrorWithString(e, () => {});
      IS_ANDROID && ToastAndroid.show('Scan networks error', ToastAndroid.LONG);
    });
}

function* provCreds({ payload }: any) {
  const { ssid, passwordWifi: password } = payload;
  console.log(payload, "____wifi")
  // try {
    yield EspIdfProvisioningReactNative.provisionNetwork(ssid, password)
      .then((resp: any) => {
        store.dispatch(PairActions.provCreds.success());
        navigate('TabBar');
      })
      .catch((e: any) => {
        console.log(e)
        store.dispatch(PairActions.provCreds.fail());
        navigate('MessageAlert', {
          visible: true,
          title: e?.message || 'Connect wifi error!',
          callBack: () => navigate('TabBar'),
        });
      });
  // } catch (error: any) {
  //   navigate('MessageAlert', {
  //     visible: true,
  //     title: error?.message || 'Connect wifi error!',
  //     callBack: () => navigationRef.current?.goBack(),
  //   });
  // }
}

function* provCustomWithByteData({ payload }: any) {
  const { uuid, secret } = payload;
  try {
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
        IS_ANDROID && ToastAndroid.show('Custom data with byte accuracy provisioned successfully', ToastAndroid.LONG);
        new Promise<void>((resolve, reject) => {
          navigate('ChooseWifi');
          resolve();
        });
      })
      .catch((e: { message: any }) => {
        showErrorMessage(e, () => {});
      });
  } catch (error) {
    showErrorMessage(error, () => {});
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
    yield EspIdfProvisioningReactNative.setProofOfPossession('abcd1234');
    yield put(PairActions.provCustomWithByteData.request(data.data));
  } catch (error: any) {
    navigate('MessageAlert', {
      visible: true,
      title: error?.message || 'Create plant failed!',
      callBack: () => navigationRef.current?.goBack(),
    });
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
