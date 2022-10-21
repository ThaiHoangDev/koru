import { AuthenticationDetails, CognitoUserAttribute } from 'amazon-cognito-identity-js';
import { put, takeLatest, call } from 'redux-saga/effects';
import { AppActions } from '@Containers/App/store/actions';
import { channel } from 'redux-saga';

import axiosClient from '@Utils/axios';
import asyncStorage from '@Utils/asyncStorage';
import { cognitoPool, cognitoUser } from '@Utils/amplifyConfig';
import { navigate } from '@Utils/navigator';

import { REFRESH_TOKEN, TOKEN_NAME } from '@Constants/app';

import * as apiService from '../services';
import { AuthActions } from '../actions';
import { LoginAction } from '../../interfaces';
import { showErrorWithString } from './../../../../utils/helper';

const Channel = channel();

function* loginApiSaga({ payload }: any) {
  console.log(payload, 'Login API');
  const { cognitoToken } = payload;
  try {
    const { data } = yield call(apiService.login, { cognito_token: cognitoToken });
    const { access_token, refresh_token } = data;
    axiosClient.setHeader(access_token);
    asyncStorage.setItem(TOKEN_NAME, access_token);
    asyncStorage.setItem(REFRESH_TOKEN, refresh_token);
    yield put(AppActions.initApp.success({ isLoggedIn: true }));
    yield put(AuthActions.login.success());
    // yield put(AppActions.fetchProfile.request());
  } catch (error) {}
}

function* loginCognitoSaga({ payload }: LoginAction) {
  const { email = '', password } = payload;
  try {
    const authenticationData = {
      Username: email,
      Password: password,
    };
    const authenticationDetails = new AuthenticationDetails(authenticationData);
    yield cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: result => {
        const cognitoToken = result.getAccessToken();
        Channel.put(AuthActions.loginApi.request(cognitoToken));
      },
      onFailure: err => {
        console.log(err, 'errLogin');
      },
    });
  } catch (error: any) {
    yield put(AuthActions.login.fail(error));
  }
}

function* signUpSaga({ payload }: any) {
  console.log(payload, 'Pay_____');
  const { cognitoToken } = payload;
  try {
    const { data } = yield call(apiService.login, { cognito_token: cognitoToken });
    const { access_token, refresh_token } = data;
    axiosClient.setHeader(access_token);
    asyncStorage.setItem(TOKEN_NAME, access_token);
    asyncStorage.setItem(REFRESH_TOKEN, refresh_token);
    yield put(AuthActions.register.success());
    yield put(AppActions.initApp.success());
    // yield put(AppActions.fetchProfile.request());
  } catch (error) {
    yield put(AuthActions.register.fail(error));
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
      console.log(data, 'dat____');
      // Channel.put(AuthActions.register.request(data));
      // Channel.put(AuthActions.login.request(data?.user.authenticateUser()));
      // const authenticationData = {
      //   Username: email,
      //   Password: password,
      // };
      // const authenticationDetails = new AuthenticationDetails(authenticationData);
      // data?.user.authenticateUser(authenticationDetails, {
      //   onSuccess: result => {
      //     const cognitoToken = result.getAccessToken();
      //     Channel.put(AuthActions.loginApi.request(cognitoToken));
      //   },
      //   onFailure: err => {
      //     Channel.put(AuthActions.login.fail({ errors: err }));
      //   },
      // });
    });
  } catch (error: any) {
    yield put(AuthActions.registerCognito.fail({ errors: error }));
  }
}

function* confirmSignUpSaga({ payload }: any) {
  const { code, username = '', password, email } = payload;
  try {
    yield cognitoUser.confirmRegistration(code, true, (err, result) => {
      if (err) {
        Channel.put(AuthActions.verifyCode.fail({ errors: err }));
        return;
      }
      Channel.put(AuthActions.login.request({ password, email }));
      navigate('Intro');
    });
  } catch (error) {
    yield put(AuthActions.verifyCode.fail({ errors: error }));
  }
}

function* reSendEmailVeriSaga() {
  try {
    yield cognitoUser.resendConfirmationCode(function (err, result) {
      if (err) {
        console.log('call ẻrrr ' + err);
        return;
      }
      console.log('call result: ' + result);
      Channel.put(AuthActions.resendEmailVerification.success());
    });
  } catch (error) {
    console.log('error confirming sign up', error);
    yield put(AuthActions.resendEmailVerification.fail({ errors: error }));
  }
}

export default function* fetchData() {
  yield takeLatest(AuthActions.Types.LOGIN.begin, loginCognitoSaga);
  yield takeLatest(AuthActions.Types.LOGIN_API.begin, loginApiSaga);
  yield takeLatest(AuthActions.Types.REGISTER.begin, signUpSaga);
  yield takeLatest(AuthActions.Types.REGISTER_COGNITO.begin, signUpCognitoSaga);
  yield takeLatest(AuthActions.Types.VERIFY_CODE.begin, confirmSignUpSaga);
  yield takeLatest(AuthActions.Types.RESEND_EMAIL_VERIFICATION.begin, reSendEmailVeriSaga);
}
