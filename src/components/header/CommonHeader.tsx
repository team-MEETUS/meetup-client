import { useNavigate } from 'react-router-dom';

import BackArrowIcon from '@/assets/icons/BackArrowIcon.svg?react';

import styles from './CommonHeader.module.scss';

interface HeaderProps {
  title: string;
  onClick?: () => void;
}

const CommonHeader = (props: HeaderProps) => {
  const navigate = useNavigate();

  const handleClick = props.onClick || (() => navigate(-1));

  return (
    <header className={styles.crew_header}>
      <div className={styles.header_left}>
        <BackArrowIcon onClick={handleClick} />
      </div>
      <div className={styles.header_center}>
        <span className={styles.header_title}>{props.title}</span>
      </div>
      <span className={styles.aria_hidden} aria-hidden="true"></span>
    </header>
  );
};

export default CommonHeader;
