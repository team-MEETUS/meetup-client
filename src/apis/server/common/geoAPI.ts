import api from '@/apis';
import { ApiResponse } from '@/apis/server/type';

export interface GetAllGeoAPIResponseBody {
  geoId: number;
  city: string;
  district: string;
  county: string;
  latitude: string;
  longitude: string;
}

export const GetAllGeoAPI = async () => {
  const { data } =
    await api.get<ApiResponse<GetAllGeoAPIResponseBody[]>>(`/geos`);

  return data;
};
