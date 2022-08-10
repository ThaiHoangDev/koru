import { IErrors, INavigation, IAction } from '@Interfaces/index';

export interface ILoginProps extends INavigation {
  errors: IErrors;
  isRequesting: boolean;
}

export type LoginPayload = {
  fleetId: string;
  username: string;
  password: string;
};


export interface LoginAction extends IAction {
  payload: LoginPayload;
}
