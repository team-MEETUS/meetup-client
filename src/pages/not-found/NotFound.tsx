import { Link } from 'react-router-dom';

import styles from './NotFound.module.scss';

const NotFound = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.logo}>MEETUP</h1>
      <p className={styles.content}>404 Page not found</p>
      <Link to="/" className={styles.home}>
        홈으로 가기
      </Link>
    </div>
  );
};

export default NotFound;
