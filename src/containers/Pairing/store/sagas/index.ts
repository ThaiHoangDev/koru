import { put, takeLatest, call } from 'redux-saga/effects';
import { ToastAndroid, PermissionsAndroid } from 'react-native';
import EspIdfProvisioningReactNative from '@digitalfortress-dev/esp-idf-provisioning-react-native';
import { PairActions } from '../actions';
import * as apiService from '../services';

function* scanDevicesSaga({ payload }: any) {
  yield PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION!);
  console.log('scan init');
  EspIdfProvisioningReactNative.scanBleDevices('SPOT_')
    .then((res: string | any[]) => {
      console.log(res, 'scan data____');
      if (res.length > 0) {
        // put(PairActions.scanDevices.success(res[0].serviceUuid));
        EspIdfProvisioningReactNative.connectToBLEDevice(res[0].serviceUuid)
          .then((_res: any) => {
            ToastAndroid.show('Connected to device', ToastAndroid.LONG);
          })
          .catch((e: any) => {
            ToastAndroid.show('Connect to device error', ToastAndroid.LONG);
            console.log(e);
          });
      } else {
        put(PairActions.scanDevices.fail(''));
      }
    })
    .catch((e: any) => {
      console.log(e);
    });
}

function* scanNetworks({ payload }: any) {
  EspIdfProvisioningReactNative.scanNetworks()
    .then((res: any[]) => {
      console.log(res, 'netWorks__________');
      ToastAndroid.show('Number of networks found: ' + res.length, ToastAndroid.LONG);
    })
    .catch((e: any) => {
      ToastAndroid.show('Scan networks error', ToastAndroid.LONG);
      console.log(e);
    });
}

function* getListPlantSaga({ payload }: any): any {
  try {
    const { page, perpage, search } = payload;
    console.log(payload, 'getLIstttt');
    const data = yield call(apiService.getListPlantApi, payload);
    console.log(data, 'hhh___');
    // yield put(PairActions.getListPlant.success(data));
  } catch (error) {
    console.log(error, 'nnnn');
    yield put(PairActions.getListPlant.fail(error));
  }
}

export default function* fetchData() {
  yield takeLatest(PairActions.Types.GET_LIST_PLANT.begin, getListPlantSaga);
}
