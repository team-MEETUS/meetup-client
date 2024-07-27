import api from '@/apis';

const url = import.meta.env.MODE === 'development' ? '/api' : '';

interface TestData {
  data: string[];
  success: boolean;
  error: null;
}

interface RequestBody {
  testId: number;
  name: string;
}

export const GetTestDataAPI = async () => {
  const { data } = await api.get<TestData>(`${url}/test`);
  return data;
};

export const PostTestDataAPI = async (requestBody: RequestBody) => {
  const { data } = await api.post<TestData>(`${url}/test`, requestBody);
  return data;
};
