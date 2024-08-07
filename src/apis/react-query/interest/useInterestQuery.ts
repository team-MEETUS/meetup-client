import { useQuery } from '@tanstack/react-query';

import interestQueryKey from '@/apis/query-key/interestQueryKey';
import {
  GetInterestBigAPI,
  GetInterestSmallAPI,
} from '@/apis/server/interest/InterestAPI';

export const useInterestBigQuery = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: interestQueryKey.interestBig(),
    queryFn: GetInterestBigAPI,
    select: (response) => response.data,
  });

  return { data, isLoading, error };
};

export const useInterestSmallQuery = (interestBigId: number) => {
  const { data, isLoading, error } = useQuery({
    queryKey: interestQueryKey.interestSmall(String(interestBigId)),
    queryFn: () => GetInterestSmallAPI(interestBigId),
    select: (response) => response.data,
    enabled: interestBigId !== 0,
  });

  return { data, isLoading, error };
};
