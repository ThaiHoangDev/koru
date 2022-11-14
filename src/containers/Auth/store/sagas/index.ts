import { AuthenticationDetails, CognitoUserAttribute, CognitoUser } from 'amazon-cognito-identity-js';
import { put, takeLatest, call } from 'redux-saga/effects';
import { Auth } from 'aws-amplify';
import { AppActions } from '@Containers/App/store/actions';

import axiosClient from '@Utils/axios';
import asyncStorage from '@Utils/asyncStorage';
import { cognitoPool } from '@Utils/amplifyConfig';
import { navigate } from '@Utils/navigator';
import { store } from '@Store/index';

import { REFRESH_TOKEN, TOKEN_NAME } from '@Constants/app';

import * as apiService from '../services';
import { AuthActions } from '../actions';
import { LoginAction } from '../../interfaces';
import { showErrorMessage, showErrorWithString } from './../../../../utils/helper';

function* loginApiSaga({ payload }: any) {
  const { cognitoToken } = payload;

  try {
    const { data } = yield call(apiService.login, { cognito_token: cognitoToken.jwtToken });
    const { access_token, refresh_token } = data;
    axiosClient.setHeader(access_token);
    asyncStorage.setItem(TOKEN_NAME, access_token);
    asyncStorage.setItem(REFRESH_TOKEN, refresh_token);
    yield put(AppActions.initApp.success({ isLoggedIn: true }));
    yield put(AuthActions.login.success());
    // yield put(AuthActions.fetchProfile.request());
  } catch (error) {
    console.log(error, 'login error');
    yield put(AuthActions.login.fail({ errors: error }));
  }
}

function* loginCognitoSaga({ payload }: LoginAction): any {
  const { email = '', password } = payload;
  try {
    const authenticationData = {
      Username: email,
      Password: password,
    };
    const userData = {
      Username: email,
      Pool: cognitoPool,
    };
    const user = yield Auth.signIn({ username: email, password });
    const cognitoToken = user.signInUserSession.accessToken;
    store.dispatch(AuthActions.loginApi.request({ cognitoToken }));
  } catch (error: any) {
    showErrorMessage(error, () => {});
    yield put(AuthActions.login.fail(error));
  }
}

function* signUpCognitoSaga({ payload }: LoginAction): any {
  const { username = '', password, email } = payload;
  try {
    let attributeList = [];
    const dataEmail = {
      Name: 'email',
      Value: email,
    };
    const dataName = {
      Name: 'name',
      Value: username,
    };
    const attributeEmail = yield new CognitoUserAttribute(dataEmail);
    const attributeName = yield new CognitoUserAttribute(dataName);
    yield attributeList.push(attributeEmail);
    yield attributeList.push(attributeName);
    yield cognitoPool.signUp(email, password, attributeList, [], function (err, data) {
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
      navigate('Email', { payload });
    });
  } catch (error: any) {
    yield put(AuthActions.registerCognito.fail({ errors: error }));
  }
}

function* confirmSignUpSaga({ payload }: any) {
  const { code, username = '', password, email } = payload;
  try {
    const userData = {
      Username: email,
      Pool: cognitoPool,
    };
    const cognitoUser = new CognitoUser(userData);
    yield cognitoUser.confirmRegistration(code, true, (err, result) => {
      if (err) {
        console.log(payload, 'pppprrrrr', err);
        store.dispatch(AuthActions.verifyCode.fail({ errors: err }));
        return;
      }
      store.dispatch(AuthActions.login.request({ password, email }));
      navigate('Intro');
    });
  } catch (error) {
    yield put(AuthActions.verifyCode.fail({ errors: error }));
  }
}

function* reSendEmailVeriSaga({ payload }: any) {
  try {
    const userData = {
      Username: payload.email,
      Pool: cognitoPool,
    };
    const cognitoUser = new CognitoUser(userData);
    yield cognitoUser.resendConfirmationCode(function (err, result) {
      if (err) {
        return;
      }
      store.dispatch(AuthActions.resendEmailVerification.success());
    });
  } catch (error) {
    yield put(AuthActions.resendEmailVerification.fail({ errors: error }));
  }
}

function* refreshTokenSaga(): any {
  console.log('refresh____');
  try {
    const refreshToken = yield asyncStorage.getItem(REFRESH_TOKEN);
    const { data } = yield call(apiService.refreshToken, { refresh_token: JSON.parse(refreshToken) });
    axiosClient.setHeader(data.access_token);
    asyncStorage.setItem(TOKEN_NAME, data.access_token);
    yield put(AuthActions.refreshToken.success());
  } catch (error) {
    console.log(error, 'jkljkjjIIII');
    yield put(AuthActions.refreshToken.fail());
    yield put(AppActions.initApp.success({ isLoggedIn: false }));
  }
}

function* logoutSaga(): any {
  const userData = {
    Username: '',
    Pool: cognitoPool,
  };
  const cognitoUser = yield new CognitoUser(userData);
  yield cognitoUser.signOut();
  asyncStorage.removeItem(TOKEN_NAME);
  asyncStorage.removeItem(REFRESH_TOKEN);
  yield put(AppActions.initApp.success({ isLoggedIn: false }));
  // yield put(AuthActions.login.success());
}

export default function* fetchData() {
  yield takeLatest(AuthActions.Types.LOGIN.begin, loginCognitoSaga);
  yield takeLatest(AuthActions.Types.LOGIN_API.begin, loginApiSaga);
  yield takeLatest(AuthActions.Types.REGISTER_COGNITO.begin, signUpCognitoSaga);
  yield takeLatest(AuthActions.Types.VERIFY_CODE.begin, confirmSignUpSaga);
  yield takeLatest(AuthActions.Types.RESEND_EMAIL_VERIFICATION.begin, reSendEmailVeriSaga);
  yield takeLatest(AuthActions.Types.REFRESH_TOKEN.begin, refreshTokenSaga);
}
