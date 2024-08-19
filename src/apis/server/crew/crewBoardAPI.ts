import api from '@/apis';
import { ApiResponse } from '@/apis/server/type';
import {
  GetAllBoardAPIResponseBody,
  PostCreateBoardBody,
} from '@/types/crew/crewBoardType';

const GetAllBoardAPI = async (crewId: string, category?: string) => {
  const { data } = await api.get<ApiResponse<GetAllBoardAPIResponseBody[]>>(
    `/crews/${crewId}/boards`,
    { params: { category } },
  );

  return data;
};

const GetBoardDetailAPI = async (crewId: string, boardId: string) => {
  const { data } = await api.get<ApiResponse<GetAllBoardAPIResponseBody>>(
    `/crews/${crewId}/boards/${boardId}`,
  );

  return data;
};

const PostCreateBoardAPI = async (
  crewId: string,
  body: PostCreateBoardBody,
) => {
  const { data } = await api.post<ApiResponse<{ boardId: string }>>(
    `/crews/${crewId}/boards`,
    body,
  );

  return data;
};

const PostCreateBoardImageAPI = async (crewId: string, images: FormData) => {
  const { data } = await api.post<ApiResponse<string[]>>(
    `/crews/${crewId}/boards/images`,
    images,
  );

  return data;
};

const PutUpdateBoardAPI = async (
  crewId: string,
  boardId: string,
  body: {
    title: string;
    content: string;
    category: string;
  },
) => {
  const { data } = await api.put<ApiResponse<{ boardId: number }>>(
    `/crews/${crewId}/boards/${boardId}`,
    body,
  );

  return data;
};

/**
 * @description 게시글 상단 고정 API
 */
const PutUpdateBoardPinAPI = async (crewId: string, boardId: string) => {
  const { data } = await api.put<ApiResponse<{ boardId: number }>>(
    `/crews/${crewId}/boards/${boardId}/pin`,
  );

  return data;
};

const DeleteBoardAPI = async (crewId: string, boardId: string) => {
  const { data } = await api.delete<ApiResponse<{ boardId: number }>>(
    `/crews/${crewId}/boards/${boardId}`,
  );

  return data;
};

export {
  GetAllBoardAPI,
  GetBoardDetailAPI,
  PostCreateBoardAPI,
  PostCreateBoardImageAPI,
  PutUpdateBoardAPI,
  PutUpdateBoardPinAPI,
  DeleteBoardAPI,
};
