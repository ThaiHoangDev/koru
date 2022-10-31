import { put, takeLatest, call } from 'redux-saga/effects';
import { ToastAndroid, PermissionsAndroid } from 'react-native';
import EspIdfProvisioningReactNative from '@digitalfortress-dev/esp-idf-provisioning-react-native';
import { PairActions } from '../actions';
import * as apiService from '../services';
import { navigate } from '@Utils/navigator';

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

function* provCustomWithByteData({ payload }: any) {
  const { bluetooth_uid, secret } = payload;
  console.log(payload,"secret")
  try {
    yield EspIdfProvisioningReactNative.setProofOfPossession('abcd1234');
    const string = `https://dev.api.plantkoru.com/plant/v1/plants/${bluetooth_uid}/certificate?secret=${secret}`;
    const strToBuf = (str: string) => {
      var buf = new ArrayBuffer(str.length);
      var bufView = new Uint8Array(buf);
      for (let i = 0; i < str.length; i++) {
        bufView[i] = str.charCodeAt(i);
      }
      return bufView;
    };
    const stringAsByteArray = strToBuf(string);
    console.log(stringAsByteArray);
    const hexArrayOfCmdContent = Object.keys(stringAsByteArray).map(i => stringAsByteArray[Number(i)]!.toString(16));
    console.log('hexArrayOfCmdContent: ', JSON.stringify(hexArrayOfCmdContent)); // ["52", "0"]
    yield EspIdfProvisioningReactNative.sendCustomDataWithByteData('certificatePem', hexArrayOfCmdContent)
      .then((resp: any) => {
        const data = JSON.parse(resp.data.substring(8));
        ToastAndroid.show('Custom data with byte accuracy provisioned successfully', ToastAndroid.LONG);
        navigate('ChooseWifi');
        console.log(data);
      })
      .catch((e: { message: any }) => {
        console.log(e && e.message ? e.message : 'error querying live data');
      });
  } catch (error) {}
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
    console.log(data, 'creDATA______');
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
}
