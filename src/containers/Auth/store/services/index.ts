import axiosClient from '@Utils/axios';

import { LoginBody } from '@Containers/Auth/interfaces';

export const login = async (payload: any) => {
  return await axiosClient.post('/auth/v1/login', payload);
};
