import api from '@/apis';
import { ApiResponse } from '@/apis/server/type';

interface GetInterestBigAPI {
  interestBigId: number | null;
  name: string;
  icon: string;
}

interface GetInterestSmallAPI {
  interestSmallId: number | null;
  name: string;
}

const GetInterestBigAPI = async () => {
  const { data } =
    await api.get<ApiResponse<GetInterestBigAPI[]>>(`/interestBigs`);

  return data;
};

const GetInterestSmallAPI = async (interestBigId: number) => {
  const { data } = await api.get<ApiResponse<GetInterestSmallAPI[]>>(
    `/interestBigs/${interestBigId}/interestSmalls`,
  );

  return data;
};

export { GetInterestBigAPI, GetInterestSmallAPI };
