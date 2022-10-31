import axiosClient from '@Utils/axios';
const getListPlantApi = async (payload: any) => {
  const { page = 1, perpage = 10, search = null, group = '', ordering = '' } = payload;

  return await axiosClient.get(
    `/plant-species?page=${page}&perpage=${perpage}&search=${search}&group=${group}&ordering=${ordering}`,
  );
};
const getListPlantGroupApi = async (payload: any) => {
  const { page = 1, perpage = 10, search = null } = payload;
  return await axiosClient.get(`/plant-groups?page=${page}&perpage=${perpage}&search=${search}`);
};
const createPlantApi = async (payload: any) => {
  return await axiosClient.post('/plants', payload);
};
const getPlantApi = async (payload: any) => {
  return await axiosClient.get('/plants', payload);
};

export { getListPlantApi, createPlantApi, getPlantApi, getListPlantGroupApi };
