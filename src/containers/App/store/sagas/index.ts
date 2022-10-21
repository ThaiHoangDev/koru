import { takeLatest, put, take, call } from 'redux-saga/effects';
import bluetoothLeManager from '@Utils/blueManager';
import { AnyAction } from 'redux';

import { AppActions } from '../actions';
import { Device } from 'react-native-ble-plx';
import { END, eventChannel, TakeableChannel } from 'redux-saga';

function* initializeSaga() {
  try {
    yield put(AppActions.initApp.success({ isLoggedIn: false }));
  } catch (error) {
    console.log(error);
  }
}
type TakeableDevice = {
  payload: { id: string; name: string; serviceUUIDs: string };
  take: (cb: (message: any | END) => void) => Device;
};
// function* watchForPeripherals(): Generator<AnyAction, void, TakeableDevice> {
//   const onDiscoveredPeripheral = () =>
//     eventChannel(emitter => {
//       return bluetoothLeManager.scanForPeripherals(emitter);
//     });

//   const channel: TakeableChannel<Device> = yield call(onDiscoveredPeripheral);

//   try {
//     while (true) {
//       const response = yield take(channel);

//       console.log(response, 'chanel_____');

//       // yield put({
//       //   type: sagaActionConstants.ON_DEVICE_DISCOVERED,
//       //   payload: {
//       //     id: response.payload.id,
//       //     name: response.payload.name,
//       //     serviceUUIDs: response.payload.serviceUUIDs,
//       //   },
//       // });
//     }
//   } catch (e) {
//     console.log(e);
//   }
// }

function* connectToPeripheral(action: { type: typeof AppActions.Types.INITIATE_CONNECTION; payload: string }) {
  const peripheralId = action.payload;
  yield call(bluetoothLeManager.connectToPeripheral, peripheralId);
  yield put(AppActions.bluInitApp.success(peripheralId));
}

export default function* watchSaga() {
  yield takeLatest(AppActions.Types.INIT_APP.begin, initializeSaga);
  // yield takeLatest(AppActions.Types.SCAN_FOR_PERIPHERALS.begin, watchForPeripherals);
  yield takeLatest(AppActions.Types.INITIATE_CONNECTION.begin, connectToPeripheral);
}
