import produce from 'immer';
import { REHYDRATE } from 'redux-persist';

import { AppActions } from '../actions';

export interface IPropInitApp {
  isLoading: boolean;
  isRequesting: boolean;
  profile: any;
  isInitializing: boolean;
  isLoggedIn: boolean;
  isSkipIntro: boolean;
}

export const initialState: IPropInitApp = {
  isLoading: false,
  isRequesting: false,
  profile: {},
  isInitializing: true,
  isLoggedIn: false,
  isSkipIntro: false,
};

const appReducer = (state = initialState, { type, payload }: any) =>
  produce(state, (draft: IPropInitApp) => {
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
      case AppActions.Types.INTRO_APP.default:
        draft.isSkipIntro = payload;
        break;
      case REHYDRATE:
        console.log(REHYDRATE, 'jjjjiii___');
        break;
      default:
        break;
    }
  });

export default appReducer;
