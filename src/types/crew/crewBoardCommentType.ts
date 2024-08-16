export interface GetBoardCommentResponseBody {
  boardCommentId: number;
  boardId: number;
  crewMember: string;
  parentCommentId: number;
  content: string;
  status: number;
  createDate: string;
  updateDate: string;
}

export interface PostBoardCommentRequestBody {
  parentBoardCommentId: number;
  content: string;
  crewMemberId?: number;
}
