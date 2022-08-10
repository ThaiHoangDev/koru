import { put, takeLatest, call } from 'redux-saga/effects';
import { Alert } from 'react-native';

import axiosClient from '@Utils/axios';
import asyncStorage from '@Utils/asyncStorage';
import { REFRESH_TOKEN, TOKEN_NAME } from '@Constants/app';
import i18n from '@I18N';

import { AppActions } from '@Containers/App/store/actions'
import * as apiService from '../services';
import { AuthActions } from '../actions';
import { LoginAction } from '../../interfaces';

function* loginSaga({ payload }: LoginAction) {
  try {
    const { data } = yield call(apiService.login, payload);
    const { access_token, refresh_token } = data;

    axiosClient.setHeader(access_token);
    asyncStorage.setItem(TOKEN_NAME, access_token);
    asyncStorage.setItem(REFRESH_TOKEN, refresh_token);

    yield put(AuthActions.login.success());
    yield put(AppActions.fetchProfile.request());
  } catch (error) {
    const { data: { message } } = error;
    Alert.alert(i18n.t('common:error'), i18n.t(`auth:${message.trim()}`));
    yield put(AuthActions.login.fail(error));
  }
}

export default function* fetchData() {
  yield takeLatest(AuthActions.Types.LOGIN.begin, loginSaga);
}
