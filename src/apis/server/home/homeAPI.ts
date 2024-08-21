import { HttpStatusCode } from 'axios';

import api from '@/apis';
import { ApiResponse } from '@/apis/server/type';
import {
  CrewSelectRespDto,
  GetNotificationResponseBody,
} from '@/types/home/homeAPIType';

/**
 * @description 홈 새로 생긴 모임 조회
 */
export const GetNewCrewListAPI = async (page: string = '1') => {
  const { data } = await api.get<ApiResponse<CrewSelectRespDto[]>>(
    `/crews/new`,
    {
      params: { page },
    },
  );

  return data;
};

/**
 * @description 홈 활동이 활발한 모임 조회
 */
export const GetActiveCrewListAPI = async (page: string = '1') => {
  const { data } = await api.get<ApiResponse<CrewSelectRespDto[]>>(
    `/crews/active`,
    {
      params: { page },
    },
  );

  return data;
};

/**
 * @description 홈 모임 검색
 */
export const GetSearchCrewAPI = async (keyword: string, page: string = '1') => {
  const { data } = await api.get<ApiResponse<CrewSelectRespDto[]>>(
    `/crews/search`,
    {
      params: { keyword, page },
    },
  );

  return data;
};

/**
 * @description 홈 내 모임 조회
 */
export const GetMyCrewListAPI = async () => {
  const { data } = await api.get<ApiResponse<CrewSelectRespDto[]>>(`/crews/me`);

  return data;
};

export const GetNotificationAPI = async () => {
  const { data } =
    await api.get<ApiResponse<GetNotificationResponseBody[]>>('/notifications');

  return data;
};

export const PutNotificationReadAPI = async (notificationId: string) => {
  const { data } = await api.put<ApiResponse<HttpStatusCode>>(
    `/notifications/${notificationId}`,
  );

  return data;
};
