import { takeLatest, put, take, call } from 'redux-saga/effects';
import { AnyAction } from 'redux';
import axiosClient from '@Utils/axios';
import asyncStorage from '@Utils/asyncStorage';

import { AppActions } from '../actions';
import { Device } from 'react-native-ble-plx';
import { END, eventChannel, TakeableChannel } from 'redux-saga';

import { TOKEN_NAME, } from '@Constants/app';

function* initializeSaga(): any {
  try {
    const userToken = yield asyncStorage.getItem(TOKEN_NAME);
    const token = JSON.parse(userToken);
    const isLoggedIn = !!token;
    if (isLoggedIn) {
      yield axiosClient.setHeader(token);
    }
    yield put(AppActions.initApp.success({ isLoggedIn }));
  } catch (error) {
    console.log(error);
  }
}
type TakeableDevice = {
  payload: { id: string; name: string; serviceUUIDs: string; };
  take: (cb: (message: any | END) => void) => Device;
};

export default function* watchSaga() {
  yield takeLatest(AppActions.Types.INIT_APP.begin, initializeSaga);
}
