import { Link } from 'react-router-dom';

import MeetingAddIcon from '@/assets/icons/MeetingAddIcon.svg?react';

import styles from './HomePage.module.scss';

const HomePage = () => {
  return (
    <div className={styles.container}>
      홈
      <button className={styles.button_container}>
        <Link to="/meeting/register">
          <MeetingAddIcon />
        </Link>
      </button>
    </div>
  );
};

export default HomePage;
