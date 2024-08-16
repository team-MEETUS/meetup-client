import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { useCrewMutation } from '@/apis/react-query/crew/useCrewMutation';
import { useCrewLikeQuery } from '@/apis/react-query/crew/useCrewQuery'; // 좋아요 여부 조회 API
import BackArrowIcon from '@/assets/icons/BackArrowIcon.svg?react';
import EmptyHeartIcon from '@/assets/icons/EmptyHeartIcon.svg?react';
import FilledHeartIcon from '@/assets/icons/FilledHeartIcon.svg?react';
import MoreIcon from '@/assets/icons/MoreIcon.svg?react';
import ShareIcon from '@/assets/icons/ShareIcon.svg?react';

import styles from './CrewHeader.module.scss';

interface CrewHeaderProps {
  crewId: string;
  title: string;
  onClick?: () => void;
}

const CrewHeader = ({ crewId, title, onClick }: CrewHeaderProps) => {
  const navigate = useNavigate();
  const handleClick = onClick || (() => navigate(-1));

  const { data: isLiked } = useCrewLikeQuery(crewId);
  const { postCrewLike } = useCrewMutation();

  const [isFilled, setIsFilled] = useState<boolean>(false);

  const toggleHeart = async () => {
    await postCrewLike.mutateAsync(crewId);
  };

  useEffect(() => {
    if (isLiked !== undefined) {
      setIsFilled(isLiked);
    }
  }, [isLiked]);

  return (
    <header className={styles.crew_header}>
      <div className={styles.header_right}>
        <BackArrowIcon onClick={handleClick} />
        <span className={styles.header_title}>{title}</span>
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
