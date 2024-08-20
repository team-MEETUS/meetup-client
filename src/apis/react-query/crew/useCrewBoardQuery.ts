import { useQuery } from '@tanstack/react-query';

import crewBoardQueryKey from '@/apis/query-key/crewBoardQueryKey';
import {
  GetAllBoardAPI,
  GetBoardDetailAPI,
} from '@/apis/server/crew/crewBoardAPI';

// 게시글 목록 조회
export const useCrewBoardListQuery = (crewId: string, category?: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: crewBoardQueryKey.crewBoardList(crewId, category),
    queryFn: () => GetAllBoardAPI(crewId, category),
    select: (response) => response.data,
    enabled: !!crewId,
  });

  return { data, isLoading, error };
};

// 게시글 상세 조회
export const useCrewBoardDetailQuery = (crewId: string, boardId: string) => {
  const { data, isLoading, error, isSuccess } = useQuery({
    queryKey: crewBoardQueryKey.crewBoardDetail(crewId, boardId),
    queryFn: () => GetBoardDetailAPI(crewId, boardId),
    select: (response) => response.data,
    enabled: !!crewId && !!boardId,
  });

  return { data, isLoading, error, isSuccess };
};
