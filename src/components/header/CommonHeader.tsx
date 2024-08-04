import { useNavigate } from 'react-router-dom';

import BackArrowIcon from '@/assets/icons/BackArrowIcon.svg?react';

import styles from './CommonHeader.module.scss';

interface HeaderProps {
  title: string;
}

const CommonHeader = (props: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className={styles.meeting_header}>
      <div className={styles.header_left}>
        <BackArrowIcon onClick={() => navigate(-1)} />
      </div>
      <div className={styles.header_center}>
        <span className={styles.header_title}>{props.title}</span>
      </div>
      <span className={styles.aria_hidden} aria-hidden="true"></span>
    </header>
  );
};

export default CommonHeader;
