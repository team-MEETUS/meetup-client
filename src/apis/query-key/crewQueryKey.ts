export default {
  crewList: (data: object) => [`/crews`, data], // 모임 리스트
  crewDetail: (crewID: string) => [`/crews`, crewID], // 모임 상세
  crewMember: (crewID: string, status: 'members' | 'signup') => [
    `/crews/member`,
    crewID,
    status,
  ], // 모임 멤버 조회
  crewLike: (crewID: string) => [`/crews/likes`, crewID], // 모임 찜
  crewMemberRole: (crewID: string) => [`/crews/${crewID}/members/me`], // 로그인 사용자 모임 권한
  crewMyLike: () => [`/crews/likes`], // 내가 찜한모임
};
