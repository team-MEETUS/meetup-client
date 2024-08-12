import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { PostLoginAPI } from '@/apis/server/user/userAPI';

export const useUserMutation = () => {
  const navigate = useNavigate();

  const postLogin = useMutation({
    mutationFn: PostLoginAPI,
    onSuccess: (res) => {
      const { success, data, error } = res;
      if (success) {
        sessionStorage.setItem('ACCESS_TOKEN', data.accessToken);
        navigate('/');
      } else {
        console.log(error);
      }
    },
    onError: () => {},
  });

  return {
    postLogin,
  };
};
