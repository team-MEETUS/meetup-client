export interface GetAllBoardAPIResponseBody {
  boardId: number;
  title: string;
  content: string;
  category: string;
  hit: number;
  status: number;
  crewMember: string;
  createDate: string;
  updateDate: string;
}
