export default {
  crewBoardCommentList: (crewId: string, boardId: string) => [
    `/crews/${crewId}/boards/${boardId}/comments`,
  ],
};
