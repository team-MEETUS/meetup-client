export interface GetAllBoardAPIResponseBody {
  boardId: number;
  title: string;
  content: string;
  category: string;
  hit: number;
  status: number;
  totalComment: number;
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
  updateDate: string;
}

export interface PostCreateBoardBody {
  title: string;
  content: string;
  category: string;
}
