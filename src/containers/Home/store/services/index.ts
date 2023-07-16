import axiosClient from '@Utils/axios';

export const getMyPlantAPI = async (payload: any) => {
  const { page = 1, perpage = 10, search = '' } = payload;
  return await axiosClient.get(`/plants/my?page=${page}&perpage=${perpage}&search=${search}`);
};

export const postJanAPI = async (payload: any) => {
  return await axiosClient.put('/plants/49160bfd-73a4-4916-8930-560d7f4e9814/control', payload);
};
export const removePlantService = async (uuid: any) => {
  return await axiosClient.delete(`/plants/${uuid}`);
};

export const updatePlantService = async (payload: any) => {
  const { uuid, ...rest } = payload;
  return await axiosClient.put(`/plants/${uuid}`, { ...rest });
};

export const attachPolicyService = async (data: any) => {
  const rawBody = {
    identity_id: data,
  };
  return await axiosClient.put(`/policies/attachments`, rawBody);
};

export const getPlantStateHistoryAPI = async (payload: any) => {
  const { from = payload.from, to = payload.to, plantId = payload.plantId } = payload;
  return await axiosClient.get(`/plants/${plantId}/history?from=${from}&to=${to}`);
};
