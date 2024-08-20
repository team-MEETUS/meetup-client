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

  // 디데이 계산
  const calculateDday = (date: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const meetingDate = new Date(date);
    meetingDate.setHours(0, 0, 0, 0);

    const diffInTime = meetingDate.getTime() - today.getTime();
    const diffInDays = Math.ceil(diffInTime / (1000 * 3600 * 24));

    // 요일 배열
    const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
    const dayOfWeek = daysOfWeek[meetingDate.getDay()];

    // 날짜 형식 "MM/DD(요일)"
    const formattedDate = `${String(meetingDate.getMonth() + 1).padStart(2, '0')}/${String(meetingDate.getDate()).padStart(2, '0')}(${dayOfWeek})`;

    // D-Day 계산
    const dDay =
      diffInDays >= 0 ? `D-${diffInDays}` : `D+${Math.abs(diffInDays)}`;

    return `${formattedDate} ${dDay}`;
  };

  // 날짜 및 시간 포맷
  const formatDateTime = (date: string) => {
    const meetingDate = new Date(date);

    const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
    const dayOfWeek = daysOfWeek[meetingDate.getDay()];

    const formattedDate = `${meetingDate.getMonth() + 1}/${meetingDate.getDate()}(${dayOfWeek})`;

    let hours = meetingDate.getHours();
    const minutes = meetingDate.getMinutes().toString().padStart(2, '0');
    const period = hours >= 12 ? '오후' : '오전';

    if (hours > 12) {
      hours -= 12;
    } else if (hours === 0) {
      hours = 12;
    }

    return `${formattedDate} ${period} ${hours}:${minutes}`;
  };

  return (
    <div className={cn('meeting_card')} onClick={onClick}>
      {/* 이미지 */}
      <div className={cn('image_container')}>
        <img src={saveImg} alt={name} className={cn('meeting_image')} />
      </div>
      {/* 컨텐츠 */}
      <div className={cn('card_content')}>
        {/* 컨텐츠 헤더 */}
        <div className={cn('card_header')}>
          <p className={cn('meeting_date')}>{calculateDday(date)}</p>
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
        {/* 컨텐츠 바디 */}
        <div className={cn('card_body')}>
          <p className={cn('date')}>일시: {formatDateTime(date)}</p>
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
        {/* 참석 멤버 */}
        {/* {crewMemberList && (
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
        )} */}
      </div>
    </div>
  );
};

export default CrewMeetingCard;
