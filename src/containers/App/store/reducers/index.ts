import produce from 'immer';

import { AppActions } from '../actions';

export const initialState: any = {
  isLoading: false,
  isRequesting: false,
  profile: {},
  isInitializing: true,
  isLoggedIn: false,
};

const appReducer = (state = initialState, { type, payload }: any) =>
  produce(state, (draft: any) => {
    switch (type) {
      case AppActions.Types.INIT_APP.begin:
        draft.isInitializing = true;
        break;
      case AppActions.Types.INIT_APP.failed:
        draft.isInitializing = false;
        break;
      case AppActions.Types.INIT_APP.succeeded:
        draft.isInitializing = false;
        draft.isLoggedIn = payload.isLoggedIn;
        break;
      default:
        break;
    }
  });

export default appReducer;
