import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from './Header.module.scss';

const Header = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <header>
        <nav>
          <div className={styles.nav_left}>
            <Link to="/" className={styles.logo}>
              <h1>MEETUP</h1>
            </Link>
            {!isMobile && (
              <>
                <Link to="/meeting" className={styles.nav_item}>
                  모임
                </Link>
                <Link to="/regular-meeting" className={styles.nav_item}>
                  정모
                </Link>
                <Link to="/place" className={styles.nav_item}>
                  플레이스
                </Link>
              </>
            )}
          </div>
          <div className={styles.nav_right}>
            <Link to="/sign-in" className={styles.nav_item}>
              로그인
            </Link>
          </div>
        </nav>
      </header>
      {isMobile && (
        <div className={styles.bottom_nav}>
          <Link to="/meeting" className={styles.nav_item}>
            모임
          </Link>
          <Link to="/regular-meeting" className={styles.nav_item}>
            정모
          </Link>
          <Link to="/place" className={styles.nav_item}>
            플레이스
          </Link>
        </div>
      )}
    </>
  );
};

export default Header;
