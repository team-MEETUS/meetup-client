import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { ApiResponse } from '@/apis/server/type';
import { PostCreateMemberAPI, PostLoginAPI } from '@/apis/server/user/userAPI';

export const useUserMutation = () => {
  const navigate = useNavigate();

  const postLogin = useMutation({
    mutationFn: PostLoginAPI,
    onSuccess: (res) => {
      const {
        success,
        data,
        error,
      }: ApiResponse<{ memberId: number; accessToken: string }> = res;

      if (success) {
        sessionStorage.setItem('ACCESS_TOKEN', data.accessToken);
        localStorage.setItem('MEMBER_ID', String(data.memberId));
        navigate('/');
      } else {
        toast.error(error?.message);
      }
    },
    onError: () => {},
  });

  const postCreateMember = useMutation({
    mutationFn: PostCreateMemberAPI,
    onSuccess: (res) => {
      const { success, error }: ApiResponse<{ memberId: number }> = res;

      if (success) {
        navigate('/user/login');
        toast.success('회원가입이 완료되었습니다. 로그인해주세요.');
      } else {
        toast.error(error?.message);
      }
    },
    onError: () => {},
  });

  return {
    postLogin,
    postCreateMember,
  };
};
