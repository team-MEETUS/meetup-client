import { Link } from 'react-router-dom';

import styles from './Header.module.scss';
import { useEffect, useState } from 'react';

const Header = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // 페이지 로드 시 한 번 실행하고, 창 크기 변경 시 다시 실행합니다.
    handleResize();
    window.addEventListener('resize', handleResize);

    // 컴포넌트 언마운트 시 리스너를 제거합니다.
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (isMobile) {
    return (
      <>
        <header>
          <nav>
            <Link to="/" className={styles.logo}>
              <h1>MEETUP</h1>
            </Link>
          </nav>
        </header>

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
          <Link to="/sign-in" className={styles.nav_item}>
            로그인
          </Link>
          <Link to="/sign-up" className={styles.nav_item}>
            회원가입
          </Link>
        </div>
      </>
    );
  }

  return (
    <header>
      <nav>
        <div className={styles.nav_left}>
          <Link to="/" className={styles.logo}>
            <h1>MEETUP</h1>
          </Link>

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

        <div className={styles.nav_right}>
          <Link to="/sign-in" className={styles.nav_item}>
            로그인
          </Link>
          <Link to="/sign-up" className={styles.nav_item}>
            회원가입
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
