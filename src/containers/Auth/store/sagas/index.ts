import { showErrorWithString, showConfirmationAlert } from './../../../../utils/helper';
import { put, takeLatest, call } from 'redux-saga/effects';
import { Alert } from 'react-native';
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import axiosClient from '@Utils/axios';
import asyncStorage from '@Utils/asyncStorage';
import { REFRESH_TOKEN, TOKEN_NAME } from '@Constants/app';
import i18n from '@I18N';

import * as apiService from '../services';
import { AuthActions } from '../actions';
import { LoginAction } from '../../interfaces';
import { cognitoPool } from '@Utils/amplifyConfig';

function* loginSaga({ payload }: LoginAction) {
  try {
    const { data } = yield call(apiService.login, payload);
    const { access_token, refresh_token } = data;

    // axiosClient.setHeader(access_token);
    // asyncStorage.setItem(TOKEN_NAME, access_token);
    // asyncStorage.setItem(REFRESH_TOKEN, refresh_token);

    yield put(AuthActions.login.success());
    // yield put(AppActions.fetchProfile.request());
  } catch (error: any) {
    // const {
    //   data: { message },
    // } = error;
    // Alert.alert(i18n.t('common:error'), i18n.t(`auth:${message.trim()}`));
    yield put(AuthActions.login.fail(error));
  }
}
function* signUpSaga({ payload }: LoginAction) {
  console.log(payload, 'pa____');
  const { username, password } = payload;
  try {
    yield cognitoPool.signUp(username, password, [], [], (err, data) => {
      if (err) {
        switch (err.name) {
          case 'InvalidParameterException':
            return showErrorWithString('invalid email');
          case 'InvalidPasswordException':
            return showErrorWithString('Invalid password');
          case 'UsernameExistsException':
            return showErrorWithString('Email Already Exists');
          default:
            return showErrorWithString('Something Went Wrong');
        }
      }
      console.log(data, 'UUU_____');
      put(AuthActions.register.success());
    });
    // const { data } = yield call(apiService.login, payload);
    // const { access_token, refresh_token } = data;

    // axiosClient.setHeader(access_token);
    // asyncStorage.setItem(TOKEN_NAME, access_token);
    // asyncStorage.setItem(REFRESH_TOKEN, refresh_token);

    // yield put(AppActions.fetchProfile.request());
  } catch (error: any) {
    console.log(error, 'HHHUJHHHHH_____');

    // const {
    //   data: { message },
    // } = error;
    // Alert.alert(i18n.t('common:error'), i18n.t(`auth:${message.trim()}`));
    yield put(AuthActions.register.fail(error));
  }
}

export default function* fetchData() {
  yield takeLatest(AuthActions.Types.LOGIN.begin, loginSaga);
  yield takeLatest(AuthActions.Types.REGISTER.begin, signUpSaga);
}
