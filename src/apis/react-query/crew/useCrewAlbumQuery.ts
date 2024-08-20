import { useQuery } from '@tanstack/react-query';

import crewAlbumQueryKey from '@/apis/query-key/crewAlbumQueryKey';
import {
  GetAlbumDetailAPI,
  GetAlbumLikeAPI,
  GetAlbumListAPI,
} from '@/apis/server/crew/crewAlbumAPI';

// 사진첩 리스트 조회
export const useCrewAlbumListQuery = (crewId: string, page: string = '0') => {
  const { data, isLoading, error } = useQuery({
    queryKey: crewAlbumQueryKey.crewAlbumList(crewId),
    queryFn: () => GetAlbumListAPI(crewId, page),
    select: (response) => response.data,
    enabled: !!crewId,
  });

  return { data, isLoading, error };
};

// 사진첩 상세 조회
export const useCrewAlbumDetailQuery = (crewId: string, albumId: string) => {
  const { data, isLoading, error, isSuccess } = useQuery({
    queryKey: crewAlbumQueryKey.crewAlbumDetail(crewId, albumId),
    queryFn: () => GetAlbumDetailAPI(crewId, albumId),
    select: (response) => response.data,
    enabled: !!crewId && !!albumId,
  });

  return { data, isLoading, error, isSuccess };
};

// 사진첩 좋아요 조회
export const useCrewAlbumLikeQuery = (
  crewId: string,
  albumId: string,
  success?: boolean,
) => {
  const { data, isLoading, error } = useQuery({
    queryKey: crewAlbumQueryKey.crewAlbumLike(crewId, albumId),
    queryFn: () => GetAlbumLikeAPI(crewId, albumId),
    select: (response) => response.data,
    enabled: !!crewId && !!albumId && success,
  });

  return { data, isLoading, error };
};
