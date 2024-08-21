import { useQuery } from '@tanstack/react-query';

import homeQueryKey from '@/apis/query-key/homeQueryKey';
import {
  GetActiveCrewListAPI,
  GetMyCrewListAPI,
  GetNewCrewListAPI,
  GetNotificationAPI,
  GetSearchCrewAPI,
} from '@/apis/server/home/homeAPI';

export const useNewCrewListQuery = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: homeQueryKey.newCrewList(),
    queryFn: () => GetNewCrewListAPI(),
    select: (response) => response.data,
  });

  return { data, isLoading, error };
};

export const useActiveCrewListQuery = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: homeQueryKey.activeCrewList(),
    queryFn: () => GetActiveCrewListAPI(),
    select: (response) => response.data,
  });

  return { data, isLoading, error };
};

export const useSearchCrewListQuery = (keyword: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: homeQueryKey.searchCrew(keyword),
    queryFn: () => GetSearchCrewAPI(keyword),
    select: (response) => response.data,
  });

  return { data, isLoading, error };
};

export const useMyCrewListQuery = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: homeQueryKey.myCrewList(),
    queryFn: () => GetMyCrewListAPI(),
    select: (response) => response.data,
  });

  return { data, isLoading, error };
};

export const useNotificationListQuery = (success: boolean) => {
  const { data, isLoading, error } = useQuery({
    queryKey: homeQueryKey.notificationList(),
    queryFn: () => GetNotificationAPI(),
    select: (response) => response.data,
    enabled: success,
  });

  return { data, isLoading, error };
};
