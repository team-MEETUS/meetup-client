import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import crewMeetingQueryKey from '@/apis/query-key/crewMeetingQueryKey';
import {
  DeleteMeetingAPI,
  PostAttendMeetingAPI,
  PostCreateMeetingAPI,
  PutUpdateMeetingAPI,
} from '@/apis/server/crew/crewMeetingAPI';

export const useCrewMeetingMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const postCreateMeeting = useMutation({
    mutationFn: (params: { crewId: string; body: FormData }) =>
      PostCreateMeetingAPI(params.crewId, params.body),
    onSuccess: async (_, params) => {
      await queryClient.invalidateQueries({
        queryKey: crewMeetingQueryKey.crewMeetingList(
          params.crewId,
          'upcoming',
        ),
      });

      toast.success('모임이 생성되었습니다.');

      navigate(`/crew/${params.crewId}/home`, {
        state: { crewId: params.crewId },
      });
    },
    onError: () => {},
  });

  const postAttendMeeting = useMutation({
    mutationFn: (params: {
      crewId: string;
      meetingId: string;
      attend: boolean;
    }) => PostAttendMeetingAPI(params.crewId, params.meetingId, params.attend),
    onSuccess: async (_, params) => {
      await queryClient.invalidateQueries({
        queryKey: crewMeetingQueryKey.crewMeetingList(
          params.crewId,
          'upcoming',
        ),
      });
      await queryClient.invalidateQueries({
        queryKey: crewMeetingQueryKey.crewMeetingMemberList(
          params.crewId,
          params.meetingId,
        ),
      });
      toast.success('모임 참여가 완료되었습니다.');
    },
    onError: () => {},
  });

  const postDeleteMeeting = useMutation({
    mutationFn: (params: { crewId: string; meetingId: string }) =>
      DeleteMeetingAPI(params.crewId, params.meetingId),
    onSuccess: async (_, params) => {
      await queryClient.invalidateQueries({
        queryKey: crewMeetingQueryKey.crewMeetingList(
          params.crewId,
          'upcoming',
        ),
      });

      toast.success('모임이 삭제되었습니다.');
      navigate(`/crew/${params.crewId}/home`, {
        state: { crewId: params.crewId },
      });
    },
    onError: () => {},
  });

  const putUpdateMeeting = useMutation({
    mutationFn: (params: {
      crewId: string;
      meetingId: string;
      body: FormData;
    }) => PutUpdateMeetingAPI(params.crewId, params.meetingId, params.body),
    onSuccess: async (_, params) => {
      await queryClient.invalidateQueries({
        queryKey: crewMeetingQueryKey.crewMeetingList(
          params.crewId,
          'upcoming',
        ),
      });

      toast.success('모임이 수정되었습니다.');
      navigate(`/crew/${params.crewId}/home`, {
        state: { crewId: params.crewId },
      });
    },
    onError: () => {},
  });

  return {
    postCreateMeeting,
    postAttendMeeting,
    postDeleteMeeting,
    putUpdateMeeting,
  };
};
