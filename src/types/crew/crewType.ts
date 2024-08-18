import { GetMeetingListAPIResponseBody } from '@/types/crew/crewMeetingType';

/* eslint-disable no-unused-vars */
export interface CrewState {
  crewId?: string;
  boardId?: string;
  meetingId?: string;
}

export interface CrewMeetingState extends GetMeetingListAPIResponseBody {
  crewId?: string;
}

/**
 * @description 크루 멤버 역할
 * @enum {{  EXPELLED = 강퇴, MEMBER = 일반, ADMIN = 운영진, LEADER = 모임장, PENDING = 승인대기, DEPARTED = 퇴장 }} CrewMemberRole
 */
export enum CrewMemberRole {
  EXPELLED = 'EXPELLED', // 강퇴
  MEMBER = 'MEMBER', // 일반
  ADMIN = 'ADMIN', // 운영진
  LEADER = 'LEADER', // 모임장
  PENDING = 'PENDING', // 승인대기
  DEPARTED = 'DEPARTED', // 퇴장
}
