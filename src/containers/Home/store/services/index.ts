import axiosClient from '@Utils/axios';

export const getMyPlantAPI = async (payload: any) => {
  const { page = 1, perpage = 10, search = '' } = payload;
  return await axiosClient.get(`/plants/my?page=${page}&perpage=${perpage}&search=${search}`);
};
