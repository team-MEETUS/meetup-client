import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import BackArrowIcon from '@/assets/icons/BackArrowIcon.svg?react';
import FilledHeartIcon from '@/assets/icons/FilledHeartIcon.svg?react';
import EmptyHeartIcon from '@/assets/icons/EmptyHeartIcon.svg?react';
import ShareIcon from '@/assets/icons/ShareIcon.svg?react';
import MoreIcon from '@/assets/icons/MoreIcon.svg?react';

import styles from './MeetingHeader.module.scss';

interface MeetingHeaderProps {
  title: string;
}

const MeetingHeader = (props: MeetingHeaderProps) => {
  const [isFilled, setIsFilled] = useState(false);
  const navigate = useNavigate();

  const toggleHeart = () => setIsFilled(!isFilled);

  return (
    <header className={styles.meeting_header}>
      <div className={styles.header_right}>
        <BackArrowIcon onClick={() => navigate(-1)} />
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

export default MeetingHeader;
