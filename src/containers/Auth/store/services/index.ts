import axiosClient from '@Utils/axios';

import { LoginPayload } from '@Containers/Auth/interfaces';

export const login = async (payload: LoginPayload) => {
  return await axiosClient.post('/auth/v1/login', payload);
};
