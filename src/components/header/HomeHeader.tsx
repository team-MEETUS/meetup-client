import ChevronRightIcon from '@/assets/icons/ChevronRightIcon.svg?react';

import styles from './HomeHeader.module.scss';

const HomeHeader = () => {
  return (
    <header className={styles.home_header}>
      <div className={styles.header_left}>
        중계 1동
        <ChevronRightIcon />
      </div>
    </header>
  );
};

export default HomeHeader;
