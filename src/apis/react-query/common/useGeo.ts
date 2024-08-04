import { useQuery } from '@tanstack/react-query';

import { GetAllGeoAPI } from '@/apis/server/common/geoAPI';

const QUERY_KEY = {
  geos: 'geos',
};

export const useGetAllGeoData = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: [QUERY_KEY.geos],
    queryFn: GetAllGeoAPI,
    select: (response) => response.data,
  });

  return {
    GetAllGeoData: data,
    isLoading,
    error,
  };
};
