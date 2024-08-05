import { Link, useLocation } from 'react-router-dom';

import CrewIcon from '@/assets/icons/CrewIcon.svg?react';
import HomeIcon from '@/assets/icons/HomeIcon.svg?react';
import ProfileIcon from '@/assets/icons/ProfileIcon.svg?react';

import styles from './BottomNavigation.module.scss';

const BottomNavigation = () => {
  const location = useLocation();

  const isCurrentPath = (path: string) => {
    return location.pathname === path ? true : false;
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.nav_layout}>
        <Link to="/" className={styles.nav_item}>
          <div role="button" className={styles.nav_icon}>
            <HomeIcon
              fill={isCurrentPath('/') ? 'var(--black)' : 'var(--gray-500)'}
            />
          </div>
          <span
            className={
              isCurrentPath('/') ? styles.focused_nav_text : styles.nav_text
            }
          >
            홈
          </span>
        </Link>
        <Link to="/crew" className={styles.nav_item}>
          <div role="button" className={styles.nav_icon}>
            <CrewIcon
              fill={isCurrentPath('/crew') ? 'var(--black)' : 'var(--gray-500)'}
            />
          </div>
          <span
            className={
              isCurrentPath('/crew') ? styles.focused_nav_text : styles.nav_text
            }
          >
            내모임
          </span>
        </Link>
        <Link to="/profile" className={styles.nav_item}>
          <div role="button" className={styles.nav_icon}>
            <ProfileIcon
              fill={
                isCurrentPath('/profile') ? 'var(--black)' : 'var(--gray-500)'
              }
            />
          </div>
          <span
            className={
              isCurrentPath('/profile')
                ? styles.focused_nav_text
                : styles.nav_text
            }
          >
            프로필
          </span>
        </Link>
      </div>
    </nav>
  );
};

export default BottomNavigation;
