import { Auth } from 'aws-amplify';
import { takeLatest, put, take, call } from 'redux-saga/effects';

import { SettingActions } from '../actions';
import asyncStorage from '@Utils/asyncStorage';

import { REFRESH_TOKEN, TOKEN_NAME } from '@Constants/app';
import { AppActions } from '@Containers/App/store/actions';

function* logoutSaga(): any {
  try {
    yield Auth.signOut();
    asyncStorage.removeItem(TOKEN_NAME);
    asyncStorage.removeItem(REFRESH_TOKEN);
    yield put(AppActions.initApp.success({ isLoggedIn: false }));
    yield put(SettingActions.logout.success());
  } catch (error) {
    console.log('logout error');
    yield put(SettingActions.logout.fail(error));
  }
}

export default function* fetchData() {
  yield takeLatest(SettingActions.Types.LOGOUT.begin, logoutSaga);
}
