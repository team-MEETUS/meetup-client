import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { ApiResponse } from '@/apis/server/type';
import { PostLoginAPI } from '@/apis/server/user/userAPI';

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
        navigate('/');
      } else {
        toast.error(error?.message);
      }
    },
    onError: () => {},
  });

  return {
    postLogin,
  };
};
