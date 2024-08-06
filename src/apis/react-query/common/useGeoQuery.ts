import { useQuery } from '@tanstack/react-query';

import geoQueryKey from '@/apis/query-key/geoQueryKey';
import { GetAllGeoAPI } from '@/apis/server/common/geoAPI';

export const useGetAllGeoDataQuery = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: geoQueryKey.geoList(),
    queryFn: GetAllGeoAPI,
    select: (response) => response.data,
    gcTime: 1000 * 60 * 60 * 24,
  });

  return {
    GetAllGeoData: data,
    isLoading,
    error,
  };
};
