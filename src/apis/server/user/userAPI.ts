import api from '@/apis';
import { ApiResponse } from '@/apis/server/type';
import { PostCreateMemberAPIBody } from '@/types/user/userType';

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

export const PostCreateMemberAPI = async (body: PostCreateMemberAPIBody) => {
  const { data } = await api.post<ApiResponse<{ memberId: number }>>(
    `/members/join`,
    body,
  );

  return data;
};
