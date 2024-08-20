import { toast } from 'react-toastify';

import ChevronRightIcon from '@/assets/icons/ChevronRightIcon.svg?react';
import useUserStore from '@/stores/user/useUserStore';

import styles from './HomeHeader.module.scss';

const HomeHeader = () => {
  const { geo } = useUserStore();

  const handleClickGeo = () => {
    toast.info('지역 설정은 준비 중입니다.');
  };
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
