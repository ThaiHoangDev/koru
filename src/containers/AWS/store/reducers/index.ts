import produce from 'immer';
import { AWSActions } from '../actions';
export const initialState = {
  status: false,
  connecting: false,
  loadCookie: false,
};

const awsReducer = (state = initialState, { type, payload }: any) =>
  produce(state, draft => {
    switch (type) {
      case AWSActions.Types.AWS_RECONNECT_REQUEST.begin: {
        return {
          ...state,
          status: false,
          connecting: false,
        };
      }
      case AWSActions.Types.AWS_CONNECT.begin: {
        return {
          ...state,
          connecting: true,
          status: false,
        };
      }
      case AWSActions.Types.AWS_CONNECT.succeeded: {
        return {
          ...state,
          connecting: false,
          status: true,
        };
      }
      case AWSActions.Types.AWS_CONNECT.failed: {
        return {
          ...state,
          connecting: false,
          status: false,
        };
      }
      default:
        return state;
    }
  });

export default awsReducer;
