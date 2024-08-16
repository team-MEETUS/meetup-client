import { HttpStatusCode } from 'axios';

import api from '@/apis';
import { ApiResponse } from '@/apis/server/type';
import {
  GetAllCrewAPIResponseBody,
  GetCrewMemberAPIResponseBody,
} from '@/types/crew/crewAPIType';

export interface GetCrewAPIResponseBody {
  crewId: string;
  name: string;
  intro: string;
  content: string;
  max: number;
  originalImg: string;
  saveImg: string;
  totalMember: number;
  totalLike: number;
  createDate: string;
  updateDate: string;

  geo: {
    geoId: number;
    city: string;
    district: string;
    county: string;
    latitude: string;
    longitude: string;
  };

  interestBig: {
    interestBigId: number;
    name: string;
    icon: string;
  };

  interestSmall: {
    interestSmallId: number;
    name: string;

    interestBig: {
      interestBigId: number;
      name: string;
      icon: string;
    };
  };
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

/**
 * @description 관심사 별 모임 조회
 */
const GetAllCrewAPI = async (body: {
  interestBigId?: number;
  interestSmallId?: number;
  page?: number;
}) => {
  const { data } = await api.post<ApiResponse<GetAllCrewAPIResponseBody[]>>(
    `/crews`,
    body,
  );

  return data;
};

/**
 * @description 특정 모임 조회
 */
const GetCrewDetailAPI = async (crewId: string) => {
  const { data } = await api.get<ApiResponse<GetAllCrewAPIResponseBody>>(
    `/crews/${crewId}`,
  );

  return data;
};

/**
 * @description 모임 등록
 *
 */
const PostAddCrewAPI = async (body: FormData) => {
  const { data } = await api.post<ApiResponse<{ crewId: string }>>(
    `/crews`,
    body,
  );

  return data;
};

/**
 * @description 모임 수정
 *
 */
const PutUpdateCrewAPI = async (crewId: string, body: FormData) => {
  const { data } = await api.put<ApiResponse<{ crewId: string }>>(
    `/crews/${crewId}`,
    body,
  );

  return data;
};

/**
 * @description 모임 삭제
 */
const DeleteCrewAPI = async (crewId: string) => {
  const { data } = await api.delete<ApiResponse<HttpStatusCode>>(
    `/crews/${crewId}`,
  );

  return data;
};

/**
 * @description 모임 가입 신청
 */
const PostCrewMemberSignUpAPI = async (crewId: string) => {
  const { data } = await api.post<ApiResponse<{ memberId: number }>>(
    `/crews/${crewId}/members`,
  );

  return data;
};

/**
 * @description 모임 찜 여부 조회
 */
const GetIsLikeCrewAPI = async (crewId: string) => {
  const { data } = await api.get<ApiResponse<boolean>>(
    `/crews/${crewId}/likes`,
  );

  return data;
};

/**
 * @description 모임 찜하기/찜취소
 */
const PostLikeCrewAPI = async (crewId: string) => {
  const { data } = await api.post<ApiResponse<HttpStatusCode>>(
    `/crews/${crewId}/likes`,
  );

  return data;
};

/**
 * @description 모임원 권한 수정
 */
const PutUpdateCrewMemberAPI = async (
  crewId: string,
  body: { memberId: number; newRoleStatus: number },
) => {
  const { data } = await api.put<ApiResponse<{ crewMemberId: number }>>(
    `/crews/${crewId}/members`,
    body,
  );

  return data;
};

/**
 * @description 모임원 조회 및 가입 신청 조회
 */
const GetCrewMemberAPI = async (
  crewId: string,
  status: 'members' | 'signup',
) => {
  const { data } = await api.get<ApiResponse<GetCrewMemberAPIResponseBody[]>>(
    `/crews/${crewId}/members?status=${status}`,
  );

  return data;
};

/**
 * @description 모임 가입 여부 조회
 */
const GetIsCrewMemberAPI = async (crewId: string) => {
  const { data } = await api.get<ApiResponse<boolean>>(
    `/crews/${crewId}/members/me`,
  );

  return data;
};

export {
  GetAllCrewAPI,
  GetCrewDetailAPI,
  PostAddCrewAPI,
  PutUpdateCrewAPI,
  DeleteCrewAPI,
  PostCrewMemberSignUpAPI,
  GetCrewMemberAPI,
  GetIsLikeCrewAPI,
  PostLikeCrewAPI,
  PutUpdateCrewMemberAPI,
  GetIsCrewMemberAPI,
};
