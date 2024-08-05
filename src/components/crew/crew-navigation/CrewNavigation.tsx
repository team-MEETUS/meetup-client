import { NavLink } from 'react-router-dom';

import styles from './CrewNavigation.module.scss';
const CrewNavigation = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.nav_layout}>
        <NavLink
          to="/crew"
          className={({ isActive }) =>
            [styles.nav_item, isActive ? styles.active_nav_item : ''].join(' ')
          }
        >
          홈
        </NavLink>
        <NavLink
          to="/crew/board"
          className={({ isActive }) =>
            [styles.nav_item, isActive ? styles.active_nav_item : ''].join(' ')
          }
        >
          게시판
        </NavLink>
        <NavLink
          to="/crew/album"
          className={({ isActive }) =>
            [styles.nav_item, isActive ? styles.active_nav_item : ''].join(' ')
          }
        >
          사진첩
        </NavLink>
        <NavLink
          to="/crew/chat"
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

export default CrewNavigation;
