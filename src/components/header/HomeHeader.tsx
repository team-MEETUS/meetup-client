/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useEffect, useMemo, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import classNames from 'classnames/bind';
import { EventSourcePolyfill } from 'event-source-polyfill';
import { toast } from 'react-toastify';

import { useNotificationListQuery } from '@/apis/react-query/crew/useHomeQuery';
import ChevronRightIcon from '@/assets/icons/ChevronRightIcon.svg?react';
import NotificationButton from '@/components/common/notification-button/NotificationButton';
import useUserStore from '@/stores/user/useUserStore';
import { GetSubscribedNotificationResponseBody } from '@/types/home/homeAPIType';
import { sanitizeHTML } from '@/utils/sanitizeHTML';

import styles from './HomeHeader.module.scss';

interface HomeHeaderProps {
  type?: 'default' | 'profile';
}
const HomeHeader = ({ type = 'default' }: HomeHeaderProps) => {
  const cn = classNames.bind(styles);
  const queryClient = useQueryClient();

  const [notification, setNotification] = useState<number>(0);

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
    if (!ACCESS_TOKEN) return;

    let eventSource: EventSourcePolyfill;

    const connect = () => {
      eventSource = new EventSourcePolyfill(
        `${VITE_API_URL}/notifications/subscribe`,
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
            'Content-Type': 'text/event-stream',
          },
          heartbeatTimeout: 86400000,
        },
      );

      eventSource.addEventListener('notification', (e) => {
        const data: GetSubscribedNotificationResponseBody = JSON.parse(e.data);
        if (!data.message) {
          setNotification(data.notificationCount);
          // 쿼리 무효화로 알림 목록 갱신
          queryClient.invalidateQueries(['notificationList']);
        } else {
          toast.info(sanitizeHTML(data.message));
        }
      });

      eventSource.onerror = () => {
        eventSource.close();

        // 일정 시간 후에 재연결 시도
        setTimeout(() => {
          console.log('Reconnecting to SSE...');
          connect();
        }, 1000);
      };
    };

    connect(); // 초기 연결

    // 서버 타임아웃 전에 재연결
    const intervalId = setInterval(() => {
      console.log('Reconnecting to SSE...');
      eventSource.close(); // 기존 연결을 닫고
      connect(); // 새로운 연결 시도
    }, 55000); // 55초마다 재연결 시도 (60초 타임아웃 이전에)

    return () => {
      clearInterval(intervalId); // 컴포넌트 언마운트 시 interval 정리
      eventSource.close();
    };
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

