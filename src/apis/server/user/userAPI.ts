import api from '@/apis';
import { ApiResponse } from '@/apis/server/type';
import {
  GetUserInfoAPIResponseBody,
  PostCreateMemberAPIBody,
} from '@/types/user/userType';

/**
 * @description 로그인
 */
export const PostLoginAPI = async (body: {
  phone: string;
  password: string;
}) => {
  const { data } = await api.post<
    ApiResponse<{ memberId: number; accessToken: string }>
  >(`/login`, body);

  return data;
};

/**
 * @description 자체 회원가입
 */
export const PostCreateMemberAPI = async (body: PostCreateMemberAPIBody) => {
  const { data } = await api.post<ApiResponse<{ memberId: number }>>(
    `/members/join`,
    body,
  );

  return data;
};

/**
 * @description 문자 인증
 */
export const PostPhoneCheckAPI = async (phone: string) => {
  const { data } = await api.post<ApiResponse<{ randomNum: number }>>(
    `/members/phoneCheck`,
    {
      phone,
    },
  );

  return data;
};

export const GetUserInfoAPI = async () => {
  const { data } =
    await api.get<ApiResponse<GetUserInfoAPIResponseBody>>(`/members/info`);

  return data;
};
