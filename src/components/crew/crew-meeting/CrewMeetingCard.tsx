import classNames from 'classnames/bind';

import { useCrewMeetingMutation } from '@/apis/react-query/crew/useCrewMeetingMutation';
import { useCrewMeetingMemberListQuery } from '@/apis/react-query/crew/useCrewMeetingQuery';
import MoreIcon from '@/assets/icons/MoreIcon.svg?react';
import { calculateDday, DateType, formatDate } from '@/utils/date';

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

  const maxVisibleMembers = 8;

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

  const handleClickUrl = (
    event: React.MouseEvent<HTMLButtonElement>,
    url: string,
  ) => {
    event.preventDefault();
    event.stopPropagation();

    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className={cn('meeting_card')} onClick={onClick}>
      <div className={cn('card_content')}>
        <div className={cn('card_header')}>
          <div className={cn('header_info')}>
            <div className={cn('meeting_date')}>
              <span className={cn('date')}>
                {calculateDday(date).split(' ')[0]}
              </span>
              <span className={cn('d_day')}>
                {calculateDday(date).split(' ')[1]}
              </span>
            </div>
            <h2 className={cn('title')}>{name}</h2>
          </div>
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
          <div className={cn('image_container')}>
            <img src={saveImg} alt={name} className={cn('meeting_image')} />
          </div>
          <div className={cn('info_container')}>
            <span className={cn('date')}>
              일시: {formatDate(DateType.DATE_TIME, date)}
            </span>
            <span className={cn('location')}>
              위치: {loc}
              {url && (
                <button
                  onClick={(event) => handleClickUrl(event, url)}
                  className={cn('map_link')}
                >
                  (지도보기)
                </button>
              )}
            </span>
            <span className={cn('participants')}>
              참석 인원: {attend}/{max} (
              {availableSeats > 0 ? `${availableSeats}명 남음` : '정원 마감'})
            </span>
          </div>
        </div>
        {/* 참석 멤버 */}
        {crewMemberList && (
          <div className={cn('member_list')}>
            {crewMemberList.slice(0, maxVisibleMembers).map((member, index) => (
              <img
                key={index}
                src={member.crewMember.member.saveImg}
                alt={member.crewMember.member.nickname}
                className={cn('member_image')}
              />
            ))}
            {crewMemberList.length > maxVisibleMembers && (
              <span className={cn('more_members')}>
                <MoreIcon />
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CrewMeetingCard;
