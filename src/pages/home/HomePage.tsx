import AddIcon from '@/assets/icons/AddIcon.svg?react';

import styles from './HomePage.module.scss';

const HomePage = () => {
  return (
    <div className={styles.container}>
      홈
      <button className={styles.button_container}>
        <AddIcon />
      </button>
    </div>
  );
};

export default HomePage;
