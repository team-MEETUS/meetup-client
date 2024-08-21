/* eslint-disable no-unused-vars */
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
  lastChatTime?: string;
}

export const enum NotificationType {
  COMMENT = 'COMMENT',
}

export interface GetNotificationResponseBody {
  notificationId: number;
  message: string;
  url: string;
  type: NotificationType;
  createDate: string;
}

export interface GetSubscribedNotificationResponseBody {
  notificationId?: string;
  message?: string;
  url?: string;
  type?: NotificationType;
  notificationCount?: number;
}
