import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import {
  DeleteCrewAPI,
  DeleteLikeCrewAPI,
  PostAddCrewAPI,
  PostCrewMemberSignUpAPI,
  PostLikeCrewAPI,
  PutUpdateCrewAPI,
} from '@/apis/server/crew/crewAPI';

export const useCrewMutation = () => {
  const navigate = useNavigate();

  const postAddCrew = useMutation({
    mutationFn: (formData: FormData) => PostAddCrewAPI(formData),
    onSuccess: () => navigate('/'),
    onError: () => {},
  });

  const putUpdateCrew = useMutation({
    mutationFn: (params: { crewId: string; params: PutUpdateCrewAPI }) =>
      PutUpdateCrewAPI(params.crewId, params.params),
    onSuccess: () => {},
    onError: () => {},
  });

  const deleteCrew = useMutation({
    mutationFn: DeleteCrewAPI,
    onSuccess: () => {},
    onError: () => {},
  });

  const postCrewLike = useMutation({
    mutationFn: (crewId: string) => PostLikeCrewAPI(crewId),
    onSuccess: () => {},
    onError: () => {},
  });

  const deleteCrewLike = useMutation({
    mutationFn: (crewId: string) => DeleteLikeCrewAPI(crewId),
    onSuccess: () => {},
    onError: () => {},
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
    deleteCrewLike,
    postCrewMemberSignUp,
  };
};
