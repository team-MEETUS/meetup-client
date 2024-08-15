import { useNavigate } from 'react-router-dom';

import BackArrowIcon from '@/assets/icons/BackArrowIcon.svg?react';

import styles from './CommonHeader.module.scss';

interface HeaderProps {
  title: string;
  option?: React.ReactNode;
  onBackClick?: () => void;
  onOptionClick?: () => void;
}

const CommonHeader = ({
  title,
  option,
  onBackClick,
  onOptionClick,
}: HeaderProps) => {
  const navigate = useNavigate();

  const handleClick = onBackClick || (() => navigate(-1));

  return (
    <header className={styles.crew_header}>
      <div className={styles.header_left}>
        <BackArrowIcon onClick={handleClick} />
      </div>
      <div className={styles.header_center}>
        <span className={styles.header_title}>{title}</span>
      </div>
      <div className={styles.header_right}>
        {option && (
          <div onClick={onOptionClick} className={styles.option_container}>
            {typeof option === 'string' ? <span>{option}</span> : option}
          </div>
        )}
      </div>
    </header>
  );
};

export default CommonHeader;
