import { useEffect, useMemo } from 'react';

import { useQueryClient } from '@tanstack/react-query';
// import { EventSourcePolyfill } from 'event-source-polyfill';
import { toast } from 'react-toastify';

import ChevronRightIcon from '@/assets/icons/ChevronRightIcon.svg?react';
import useUserStore from '@/stores/user/useUserStore';

import styles from './HomeHeader.module.scss';

const HomeHeader = () => {
  const queryClient = useQueryClient();

  const { geo } = useUserStore();

  const handleClickGeo = () => {
    toast.info('지역 설정은 준비 중입니다.');
  };

  const VITE_API_URL = useMemo(() => import.meta.env.VITE_API_URL, []);

  const ACCESS_TOKEN = useMemo(
    () => sessionStorage.getItem('ACCESS_TOKEN'),
    [],
  );

  useEffect(() => {
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
    //   eventSource.onmessage = (e) => {
    //     console.log('onmessage', e);
    //     console.log(e.data);
    //   };
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
    <header className={styles.home_header}>
      <div className={styles.header_left} onClick={handleClickGeo}>
        {geo.district ? geo.district : '지역'}
        <ChevronRightIcon />
      </div>
    </header>
  );
};

export default HomeHeader;
