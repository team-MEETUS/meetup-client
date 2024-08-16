export default {
  crewList: (data: object) => [`/crews`, data],
  crewDetail: (crewID: string) => [`/crews`, crewID],
  crewMember: (crewID: string, status: 'members' | 'signup') => [
    `/crews/member`,
    crewID,
    status,
  ],
  crewLike: (crewID: string) => [`/crews/likes`, crewID],
};
