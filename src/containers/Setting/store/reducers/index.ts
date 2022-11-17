import produce from 'immer';

import { SettingActions } from '../actions';

type ACTION = {
  type: string;
  payload: any;
};

export interface IPayload {}

// The initial state of the Login container
export const initialState: IPayload = {};

const settingReducer = (state = initialState, { type, payload }: ACTION) =>
  produce(state, draft => {
    switch (type) {
      case SettingActions.Types.LOGOUT.begin:
        break;
      default:
        break;
    }
  });

export default settingReducer;
