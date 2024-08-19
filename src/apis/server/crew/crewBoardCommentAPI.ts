import { HttpStatusCode } from 'axios';

import api from '@/apis';
import { ApiResponse } from '@/apis/server/type';
import {
  GetBoardCommentResponseBody,
  PostBoardCommentRequestBody,
} from '@/types/crew/crewBoardCommentType';

const GetBoardCommentAPI = async (crewId: string, boardId: string) => {
  const { data } = await api.get<ApiResponse<GetBoardCommentResponseBody[]>>(
    `/crews/${crewId}/boards/${boardId}/comments`,
  );

  return data;
};

const PostCreateBoardCommentAPI = async (
  crewId: string,
  boardId: string,
  body: PostBoardCommentRequestBody,
) => {
  const { data } = await api.post<ApiResponse<{ boardCommentId: string }>>(
    `/crews/${crewId}/boards/${boardId}/comments`,
    body,
  );

  return data;
};

const PutUpdateBoardCommentAPI = async (
  crewId: string,
  boardId: string,
  commentId: string,
  body: PostBoardCommentRequestBody,
) => {
  const { data } = await api.put<ApiResponse<{ boardCommentId: string }>>(
    `/crews/${crewId}/boards/${boardId}/comments/${commentId}`,
    body,
  );

  return data;
};

const DeleteBoardCommentAPI = async (
  crewId: string,
  boardId: string,
  commentId: string,
) => {
  const { data } = await api.delete<ApiResponse<HttpStatusCode>>(
    `/crews/${crewId}/boards/${boardId}/comments/${commentId}`,
  );

  return data;
};

export {
  GetBoardCommentAPI,
  PostCreateBoardCommentAPI,
  PutUpdateBoardCommentAPI,
  DeleteBoardCommentAPI,
};
