import axiosClient from '@Utils/axios';

export const getMyPlantAPI = async (payload: any) => {
  const { page = 1, perpage = 10, search = '' } = payload;
  return await axiosClient.get(`/plants/my?page=${page}&perpage=${perpage}&search=${search}`);
};

export const postJanAPI = async (payload: any) => {
  return await axiosClient.put('/plants/49160bfd-73a4-4916-8930-560d7f4e9814/control', payload);
};
