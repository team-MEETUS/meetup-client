import classNames from 'classnames/bind';

import style from './CrewMemberCard.module.scss';

interface CrewMemberCardProps {
  memberId: number;
  nickname: string;
  intro: string;
  saveImg: string;
}

const CrewMemberCard = ({
  memberId,
  nickname,
  intro,
  saveImg,
}: CrewMemberCardProps) => {
  const cn = classNames.bind(style);

  return (
    <div className={cn('container')} id={String(memberId)}>
      <img className={cn('profile_image')} src={saveImg} alt="profile" />
      <div className={cn('introduction')}>
        <span className={cn('nickname')}>{nickname}</span>
        <span className={cn('intro')}>{intro}</span>
      </div>
    </div>
  );
};

export default CrewMemberCard;
