/* eslint-disable no-unused-vars */
export interface CrewState {
  crewId?: string;
  boardId?: string;
}

/**
 * @description 크루 멤버 역할
 * @enum {{  EXPELLED = 강퇴, MEMBER = 일반, ADMIN = 운영진, LEADER = 모임장, PENDING = 승인대기, DEPARTED = 퇴장 }} CrewMemberRole
 */
export enum CrewMemberRole {
  EXPELLED = 0, // 강퇴
  MEMBER = 1, // 일반
  ADMIN = 2, // 운영진
  LEADER = 3, // 모임장
  PENDING = 4, // 승인대기
  DEPARTED = 5, // 퇴장
}
