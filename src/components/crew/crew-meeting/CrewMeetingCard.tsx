import classNames from 'classnames/bind';

import { useCrewMeetingMutation } from '@/apis/react-query/crew/useCrewMeetingMutation';
import { useCrewMeetingMemberListQuery } from '@/apis/react-query/crew/useCrewMeetingQuery';

import styles from './CrewMeetingCard.module.scss';

interface CrewMeetingCardProps {
  meetingId: string;
  crewId: string;

  name: string;
  date: string;
  loc: string;
  url?: string;
  max: number;
  attend: number;
  saveImg: string;
  onClick: () => void;
}

const CrewMeetingCard = ({
  meetingId,
  crewId,
  name,
  date,
  loc,
  url,
  max,
  attend,
  saveImg,
  onClick,
}: CrewMeetingCardProps) => {
  const cn = classNames.bind(styles);
  const availableSeats = max - attend;

  const { data: crewMemberList } = useCrewMeetingMemberListQuery(
    crewId,
    meetingId,
  );

  const { postAttendMeeting } = useCrewMeetingMutation();
  const myMemberId = localStorage.getItem('MEMBER_ID');

  const isMember =
    crewMemberList &&
    crewMemberList.some(
      (member) => member.crewMember.member.memberId === Number(myMemberId),
    );

  // 참가 버튼
  const handleJoinClick = async (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
    event.stopPropagation();
    await postAttendMeeting.mutateAsync({ crewId, meetingId, attend: true });
  };

  // 취소 버튼
  const handleCancelClick = async (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
    event.stopPropagation();
    await postAttendMeeting.mutateAsync({ crewId, meetingId, attend: false });
  };

  return (
    <div className={cn('meeting_card')} onClick={onClick}>
      <div className={cn('image_container')}>
        <img src={saveImg} alt={name} className={cn('meeting_image')} />
      </div>
      <div className={cn('card_content')}>
        <div className={cn('card_header')}>
          <h2 className={cn('title')}>{name}</h2>
          {myMemberId &&
            (isMember ? (
              <button
                className={cn('cancel_button')}
                onClick={handleCancelClick}
              >
                취소
              </button>
            ) : (
              <button className={cn('join_button')} onClick={handleJoinClick}>
                참가
              </button>
            ))}
        </div>
        <div className={cn('card_body')}>
          <p className={cn('date')}>일시: {date}</p>
          <p className={cn('location')}>
            위치: {loc}
            {url && (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn('map_link')}
              >
                (지도보기)
              </a>
            )}
          </p>
          <p className={cn('participants')}>
            참석 인원: {attend}/{max} (
            {availableSeats > 0 ? `${availableSeats}명 남음` : '정원 마감'})
          </p>
        </div>
        {crewMemberList && (
          <div className={cn('member_list')}>
            {crewMemberList.map((member) => (
              <img
                key={member.crewMember.crewMemberId}
                src={member.crewMember.member.saveImg}
                alt={member.crewMember.member.nickname}
                className={cn('member_image')}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CrewMeetingCard;
