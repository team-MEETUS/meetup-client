import { GetAllGeoAPIResponseBody } from '@/apis/server/common/geoAPI';
import { Role } from '@/types/common/commonType';

export interface PostCreateMemberAPIBody {
  phone: string;
  password: string;
  nickname: string;
  birth: string;
  gender: number;
  geoId: number;
}

export interface GetUserInfoAPIResponseBody {
  memberId: number;
  geo: GetAllGeoAPIResponseBody;
  nickname: string;
  saveImg: string;
  intro: string;
  birth: string;
}

export interface GetUserDetailInfoResponseBody {
  memberId: number;
  phone: string;
  nickname: string;
  intro: string;
  birth: string;
  gender: number;
  role: Role;
  status: number;
  deadDate: string;
  originalImg: string;
  saveImg: string;
  createDate: string;
  saveDate: string;
  geoId: number;
}
