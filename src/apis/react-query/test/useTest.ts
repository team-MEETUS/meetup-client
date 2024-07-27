import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { GetTestDataAPI, PostTestDataAPI } from '@/apis/server/test/test';

const QUERY_KEY = {
  test: 'test',
};

export const useGetTestData = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: [QUERY_KEY.test],
    queryFn: GetTestDataAPI,
    select: (response) => response.data,
  });

  return {
    GetTestData: data,
    isLoading,
    error,
  };
};
export const usePostTestData = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: PostTestDataAPI,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.test],
      });
    },
    onError: (error) => {
      console.error('Error posting data:', error);
    },
  });
};
