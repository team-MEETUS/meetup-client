import { useMutation, useQuery } from '@tanstack/react-query';

import crewQueryKey from '@/apis/query-key/crewQueryKey';
import {
  DeleteCrewAPI,
  GetCrewDetailAPI,
  PostAddCrewAPI,
  PutUpdateCrewAPI,
} from '@/apis/server/crew/crewAPI';

export const useCrewQuery = (crewId: number) => {
  const { data, isLoading, error } = useQuery({
    queryKey: crewQueryKey.crewDetail(String(crewId)),
    queryFn: () => GetCrewDetailAPI(crewId),
    select: (response) => response.data,
  });

  return { data, isLoading, error };
};

export const useCrewMutation = () => {
  const postAddCrew = useMutation({
    mutationFn: (formData: FormData) => PostAddCrewAPI(formData),
    onSuccess: () => {},
    onError: () => {},
  });

  const putUpdateCrew = useMutation({
    mutationFn: (params: { crewId: number; params: PutUpdateCrewAPI }) =>
      PutUpdateCrewAPI(params.crewId, params.params),
    onSuccess: () => {},
    onError: () => {},
  });

  const deleteCrew = useMutation({
    mutationFn: DeleteCrewAPI,
    onSuccess: () => {},
    onError: () => {},
  });
  return { postAddCrew, putUpdateCrew, deleteCrew };
};
