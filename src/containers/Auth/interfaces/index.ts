import { IErrors, INavigation, IAction } from '@Interfaces/index';

export interface ILoginProps extends INavigation {
  errors: IErrors;
  isRequesting: boolean;
}

export interface LoginPayload {
  username?: string;
  email: string;
  password: string;
  code?: string;
  [key: string]: string | undefined;
}

export interface LoginBody {
  cognito_token: string;
}
export interface StepProps {
  step: number;
}
export type LginType = 'FACBOOK' | 'GOOGLE' | 'EMAIL';

export interface LoginAction extends IAction {
  payload: LoginPayload;
}
