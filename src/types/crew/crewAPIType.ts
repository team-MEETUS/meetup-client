import { CrewMemberRole } from '@/types/crew/crewType';

export interface GetAllCrewAPIResponseBody {
  crewId: string;
  name: string;
  intro: string;
  content: string;
  max: number;
  originalImg: string;
  saveImg: string;
  totalMember: number;
  totalLike: number;

  geo: {
    geoId: number;
    city: string;
    district: string;
  };

  interestBig: {
    interestBigId: number;
    name: string;
  };

  interestSmall: {
    interestSmallId: number;
    name: string;
  };
}

export interface PostAddCrewAPI {
  name: string;
  content: string;
  max: number;
  originalImg: string;
  saveImg: string;
  geoId: number;
  interestBig: number;
  interestSmall: number;
}

export interface GetCrewMemberAPIResponseBody {
  crewMemberId: number;
  role: CrewMemberRole;
  member: {
    memberId: number;
    nickname: string;
    intro: string;
    saveImg: string;
  };
}
