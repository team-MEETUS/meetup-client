import { HttpStatusCode } from 'axios';

import api from '@/apis';
import { ApiResponse } from '@/apis/server/type';
import {
  GetMeetingListAPIResponseBody,
  GetMeetingMemberListAPIResponseBody,
} from '@/types/crew/crewMeetingType';

const PostCreateMeetingAPI = async (crewId: string, body: FormData) => {
  const { data } = await api.post<ApiResponse<{ meetingId: number }>>(
    `/crews/${crewId}/meetings`,
    body,
  );

  return data;
};

const GetMeetingMemberListAPI = async (crewId: string, meetingId: string) => {
  const { data } = await api.get<
    ApiResponse<GetMeetingMemberListAPIResponseBody[]>
  >(`/crews/${crewId}/meetings/${meetingId}`);

  return data;
};

const PostAttendMeetingAPI = async (
  crewId: string,
  meetingId: string,
  attend: boolean,
) => {
  const { data } = await api.post<ApiResponse<{ meetingId: string }>>(
    `/crews/${crewId}/meetings/${meetingId}?attend=${attend}`,
  );

  return data;
};

const GetMeetingListAPI = async (
  crewId: string,
  status: 'upcoming' | 'past',
) => {
  const { data } = await api.get<ApiResponse<GetMeetingListAPIResponseBody[]>>(
    `/crews/${crewId}/meetings`,
    {
      params: { status },
    },
  );

  return data;
};

const DeleteMeetingAPI = async (crewId: string, meetingId: string) => {
  const { data } = await api.delete<ApiResponse<HttpStatusCode>>(
    `/crews/${crewId}/meetings/${meetingId}`,
  );

  return data;
};

const PutUpdateMeetingAPI = async (
  crewId: string,
  meetingId: string,
  body: FormData,
) => {
  const { data } = await api.put<ApiResponse<{ meetingId: string }>>(
    `/crews/${crewId}/meetings/${meetingId}`,
    body,
  );

  return data;
};

export {
  PostCreateMeetingAPI,
  GetMeetingMemberListAPI,
  PostAttendMeetingAPI,
  GetMeetingListAPI,
  DeleteMeetingAPI,
  PutUpdateMeetingAPI,
};
