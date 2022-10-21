import produce from 'immer';

import { AuthActions } from '../actions';

type ACTION = {
  type: string;
  payload: any;
};

export interface IPayload {
  isRequesting: boolean;
  isVerifySuccess: boolean;
  isRegisterSuccess: boolean;
  isResendSuccess: boolean;
  errors: any;
  stepSignUp: number;
}

// The initial state of the Login container
export const initialState: IPayload = {
  isRequesting: false,
  isVerifySuccess: false,
  isRegisterSuccess: false,
  isResendSuccess: false,
  errors: {},
  stepSignUp: 0,
};

const authReducer = (state = initialState, { type, payload }: ACTION) =>
  produce(state, draft => {
    switch (type) {
      case AuthActions.Types.LOGIN.begin:
      case AuthActions.Types.REGISTER.begin:
      case AuthActions.Types.RESEND_EMAIL_VERIFICATION.begin:
        draft.isRequesting = true;
        draft.errors = {};
        break;
      case AuthActions.Types.VERIFY_CODE.begin:
        draft.isVerifySuccess = false;
        draft.isRequesting = true;
        draft.errors = {};
        break;
      case AuthActions.Types.LOGIN.failed:
      case AuthActions.Types.REGISTER.failed:
      case AuthActions.Types.VERIFY_CODE.failed:
      case AuthActions.Types.RESEND_EMAIL_VERIFICATION.failed:
        draft.isRequesting = false;
        draft.errors = payload.errors;
        break;
      case AuthActions.Types.LOGIN.succeeded:
        draft.isRequesting = false;
        draft.errors = {};
        break;
      case AuthActions.Types.REGISTER.succeeded:
        draft.isRequesting = false;
        draft.isRegisterSuccess = true;
        draft.errors = {};
        break;
      case AuthActions.Types.VERIFY_CODE.succeeded:
        draft.isRequesting = false;
        draft.isVerifySuccess = true;
        draft.errors = {};
        break;
      case AuthActions.Types.RESEND_EMAIL_VERIFICATION.succeeded:
        draft.isRequesting = false;
        draft.isResendSuccess = true;
        draft.errors = {};
        break;

      case AuthActions.Types.RESET_REGISTER_STATE.default:
        draft.isRegisterSuccess = false;
        break;
      case AuthActions.Types.STEP_SIGNUP.begin:
        draft.stepSignUp = payload;
        break;
      default:
        break;
    }
  });

export default authReducer;
