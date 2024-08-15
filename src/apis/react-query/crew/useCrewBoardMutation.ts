import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import crewBoardQueryKey from '@/apis/query-key/crewBoardQueryKey';
import {
  PostCreateBoardAPI,
  PostCreateBoardImageAPI,
} from '@/apis/server/crew/crewBoardAPI';
import { PostCreateBoardBody } from '@/types/crew/crewBoardType';

export const useCrewBoardMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const PostCreateBoard = useMutation({
    mutationFn: (params: { crewId: string; body: PostCreateBoardBody }) =>
      PostCreateBoardAPI(params.crewId, params.body),
    onSuccess: async (_, params) => {
      await queryClient.invalidateQueries({
        queryKey: crewBoardQueryKey.crewBoardList(params.crewId),
      });

      toast.success('게시글이 작성되었습니다.');
      navigate(`/crew/${params.crewId}/board`, {
        state: { crewId: params.crewId },
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

  return {
    PostCreateBoard,
    PostCreateBoardImage,
  };
};
