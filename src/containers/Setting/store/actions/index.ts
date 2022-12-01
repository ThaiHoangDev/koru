import { actionTypesFactory } from 'redux-action-type-factory';
import { createActionGenerator } from '@Utils/actionGenerator';

export namespace SettingActions {
  export const Types = actionTypesFactory('Setting', 'LOGOUT');

  export const logout = createActionGenerator(Types.LOGOUT);
}
