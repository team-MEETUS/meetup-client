import { useEffect, useMemo, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import classNames from 'classnames/bind';
import { toast } from 'react-toastify';

import { useNotificationListQuery } from '@/apis/react-query/crew/useHomeQuery';
import ChevronRightIcon from '@/assets/icons/ChevronRightIcon.svg?react';
import NotificationButton from '@/components/common/notification-button/NotificationButton';
import useUserStore from '@/stores/user/useUserStore';

import styles from './HomeHeader.module.scss';

interface HomeHeaderProps {
  type?: 'default' | 'profile';
}
const HomeHeader = ({ type = 'default' }: HomeHeaderProps) => {
  const cn = classNames.bind(styles);
  const queryClient = useQueryClient();

  const [notification] = useState<number>(0);

  const VITE_API_URL = useMemo(() => import.meta.env.VITE_API_URL, []);

  const ACCESS_TOKEN = useMemo(
    () => sessionStorage.getItem('ACCESS_TOKEN'),
    [],
  );

  const { geo } = useUserStore();

  const handleClickGeo = () => {
    toast.info('지역 설정은 준비 중입니다.');
  };

  const { data: notificationList } = useNotificationListQuery(
    ACCESS_TOKEN ? true : false,
  );

  useEffect(() => {
    // if (!ACCESS_TOKEN) return;
    // const connect = () => {
    //   const eventSource = new EventSourcePolyfill(
    //     `${VITE_API_URL}/notifications/subscribe`,
    //     {
    //       headers: {
    //         Authorization: `Bearer ${ACCESS_TOKEN}`,
    //         'Content-Type': 'text/event-stream',
    //       },
    //       heartbeatTimeout: 86400000,
    //     },
    //   );
    //   eventSource.addEventListener('notification', (e) => {
    //     const data: GetSubscribedNotificationResponseBody = JSON.parse(e.data);
    //     if (!data.message) {
    //       setNotification(data.notificationCount ?? 0);
    //     } else {
    //       toast.info(sanitizeHTML(data.message));
    //     }
    //   });
    //   eventSource.onerror = () => {
    //     eventSource.close();
    //   };
    //   return () => {
    //     eventSource.close();
    //   };
    // };
    // return connect();
  }, [VITE_API_URL, ACCESS_TOKEN, queryClient]);

  return (
    <header className={cn('home_header')}>
      <div className={cn('header_left')} onClick={handleClickGeo}>
        {geo.district ? geo.district : '지역'}
        <ChevronRightIcon />
      </div>
      {type === 'profile' ? null : (
        <div className={cn('header_right')}>
          {notificationList && (
            <NotificationButton
              notifications={notificationList}
              total={notification}
            />
          )}
        </div>
      )}
    </header>
  );
};

export default HomeHeader;
