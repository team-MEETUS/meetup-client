import { useQuery } from '@tanstack/react-query';

import useGeoQueryKey from '@/apis/query-key/useGeoQueryKey';
import { GetAllGeoAPI } from '@/apis/server/common/geoAPI';

export const useGetAllGeoData = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: useGeoQueryKey.geoList(),
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
