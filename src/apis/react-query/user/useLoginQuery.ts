import { useQuery } from '@tanstack/react-query';

import userQueryKey from '@/apis/query-key/userQueryKey';
import { PostLoginAPI } from '@/apis/server/user/userAPI';

export const useLoginQuery = (params: { phone: string; password: string }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: userQueryKey.login(params),
    queryFn: () => PostLoginAPI(params),
    select: (response) => response.data,
  });

  return { data, isLoading, error };
};
