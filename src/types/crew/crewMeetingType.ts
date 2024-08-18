import { CrewMemberRole } from '@/types/crew/crewType';

import { GetCrewMemberAPIResponseBody } from './crewAPIType';

export interface GetMeetingMemberListAPIResponseBody {
  meetingMemberId: number;
  meetingId: number;
  crewMember: {
    crewMemberId: number;
    role: CrewMemberRole;
    member: {
      memberId: number;
      nickname: string;
      intro: string;
      saveImg: string;
    };
  };
}

export interface GetMeetingListAPIResponseBody {
  meetingId: number;
  name: string;
  date: string;
  loc: string;
  url: string;
  price: string;
  max: number;
  attend: number;
  originalImg: string;
  saveImg: string;
  meetingMembers: {
    meetingMemberId: number;
    crewMember: GetCrewMemberAPIResponseBody;
  }[];
}

export interface PutUpdateMeetingAPIRequestBody {
  name: string;
  date: string;
  loc: string;
  url: string;
  price: string;
  max: number;
}
