import { NavLink } from 'react-router-dom';

import styles from './CrewNavigation.module.scss';

interface CrewNavigationProps {
  id: string;
}

const CrewNavigation = (props: CrewNavigationProps) => {
  return (
    <nav className={styles.nav}>
      <div className={styles.nav_layout}>
        <NavLink
          to={`/crew/${props.id}/home`}
          className={({ isActive }) =>
            [styles.nav_item, isActive ? styles.active_nav_item : ''].join(' ')
          }
        >
          홈
        </NavLink>
        <NavLink
          to={`/crew/${props.id}/board`}
          className={({ isActive }) =>
            [styles.nav_item, isActive ? styles.active_nav_item : ''].join(' ')
          }
        >
          게시판
        </NavLink>
        <NavLink
          to={`/crew/${props.id}/album`}
          className={({ isActive }) =>
            [styles.nav_item, isActive ? styles.active_nav_item : ''].join(' ')
          }
        >
          사진첩
        </NavLink>
        <NavLink
          to={`/crew/${props.id}/chat`}
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
