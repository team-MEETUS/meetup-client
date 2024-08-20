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
  geoId: number;
  nickname: string;
  saveImg: string;
}
