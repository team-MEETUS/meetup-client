import { HttpStatusCode } from 'axios';

import api from '@/apis';
import { ApiResponse } from '@/apis/server/type';

interface GetCrewAPIResponseBody {
  crewId: string;
  name: string;
  intro: string;
  content: string;
  max: string;
  totalMember: string;
  originalImg: string;
  saveImg: string;
  createDate: string;
  updateDate: string;
  geo: string;
  interestBig: number;
  interestSmall: number;
}

interface PostAddCrewAPI {
  name: string;
  intro: string;
  content: string;
  max: number;
  originalImg: string;
  saveImg: string;
  geoId: number;
  interestBig: number;
  interestSmall: number;
}

interface PutUpdateCrewAPI {
  name: string;
  intro: string;
  content: string;
  max: number;
  originalImg: string;
  saveImg: string;
  geoId: number;
  interestBig: number;
  interestSmall: number;
}

const GetAllCrewAPI = async () => {
  const { data } =
    await api.get<ApiResponse<GetCrewAPIResponseBody[]>>(`/crews`);

  return data;
};

const GetCrewDetailAPI = async (crewId: number) => {
  const { data } = await api.get<ApiResponse<GetCrewAPIResponseBody[]>>(
    `/crews/${crewId}`,
  );

  return data;
};

const PostAddCrewAPI = async (params: FormData) => {
  const { data } = await api.post<ApiResponse<{ crewId: number }>>(
    `/crews`,
    params,
    // {
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //   },
    // },
  );

  return data;
};

const PutUpdateCrewAPI = async (crewId: number, params: PutUpdateCrewAPI) => {
  const { data } = await api.put<ApiResponse<{ crewId: number }>>(
    `/crews/${crewId}`,
    params,
  );

  return data;
};

const DeleteCrewAPI = async (crewId: number) => {
  const { data } = await api.delete<ApiResponse<HttpStatusCode>>(
    `/crews/${crewId}`,
  );

  return data;
};

export {
  GetAllCrewAPI,
  GetCrewDetailAPI,
  PostAddCrewAPI,
  PutUpdateCrewAPI,
  DeleteCrewAPI,
};
