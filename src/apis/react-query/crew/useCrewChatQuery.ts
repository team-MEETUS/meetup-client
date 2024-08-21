import { useQuery } from '@tanstack/react-query';

import crewChatQueryKey from '@/apis/query-key/crewChatQueryKey';
import { GetAllChatAPI } from '@/apis/server/crew/crewChatAPI';

// 모임 채팅 목록 조회
export const useCrewChatQuery = (crewId: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: crewChatQueryKey.crewChat(crewId),
    queryFn: () => GetAllChatAPI(crewId),
    select: (response) => response.data,
    enabled: !!crewId,
  });

  return { data, isLoading, error };
};

// 1대1 채팅 목록 조회
export const useCrewPrivateChatQuery = (crewId: string, receiverId: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: crewChatQueryKey.crewPrivateChat(crewId, receiverId),
    queryFn: () => GetAllChatAPI(crewId, receiverId),
    select: (response) => response.data,
    enabled: !!crewId,
  });

  return { data, isLoading, error };
};
