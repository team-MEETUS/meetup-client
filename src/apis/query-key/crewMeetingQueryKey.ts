export default {
  crewMeetingList: (crewId: string, status: 'upcoming' | 'past') => [
    `/crews/${crewId}/meetings?status=${status}`,
  ], // 모임 리스트 조회 (진행중, 지난 모임)
  crewMeetingMemberList: (crewId: string, meetingId: string) => [
    `/crews/${crewId}/meetings/${meetingId}`,
  ], // 모임 정모 멤버 조회
};
