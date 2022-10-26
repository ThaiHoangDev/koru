import axiosClient from '@Utils/axios';

import { LoginBody } from '@Containers/Auth/interfaces';

export const login = async (payload: any) => {
  return await axiosClient.post('https://dev.api.plantkoru.com/auth/v1/login', payload);
};

export const refreshToken = async (payload: any) => {
  return await axiosClient.post('https://dev.api.plantkoru.com/auth/v1/refresh-token', payload);
};
