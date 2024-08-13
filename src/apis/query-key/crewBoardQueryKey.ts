export default {
  crewBoardList: (crewId: string, category?: string) => [
    `/crews/${crewId}/boards/?category=${category}`,
  ],
  crewBoardDetail: (crewID: string, boardID: string) => [
    `/crews/${crewID}/boards/details/${boardID}`,
  ],
};
