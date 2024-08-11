export default {
  crewList: (data: object) => [`/crews`, data],
  crewDetail: (crewID: string) => [`/crews`, crewID],
  crewMember: (crewID: string) => [`/crews/member`, crewID],
  crewLike: (crewID: string) => [`/crews/likes`, crewID],
  crewSignUp: (crewID: string) => [`/crews/sign-up`, crewID],
};
