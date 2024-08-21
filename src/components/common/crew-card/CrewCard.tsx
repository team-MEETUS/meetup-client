import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';

import { CrewSelectRespDto } from '@/types/home/homeAPIType';

import styles from './CrewCard.module.scss';

interface CrewCardProps {
  crew: CrewSelectRespDto;
  type?: 'default' | 'active';
}

const CrewCard = ({ crew, type = 'default' }: CrewCardProps) => {
  const cn = classNames.bind(styles);
  const navigate = useNavigate();

  const handleClickCrew = (crewId: string) => {
    navigate(`/crew/${crewId}/home`, { state: { crewId: crewId } });
  };

  const formatLastChatTime = (lastChatTime: string) => {
    const now = new Date();
    const lastChatDate = new Date(
      new Date(lastChatTime).toLocaleString('en-US', {
        timeZone: 'Asia/Seoul',
      }),
    );
    const diff = now.getTime() - lastChatDate.getTime();

    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
    const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));

    if (minutes < 1) {
      return '방금 대화';
    } else if (minutes < 60) {
      return `${minutes}분 전 대화`;
    } else if (hours < 24) {
      return `${hours}시간 전 대화`;
    } else if (days < 30) {
      return `${days}일 전 대화`;
    } else if (months < 12) {
      return `${months}달 전 대화`;
    } else {
      return `${years}년 전 대화`;
    }
  };

  return (
    <div
      key={crew.crewId}
      className={cn('crew_item')}
      onClick={() => handleClickCrew(String(crew.crewId))}
    >
      <div className={cn('crew_image')}>
        <img src={crew.saveImg} alt="crew" />
      </div>
      <div className={cn('crew_info')}>
        <div className={cn('crew_name')}>{crew.name}</div>
        <div className={cn('crew_intro')}>{crew.intro}</div>

        <div className={cn('crew_data')}>
          <div className={cn('crew_label')}>{crew.interestBig.name}</div>
          <span>·</span>
          <div className={cn('crew_city')}>{crew.geo.city}</div>
          <span>·</span>
          <div className={cn('crew_member')}>멤버 {crew.totalMember}</div>
          {type === 'active' ? (
            <>
              <span>·</span>
              <div className={cn('crew_chat')}>
                {crew.lastChatTime && formatLastChatTime(crew.lastChatTime)}
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default CrewCard;
