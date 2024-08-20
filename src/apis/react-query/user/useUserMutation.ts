import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useUserInfoQuery } from '@/apis/react-query/user/useUserQuery';
import { ApiResponse } from '@/apis/server/type';
import {
  PostCreateMemberAPI,
  PostLoginAPI,
  PostPhoneCheckAPI,
} from '@/apis/server/user/userAPI';
import useUserStore from '@/stores/user/useUserStore';

export const useUserMutation = () => {
  const navigate = useNavigate();

  const { data: userData } = useUserInfoQuery();

  const { updateUser } = useUserStore((state) => ({
    updateUser: state.updateUser,
  }));
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

        if (userData) {
          updateUser(userData);
        }
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

  const postPhoneCheck = useMutation({
    mutationFn: PostPhoneCheckAPI,
    onSuccess: (res) => {
      const { success, data, error }: ApiResponse<{ randomNum: number }> = res;

      if (success) {
        toast.success('인증번호가 발송되었습니다. 문자를 확인해주세요.');
        return data.randomNum;
      } else {
        toast.error(error?.message);
      }
    },
    onError: () => {},
  });

  return {
    postLogin,
    postCreateMember,
    postPhoneCheck,
  };
};
