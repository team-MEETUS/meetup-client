import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import crewQueryKey from '@/apis/query-key/crewQueryKey';
import {
  DeleteCrewAPI,
  PostAddCrewAPI,
  PostCrewMemberSignUpAPI,
  PostLikeCrewAPI,
  PutUpdateCrewAPI,
} from '@/apis/server/crew/crewAPI';

export const useCrewMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const postAddCrew = useMutation({
    mutationFn: (formData: FormData) => PostAddCrewAPI(formData),
    onSuccess: () => navigate('/'),
    onError: () => {},
  });

  const putUpdateCrew = useMutation({
    mutationFn: (params: { crewId: string; body: FormData }) =>
      PutUpdateCrewAPI(params.crewId, params.body),
    onSuccess: async (data, params) => {
      await queryClient.invalidateQueries({
        queryKey: crewQueryKey.crewDetail(params.crewId),
      });

      navigate(`/crew/${data.data.crewId}/home`, {
        state: { crewId: data.data.crewId },
      });
    },
    onError: () => {},
  });

  const deleteCrew = useMutation({
    mutationFn: DeleteCrewAPI,
    onSuccess: () => {},
    onError: () => {},
  });

  const postCrewLike = useMutation({
    mutationFn: (crewId: string) => PostLikeCrewAPI(crewId),
    onMutate: async (crewId) => {
      await queryClient.cancelQueries({
        queryKey: crewQueryKey.crewLike(crewId),
      });

      // 기존 데이터
      const previousLike = queryClient.getQueryData(
        crewQueryKey.crewLike(crewId),
      );

      // mutate parameter로 업데이트
      queryClient.setQueryData(crewQueryKey.crewLike(crewId), crewId);

      return { previousLike };
    },
    // 실패 시 원래 상태로 복구
    onError: (_, crewId, context) => {
      if (context) {
        queryClient.setQueryData(
          crewQueryKey.crewLike(crewId),
          context.previousLike,
        );
      }
    },
    // 성공 실패와 상관없이 완료 시, 캐시 재호출
    onSettled: async (_, __, crewId) => {
      await queryClient.invalidateQueries({
        queryKey: crewQueryKey.crewLike(crewId),
      });
    },
  });

  const postCrewMemberSignUp = useMutation({
    mutationFn: (crewId: string) => PostCrewMemberSignUpAPI(crewId),
    onSuccess: () => {},
    onError: () => {},
  });

  return {
    postAddCrew,
    putUpdateCrew,
    deleteCrew,
    postCrewLike,
    postCrewMemberSignUp,
  };
};
