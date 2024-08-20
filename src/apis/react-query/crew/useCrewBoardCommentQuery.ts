import { useQuery } from '@tanstack/react-query';

import crewBoardCommentQueryKey from '@/apis/query-key/crewBoardCommentQueryKey';
import { GetBoardCommentAPI } from '@/apis/server/crew/crewBoardCommentAPI';

// 게시글 댓글 목록 조회
export const useCrewBoardCommentListQuery = (
  crewId: string,
  boardId: string,
  success?: boolean,
) => {
  const { data, isLoading, error } = useQuery({
    queryKey: crewBoardCommentQueryKey.crewBoardCommentList(crewId, boardId),
    queryFn: () => GetBoardCommentAPI(crewId, boardId),
    select: (response) => response.data,
    enabled: !!crewId && !!boardId && success,
  });

  return { data, isLoading, error };
};
