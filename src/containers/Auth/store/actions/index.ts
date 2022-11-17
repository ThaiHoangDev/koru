import { actionTypesFactory } from 'redux-action-type-factory';
import { createAction } from 'redux-actions';

import { createActionGenerator } from '@Utils/actionGenerator';

export namespace AuthActions {
  export const Types = actionTypesFactory(
    'AUTH',
    'LOGIN',
    'REGISTER',
    'VERIFY_CODE',
    'TOGGLE_AUTH_MODAL',
    'RESET_REGISTER_STATE',
    'RESEND_EMAIL_VERIFICATION',
    'STEP_SIGNUP',
    'LOGIN_API',
    'REGISTER_COGNITO',
    'REFRESH_TOKEN',
  );

  export const login = createActionGenerator(Types.LOGIN);
  export const loginApi = createActionGenerator(Types.LOGIN_API);
  export const register = createActionGenerator(Types.REGISTER);
  export const registerCognito = createActionGenerator(Types.REGISTER_COGNITO);
  export const verifyCode = createActionGenerator(Types.VERIFY_CODE);
  export const resendEmailVerification = createActionGenerator(Types.RESEND_EMAIL_VERIFICATION);
  export const stepSignUp = createActionGenerator(Types.STEP_SIGNUP);
  export const refreshToken = createActionGenerator(Types.REFRESH_TOKEN);
  // export const logout = createActionGenerator(Types.LOGOUT);

  export const toggleAuthModal = createAction<boolean>(Types.TOGGLE_AUTH_MODAL.default);
  export const resetRegisterState = createAction(Types.RESET_REGISTER_STATE.default);
}
