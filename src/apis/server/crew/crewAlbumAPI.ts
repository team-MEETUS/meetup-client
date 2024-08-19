import { HttpStatusCode } from 'axios';

import api from '@/apis';
import { ApiResponse } from '@/apis/server/type';
import { GetAlbumAPIResponseBody } from '@/types/crew/crewAlbumType';

export const GetAlbumListAPI = async (crewId: string, page: string = '0') => {
  const { data } = await api.get<ApiResponse<GetAlbumAPIResponseBody[]>>(
    `/crews/${crewId}/albums`,
    { params: { page } },
  );

  return data;
};

export const GetAlbumDetailAPI = async (crewId: string, albumId: string) => {
  const { data } = await api.get<ApiResponse<GetAlbumAPIResponseBody>>(
    `/crews/${crewId}/albums/${albumId}`,
  );

  return data;
};

export const PostCreateAlbumAPI = async (crewId: string, body: FormData) => {
  const { data } = await api.post<ApiResponse<{ albumId: number }>>(
    `/crews/${crewId}/albums`,
    body,
  );

  return data;
};

export const GetAlbumLikeAPI = async (crewId: string, albumId: string) => {
  const { data } = await api.get<ApiResponse<boolean>>(
    `/crews/${crewId}/albums/${albumId}/likes`,
  );

  return data;
};

export const PostAlbumLikeAPI = async (crewId: string, albumId: string) => {
  const { data } = await api.post<ApiResponse<{ albumLikeId: string }>>(
    `/crews/${crewId}/albums/${albumId}/likes`,
  );

  return data;
};

export const DeleteAlbumAPI = async (crewId: string, albumId: string) => {
  const { data } = await api.delete<ApiResponse<HttpStatusCode>>(
    `/crews/${crewId}/albums/${albumId}`,
  );

  return data;
};
