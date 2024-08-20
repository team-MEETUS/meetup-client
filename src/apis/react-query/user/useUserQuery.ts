import { useQuery } from '@tanstack/react-query';

import userQueryKey from '@/apis/query-key/userQueryKey';
import { GetUserInfoAPI } from '@/apis/server/user/userAPI';

export const useUserInfoQuery = () => {
  const { data, error } = useQuery({
    queryKey: userQueryKey.userInfo(),
    queryFn: () => GetUserInfoAPI(),
    select: (response) => response.data,
  });

  return { data, error };
};
