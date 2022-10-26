import axiosClient from '@Utils/axios';
const getListPlantApi = async (payload: any) => {
  const { page = 1, perpage = 10, search = null } = payload;

  console.log('KOKOKOKO')
  return await axiosClient.get(
    `https://dev.api.plantkoru.com/plant/v1/plants?page=${page}&perpage=${perpage}&search=${search}`,
  );
};
const createPlantApi = async (payload: any) => {
  return await axiosClient.post('/plants', payload);
};
const getPlantApi = async (payload: any) => {
  return await axiosClient.get('/plants', payload);
};

export { getListPlantApi, createPlantApi, getPlantApi };
