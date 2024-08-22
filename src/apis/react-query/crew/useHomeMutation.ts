import { useMutation, useQueryClient } from '@tanstack/react-query';

import homeQueryKey from '@/apis/query-key/homeQueryKey';
import { PutNotificationReadAPI } from '@/apis/server/home/homeAPI';

export const useHomeMutation = () => {
  const queryClient = useQueryClient();

  const putNotificationRead = useMutation({
    mutationFn: (notificationId: string) =>
      PutNotificationReadAPI(notificationId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: homeQueryKey.notificationList(),
      });
    },
    onError: () => {},
  });

  return { putNotificationRead };
};
