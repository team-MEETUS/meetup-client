import { GetAllGeoAPIResponseBody } from '@/apis/server/common/geoAPI';

export interface PostCreateMemberAPIBody {
  phone: string;
  password: string;
  nickname: string;
  birth: string;
  gender: number;
  geo: GetAllGeoAPIResponseBody;
}
