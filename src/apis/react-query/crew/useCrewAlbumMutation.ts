import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import crewAlbumQueryKey from '@/apis/query-key/crewAlbumQueryKey';
import {
  DeleteAlbumAPI,
  PostAlbumLikeAPI,
  PostCreateAlbumAPI,
} from '@/apis/server/crew/crewAlbumAPI';

export const useCrewAlbumMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const postCreateAlbum = useMutation({
    mutationFn: (params: { crewId: string; body: FormData }) =>
      PostCreateAlbumAPI(params.crewId, params.body),
    onSuccess: async (_, params) => {
      await queryClient.invalidateQueries({
        queryKey: crewAlbumQueryKey.crewAlbumList(params.crewId),
      });

      toast.success('사진이 업로드되었습니다.');
      navigate(`/crew/${params.crewId}/album`, {
        state: { crewId: params.crewId },
      });
    },
    onError: () => {},
  });

  const deleteAlbum = useMutation({
    mutationFn: (params: { crewId: string; albumId: string }) =>
      DeleteAlbumAPI(params.crewId, params.albumId),
    onSuccess: async (_, params) => {
      await queryClient.invalidateQueries({
        queryKey: crewAlbumQueryKey.crewAlbumList(params.crewId),
      });

      toast.success('사진이 삭제되었습니다.');
      navigate(`/crew/${params.crewId}/album`, {
        state: { crewId: params.crewId },
      });
    },
    onError: () => {},
  });

  const postAlbumLike = useMutation({
    mutationFn: (params: { crewId: string; albumId: string }) =>
      PostAlbumLikeAPI(params.crewId, params.albumId),

    onMutate: async (params: { crewId: string; albumId: string }) => {
      await queryClient.cancelQueries({
        queryKey: crewAlbumQueryKey.crewAlbumLike(
          params.crewId,
          params.albumId,
        ),
      });

      // 기존 데이터
      const previousLike = queryClient.getQueryData(
        crewAlbumQueryKey.crewAlbumLike(params.crewId, params.albumId),
      );

      // mutate parameter로 업데이트
      queryClient.setQueryData(
        crewAlbumQueryKey.crewAlbumLike(params.crewId, params.albumId),
        params.albumId,
      );

      return { previousLike };
    },
    // 실패 시 원래 상태로 복구
    onError: (_, params, context) => {
      if (context) {
        queryClient.setQueryData(
          crewAlbumQueryKey.crewAlbumLike(params.crewId, params.albumId),
          context.previousLike,
        );
      }
    },
    // 성공 실패와 상관없이 완료 시, 캐시 재호출
    onSettled: async (_, __, params) => {
      await queryClient.invalidateQueries({
        queryKey: crewAlbumQueryKey.crewAlbumLike(
          params.crewId,
          params.albumId,
        ),
      });
    },
  });

  return {
    postCreateAlbum,
    deleteAlbum,
    postAlbumLike,
  };
};
