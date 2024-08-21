import { useQuery } from '@tanstack/react-query';

import crewQueryKey from '@/apis/query-key/crewQueryKey';
import {
  GetAllCrewAPI,
  GetCrewDetailAPI,
  GetCrewMemberAPI,
  GetCrewMemberRoleAPI,
  GetIsLikeCrewAPI,
} from '@/apis/server/crew/crewAPI';

// 모임 목록 조회
export const useCrewListQuery = (params: {
  interestBigId?: number;
  interestSmallId?: number;
  page?: number;
}) => {
  const { data, isLoading, error } = useQuery({
    queryKey: crewQueryKey.crewList(params),
    queryFn: () => GetAllCrewAPI(params),
    select: (response) => response.data,
  });

  return { data, isLoading, error };
};

// 모임 상세 조회
export const useCrewDetailQuery = (crewId: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: crewQueryKey.crewDetail(crewId),
    queryFn: () => GetCrewDetailAPI(crewId),
    select: (response) => response.data,
    enabled: !!crewId,
  });

  return { data, isLoading, error };
};

// 모임 좋아요 조회
export const useCrewLikeQuery = (crewId: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: crewQueryKey.crewLike(crewId),
    queryFn: () => GetIsLikeCrewAPI(crewId),
    select: (response) => response.data,
    enabled: !!sessionStorage.getItem('ACCESS_TOKEN'),
  });

  return { data, isLoading, error };
};

// 모임 멤버 조회
export const useCrewMemberQuery = (crewId: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: crewQueryKey.crewMember(crewId, 'members'),
    queryFn: () => GetCrewMemberAPI(crewId, 'members'),
    select: (response) => response.data,
  });

  return { data, isLoading, error };
};

// 모임 가입 신청 조회
export const useCrewSignUpQuery = (crewId: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: crewQueryKey.crewMember(crewId, 'signup'),
    queryFn: () => GetCrewMemberAPI(crewId, 'signup'),
    select: (response) => response.data,
  });

  return { data, isLoading, error };
};

// 나의 모임 권한 조회
export const useCrewMemberRoleQuery = (crewId: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: crewQueryKey.crewMemberRole(crewId),
    queryFn: () => GetCrewMemberRoleAPI(crewId),
    select: (response) => response.data,
    enabled: !!sessionStorage.getItem('ACCESS_TOKEN'),
  });

  return { data, isLoading, error };
};
