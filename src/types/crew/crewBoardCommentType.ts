export interface GetBoardCommentResponseBody {
  boardCommentId: number;
  boardId: number;
  crewMember: {
    crewMemberId: string;
    role: string;
    member: {
      memberId: string;
      nickname: string;
      saveImg: string;
    };
  };
  parentCommentId: number;
  content: string;
  status: number;
  createDate: string;
  updateDate: string;
}

export interface PostBoardCommentRequestBody {
  parentBoardCommentId?: number;
  content: string;
  crewMemberId?: number;
}
