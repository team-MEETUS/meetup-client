export interface CrewSelectRespDto {
  crewId: number;
  name: string;
  intro: string;
  max: number;
  originalImg: string;
  saveImg: string;
  totalMember: number;
  totalLike: number;
  geo: {
    geoId: number;
    city: string;
    district: string;
  };
  interestBig: {
    interestBigId: number;
    name: string;
  };
  lastChatTime: string;
}
