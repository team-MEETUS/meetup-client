import { Link, NavLink } from 'react-router-dom';

import styles from './MeetingNavigation.module.scss';
const MeetingNavigation = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.nav_layout}>
        <NavLink
          to="/meeting"
          className={({ isActive }) =>
            [styles.nav_item, isActive ? styles.active_nav_item : ''].join(' ')
          }
        >
          홈
        </NavLink>
        <NavLink
          to="/meeting/board"
          className={({ isActive }) =>
            [styles.nav_item, isActive ? styles.active_nav_item : ''].join(' ')
          }
        >
          게시판
        </NavLink>
        <NavLink
          to="/meeting/album"
          className={({ isActive }) =>
            [styles.nav_item, isActive ? styles.active_nav_item : ''].join(' ')
          }
        >
          사진첩
        </NavLink>
        <NavLink
          to="/meeting/chat"
          className={({ isActive }) =>
            [styles.nav_item, isActive ? styles.active_nav_item : ''].join(' ')
          }
        >
          채팅
        </NavLink>
      </div>
    </nav>
  );
};

export default MeetingNavigation;
