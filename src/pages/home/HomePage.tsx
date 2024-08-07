import { Link } from 'react-router-dom';

import CrewAddIcon from '@/assets/icons/CrewAddIcon.svg?react';

import styles from './HomePage.module.scss';

const HomePage = () => {
  return (
    <div className={styles.container}>
      홈
      <button className={styles.button_container}>
        <Link to="/crew/register/interest-big">
          <CrewAddIcon />
        </Link>
      </button>
    </div>
  );
};

export default HomePage;
