import { useQuery } from '@tanstack/react-query';

import crewChatQueryKey from '@/apis/query-key/crewChatQueryKey';
import { GetAllChatAPI } from '@/apis/server/crew/crewChatAPI';

// 채팅 목록 조회
export const useCrewChatQuery = (crewId: string, receiverId?: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: crewChatQueryKey.crewChat(crewId, receiverId),
    queryFn: () => GetAllChatAPI(crewId, receiverId),
    select: (response) => response.data,
    enabled: !!crewId,
  });

  return { data, isLoading, error };
};
