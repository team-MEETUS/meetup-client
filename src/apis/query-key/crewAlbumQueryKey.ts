export default {
  crewAlbumList: (crewId: string) => [`/crews/${crewId}/albums`],
  crewAlbumDetail: (crewId: string, albumId: string) => [
    `/crews/${crewId}/albums/${albumId}`,
  ],
  crewAlbumLike: (crewId: string, albumId: string) => [
    `/crews/${crewId}/albums/${albumId}/likes`,
  ],
};
