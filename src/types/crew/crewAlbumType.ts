export interface GetAlbumAPIResponseBody {
  albumId: number;
  totalLike: number;
  status: number;
  originalImg: string;
  saveImg: string;
  crewMember: {
    crewMemberId: number;
    role: string;
    member: {
      memberId: number;
      nickname: string;
      intro: string;
      saveImg: string;
    };
  };
  createDate: string;
}
