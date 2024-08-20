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
          <div>{crew.geo.city}</div>
          <span>·</span>
          <div className={cn('crew_member')}>멤버 {crew.totalMember}</div>
          {type === 'active' ? <span>{crew.lastChatTime}</span> : null}
        </div>
      </div>
    </div>
  );
};

export default CrewCard;
