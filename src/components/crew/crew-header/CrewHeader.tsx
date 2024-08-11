import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import BackArrowIcon from '@/assets/icons/BackArrowIcon.svg?react';
import EmptyHeartIcon from '@/assets/icons/EmptyHeartIcon.svg?react';
import FilledHeartIcon from '@/assets/icons/FilledHeartIcon.svg?react';
import MoreIcon from '@/assets/icons/MoreIcon.svg?react';
import ShareIcon from '@/assets/icons/ShareIcon.svg?react';

import styles from './CrewHeader.module.scss';

interface CrewHeaderProps {
  title: string;
  onClick?: () => void;
}

const CrewHeader = (props: CrewHeaderProps) => {
  const navigate = useNavigate();
  const handleClick = props.onClick || (() => navigate(-1));

  const [isFilled, setIsFilled] = useState(false);

  const toggleHeart = () => setIsFilled(!isFilled);

  return (
    <header className={styles.crew_header}>
      <div className={styles.header_right}>
        <BackArrowIcon onClick={handleClick} />
        <span className={styles.header_title}>{props.title}</span>
      </div>
      <div className={styles.header_left}>
        {isFilled ? (
          <FilledHeartIcon onClick={toggleHeart} />
        ) : (
          <EmptyHeartIcon onClick={toggleHeart} />
        )}
        <ShareIcon />
        <MoreIcon />
      </div>
    </header>
  );
};

export default CrewHeader;
