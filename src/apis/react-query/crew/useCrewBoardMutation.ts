import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import crewBoardQueryKey from '@/apis/query-key/crewBoardQueryKey';
import {
  DeleteBoardAPI,
  PostCreateBoardAPI,
  PostCreateBoardImageAPI,
  PutUpdateBoardAPI,
  PutUpdateBoardPinAPI,
} from '@/apis/server/crew/crewBoardAPI';
import { PostCreateBoardBody } from '@/types/crew/crewBoardType';

export const useCrewBoardMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const PostCreateBoard = useMutation({
    mutationFn: (params: { crewId: string; body: PostCreateBoardBody }) =>
      PostCreateBoardAPI(params.crewId, params.body),
    onSuccess: async (data, params) => {
      await queryClient.invalidateQueries({
        queryKey: crewBoardQueryKey.crewBoardList(params.crewId),
      });

      toast.success('게시글이 작성되었습니다.');
      navigate(`/crew/${params.crewId}/board/${data.data.boardId}`, {
        state: { crewId: params.crewId, boardId: data.data.boardId },
      });
    },
    onError: () => {},
  });

  const PostCreateBoardImage = useMutation({
    mutationFn: (params: { crewId: string; images: FormData }) =>
      PostCreateBoardImageAPI(params.crewId, params.images),
    onSuccess: () => {},
    onError: () => {},
  });

  const PutUpdateBoard = useMutation({
    mutationFn: (params: {
      crewId: string;
      boardId: string;
      body: { title: string; content: string; category: string };
    }) => PutUpdateBoardAPI(params.crewId, params.boardId, params.body),
    onSuccess: async (_, params) => {
      await queryClient.invalidateQueries({
        queryKey: crewBoardQueryKey.crewBoardList(params.crewId),
      });

      toast.success('게시글이 수정되었습니다.');
      navigate(`/crew/${params.crewId}/board/${params.boardId}`, {
        state: { crewId: params.crewId, boardId: params.boardId },
      });
    },
    onError: () => {},
  });

  const PutUpdateBoardPin = useMutation({
    mutationFn: (params: { crewId: string; boardId: string }) =>
      PutUpdateBoardPinAPI(params.crewId, params.boardId),
    onSuccess: async (_, params) => {
      await queryClient.invalidateQueries({
        queryKey: crewBoardQueryKey.crewBoardList(params.crewId),
      });

      toast.success('게시글이 고정되었습니다.');
      navigate(`/crew/${params.crewId}/board`, {
        state: { crewId: params.crewId, boardId: params.boardId },
      });
    },
    onError: () => {},
  });

  const PostDeleteBoard = useMutation({
    mutationFn: (params: { crewId: string; boardId: string }) =>
      DeleteBoardAPI(params.crewId, params.boardId),
    onSuccess: async (_, params) => {
      await queryClient.invalidateQueries({
        queryKey: crewBoardQueryKey.crewBoardList(params.crewId),
      });

      toast.success('게시글이 삭제되었습니다.');
      navigate(`/crew/${params.crewId}/board`, {
        state: { crewId: params.crewId },
      });
    },
    onError: () => {},
  });

  return {
    PostCreateBoard,
    PostCreateBoardImage,
    PutUpdateBoard,
    PutUpdateBoardPin,
    PostDeleteBoard,
  };
};
