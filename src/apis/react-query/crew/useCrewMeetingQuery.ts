import { useQuery } from '@tanstack/react-query';

import crewMeetingQueryKey from '@/apis/query-key/crewMeetingQueryKey';
import {
  GetMeetingListAPI,
  GetMeetingMemberListAPI,
} from '@/apis/server/crew/crewMeetingAPI';

export const useCrewMeetingListQuery = (
  crewId: string,
  status: 'upcoming' | 'past',
) => {
  const { data, isLoading, error } = useQuery({
    queryKey: crewMeetingQueryKey.crewMeetingList(crewId, status),
    queryFn: () => GetMeetingListAPI(crewId, status),
    select: (response) => response.data,
    enabled: !!crewId,
  });

  return { data, isLoading, error };
};

export const useCrewMeetingMemberListQuery = (
  crewId: string,
  meetingId: string,
) => {
  const { data, isLoading, error } = useQuery({
    queryKey: crewMeetingQueryKey.crewMeetingMemberList(crewId, meetingId),
    queryFn: () => GetMeetingMemberListAPI(crewId, meetingId),
    select: (response) => response.data,
    enabled: !!crewId && !!meetingId,
  });

  return { data, isLoading, error };
};
