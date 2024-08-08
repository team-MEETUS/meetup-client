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

interface GetCrewMemberAPIResponseBody {
  crewMemberId: number;
  status: number;
  member: number;
}
/**
 * @description 관심사 별 모임 조회
 */
const GetAllCrewAPI = async (params: {
  city: string;
  interestBigId: number;
  interestSmallId: number;
}) => {
  const { data } = await api.get<ApiResponse<GetCrewAPIResponseBody[]>>(
    `/crews`,
    { params },
  );

  return data;
};

/**
 * @description 특정 모임 조회
 */
const GetCrewDetailAPI = async (crewId: number) => {
  const { data } = await api.get<ApiResponse<GetCrewAPIResponseBody[]>>(
    `/crews/${crewId}`,
  );

  return data;
};

/**
 * @description 모임 등록
 */
const PostAddCrewAPI = async (body: FormData) => {
  const { data } = await api.post<ApiResponse<{ crewId: number }>>(
    `/crews`,
    body,
  );

  return data;
};

/**
 * @description 모임 수정
 */
const PutUpdateCrewAPI = async (crewId: number, params: PutUpdateCrewAPI) => {
  const { data } = await api.put<ApiResponse<{ crewId: number }>>(
    `/crews/${crewId}`,
    params,
  );

  return data;
};

/**
 * @description 모임 삭제
 */
const DeleteCrewAPI = async (crewId: number) => {
  const { data } = await api.delete<ApiResponse<HttpStatusCode>>(
    `/crews/${crewId}`,
  );

  return data;
};

/**
 * @description 모임 가입 신청
 */
const PostCrewMemberJoinAPI = async (crewId: number) => {
  const { data } = await api.post<ApiResponse<HttpStatusCode>>(
    `/crews/${crewId}`,
  );

  return data;
};

/**
 * @description 모임원 조회
 */
const GetCrewMemberAPI = async (crewId: number) => {
  const { data } = await api.get<ApiResponse<GetCrewMemberAPIResponseBody[]>>(
    `/crews/${crewId}/members`,
  );

  return data;
};

/**
 * @description 모임 찜 여부 조회
 */
const GetIsLikeCrewAPI = async (crewId: number) => {
  const { data } = await api.get<ApiResponse<boolean>>(
    `/crews/${crewId}/likes`,
  );

  return data;
};

/**
 * @description 모임 찜하기
 */
const PostLikeCrewAPI = async (crewId: number) => {
  const { data } = await api.post<ApiResponse<{ crewLikeId: number }>>(
    `/crews/${crewId}/likes`,
  );

  return data;
};

/**
 * @description 모임 찜 취소
 */
const DeleteLikeCrewAPI = async (crewId: number) => {
  const { data } = await api.delete<ApiResponse<HttpStatusCode>>(
    `/crews/${crewId}/likes`,
  );

  return data;
};

/**
 * @description 모임원 권한 수정
 */
const PutUpdateCrewMemberAPI = async (
  crewId: number,
  body: { memberId: number; newRoleStatus: number },
) => {
  const { data } = await api.put<ApiResponse<{ memberId: number }>>(
    `/crews/${crewId}/signup-members`,
    body,
  );

  return data;
};

/**
 * @description 모임 가입 신청 조회
 */
const GetCrewMemberJoinAPI = async (crewId: number) => {
  const { data } = await api.get<ApiResponse<GetCrewMemberAPIResponseBody[]>>(
    `/crews/${crewId}/signup-members`,
  );

  return data;
};

export {
  GetAllCrewAPI,
  GetCrewDetailAPI,
  PostAddCrewAPI,
  PutUpdateCrewAPI,
  DeleteCrewAPI,
  PostCrewMemberJoinAPI,
  GetCrewMemberAPI,
  GetIsLikeCrewAPI,
  PostLikeCrewAPI,
  DeleteLikeCrewAPI,
  PutUpdateCrewMemberAPI,
  GetCrewMemberJoinAPI,
};
