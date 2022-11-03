import { takeLatest, put, take, call } from 'redux-saga/effects';
import { AnyAction } from 'redux';
import axiosClient from '@Utils/axios';
import asyncStorage from '@Utils/asyncStorage';
import * as apiService from '../../../Auth/store/services';

import { AppActions } from '../actions';
import { Device } from 'react-native-ble-plx';
import { END, eventChannel, TakeableChannel } from 'redux-saga';

import { REFRESH_TOKEN, TOKEN_NAME } from '@Constants/app';

function* initializeSaga(): any {
  try {
    const userToken = yield asyncStorage.getItem(TOKEN_NAME);
    const token = yield JSON.parse(userToken);
    const isLoggedIn = !!token;
    console.log(token,"too__")
    if (isLoggedIn) {
      yield axiosClient.setHeader(token);
    }
    yield put(AppActions.initApp.success({ isLoggedIn }));
  } catch (error) {
    yield put(AppActions.initApp.fail());
  }
}

type TakeableDevice = {
  payload: { id: string; name: string; serviceUUIDs: string };
  take: (cb: (message: any | END) => void) => Device;
};

function* refreshTokenSaga(): any {
  console.log('refresh____2');
  try {
    const refreshToken = yield asyncStorage.getItem(REFRESH_TOKEN);
    const { data } = yield call(apiService.refreshToken, { refresh_token: JSON.parse(refreshToken) });
    console.log(data, 'dataaa');
    axiosClient.setHeader(data.access_token);
    asyncStorage.setItem(TOKEN_NAME, data.access_token);
    yield put(AppActions.refreshToken.success());
  } catch (error) {
    console.log(error, 'jkljkjjIIII');
    yield put(AppActions.refreshToken.fail());
    yield put(AppActions.initApp.success({ isLoggedIn: false }));
  }
}

export default function* watchSaga() {
  yield takeLatest(AppActions.Types.INIT_APP.begin, initializeSaga);
  yield takeLatest(AppActions.Types.REFRESH_TOKEN.begin, refreshTokenSaga);
}
