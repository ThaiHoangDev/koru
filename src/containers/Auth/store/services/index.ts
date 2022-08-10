import axiosClient from '@Utils/axios';

import { LoginPayload } from '@Containers/Auth/interfaces';

export const login = async (payload: LoginPayload) => {
  return await axiosClient.post('/oauth/drivers/sign_in', payload);
};
