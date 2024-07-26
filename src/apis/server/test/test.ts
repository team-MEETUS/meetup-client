import api from '@/apis';

const url = '/api';

export const GetTestDataAPI = async () => {
  const { data } = await api.get(`${url}/test`);
  return data;
};

export const PostTestDataAPI = async (requestBody: any) => {
  const { data } = await api.post(`${url}/test`, requestBody);
  return data;
};
