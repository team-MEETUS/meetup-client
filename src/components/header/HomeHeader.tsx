import ChevronRightIcon from '@/assets/icons/ChevronRightIcon.svg?react';
import useUserStore from '@/stores/user/useUserStore';

import styles from './HomeHeader.module.scss';

const HomeHeader = () => {
  const { geo } = useUserStore();

  return (
    <header className={styles.home_header}>
      <div className={styles.header_left}>
        {geo.district}
        <ChevronRightIcon />
      </div>
    </header>
  );
};

export default HomeHeader;
