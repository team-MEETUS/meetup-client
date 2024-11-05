import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';

import styles from './CrewNavigation.module.scss';

interface CrewNavigationProps {
  id: string;
  isMember?: boolean;
}

const CrewNavigation = (props: CrewNavigationProps) => {
  const handleChatClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    if (!props.isMember) {
      e.preventDefault();
      toast.error('모임 가입 후 이용 가능합니다.');
    }
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.nav_layout}>
        <NavLink
          to={`/crew/${props.id}/home`}
          state={{ crewId: props.id }}
          className={({ isActive }) =>
            [styles.nav_item, isActive ? styles.active_nav_item : ''].join(' ')
          }
        >
          홈
        </NavLink>
        <NavLink
          to={`/crew/${props.id}/board`}
          state={{ crewId: props.id }}
          className={({ isActive }) =>
            [styles.nav_item, isActive ? styles.active_nav_item : ''].join(' ')
          }
        >
          게시판
        </NavLink>
        <NavLink
          to={`/crew/${props.id}/album`}
          state={{ crewId: props.id }}
          className={({ isActive }) =>
            [styles.nav_item, isActive ? styles.active_nav_item : ''].join(' ')
          }
        >
          사진첩
        </NavLink>
        <NavLink
          to={`/crew/${props.id}/chat`}
          state={{ crewId: props.id }}
          className={({ isActive }) =>
            [styles.nav_item, isActive ? styles.active_nav_item : ''].join(' ')
          }
          onClick={handleChatClick}
        >
          채팅
        </NavLink>
      </div>
    </nav>
  );
};

export default CrewNavigation;
