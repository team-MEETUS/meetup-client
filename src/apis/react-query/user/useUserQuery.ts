import { useQuery } from '@tanstack/react-query';

import userQueryKey from '@/apis/query-key/userQueryKey';
import { GetUserInfoAPI } from '@/apis/server/user/userAPI';

export const useUserInfoQuery = (success: boolean) => {
  const { data, error, isSuccess } = useQuery({
    queryKey: userQueryKey.userInfo(),
    queryFn: () => GetUserInfoAPI(),
    select: (response) => response.data,
    enabled: success,
  });

  return { data, error, isSuccess };
};
