import { useState } from 'react';

import classNames from 'classnames/bind';
import { useLocation, useNavigate } from 'react-router-dom';

import { useCrewMeetingListQuery } from '@/apis/react-query/crew/useCrewMeetingQuery';
import { useCrewMutation } from '@/apis/react-query/crew/useCrewMutation';
import {
  useCrewDetailQuery,
  useCrewMemberQuery,
  useCrewMemberRoleQuery,
} from '@/apis/react-query/crew/useCrewQuery';
import PersonIcon from '@/assets/icons/PersonIcon.svg?react';
import CrewBanner from '@/components/crew/crew-banner/CrewBanner';
import CrewHeader from '@/components/crew/crew-header/CrewHeader';
import CrewLabel from '@/components/crew/crew-label/CrewLabel';
import CrewMeetingCard from '@/components/crew/crew-meeting/CrewMeetingCard';
import CrewMemberCard from '@/components/crew/crew-member/CrewMemberCard';
import CrewNavigation from '@/components/crew/crew-navigation/CrewNavigation';
import CrewTitle from '@/components/crew/crew-title/CrewTitle';
import { GetCrewMemberAPIResponseBody } from '@/types/crew/crewAPIType';
import { CrewMemberRole } from '@/types/crew/crewType';

import styles from './CrewPage.module.scss';

interface CrewState {
  crewId: string;
}

const CrewPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const cn = classNames.bind(styles);
  const state = location.state as CrewState;
  const [crewId] = useState<string>(state.crewId || '');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showPastMeetings, setShowPastMeetings] = useState<boolean>(false);

  const { data: crewDetailData } = useCrewDetailQuery(crewId);
  const { data: crewMemberData } = useCrewMemberQuery(crewId);
  const { data: crewMemberRole } = useCrewMemberRoleQuery(crewId);
  const { postCrewMemberSignUp } = useCrewMutation();

  const { data: crewMeetingUpcomingList } = useCrewMeetingListQuery(
    crewId,
    'upcoming',
  );
  const { data: crewMeetingPastList } = useCrewMeetingListQuery(crewId, 'past');

  const handleSignUpCrew = async () => {
    const isConfirmed = window.confirm('가입신청을 하시겠습니까?');

    if (isConfirmed) {
      await postCrewMemberSignUp.mutateAsync(crewId);
    }
  };

  const filterMembers = (members: GetCrewMemberAPIResponseBody[]) => {
    return members.filter((member) =>
      member.member.nickname.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  };

  const isAdmin =
    crewMemberRole === CrewMemberRole.ADMIN ||
    crewMemberRole === CrewMemberRole.LEADER;

  const handleCreateMeetingClick = () => {
    if (!isAdmin) {
      return;
    }

    navigate(`/crew/${crewId}/meeting-register`, {
      state: { crewId, isEdit: false },
    });
  };
  const handleMeetingCardClick = (
    meetingId: string,
    meetingData: object,
    isEdit: boolean,
  ) => {
    if (
      crewMemberRole !== CrewMemberRole.LEADER &&
      crewMemberRole !== CrewMemberRole.ADMIN
    ) {
      return;
    }

    navigate(`/crew/${crewId}/meeting-register/${meetingId}`, {
      state: { crewId, meetingId, meetingData, isEdit },
    });
  };

  const toggleMeetings = () => {
    setShowPastMeetings((prev) => !prev);
  };
  return (
    <div className={styles.container}>
      {/* 모임 정보 */}
      {crewDetailData && (
        <div className={styles.crew_detail}>
          <div className={styles.header}>
            <CrewHeader
              crewId={crewId}
              title={crewDetailData.name}
              onClick={() => navigate('/')}
            />
            <CrewNavigation id={crewId} />
          </div>

          <CrewBanner imgSrc={crewDetailData.saveImg} />
          <div className={styles.content}>
            <div className={styles.label_container}>
              <CrewLabel text={crewDetailData.geo.district} />
              <CrewLabel text={crewDetailData.interestBig.name} />
              <CrewLabel text={`멤버 ${crewDetailData.totalMember}`} />
            </div>
            <CrewTitle title={crewDetailData.name} />
            <div>{crewDetailData.content}</div>
          </div>
        </div>
      )}

      {/* 정기모임 */}
      <div className={styles.crew_meeting}>
        <div className={styles.toggle_container}>
          <span className={styles.current_meeting}>
            {showPastMeetings ? '지난 모임' : '진행중인 모임'}
          </span>
          <button
            className={cn('toggle_button', { active: !showPastMeetings })}
            onClick={toggleMeetings}
          >
            {showPastMeetings ? '진행중인 모임 보기' : '지난 모임 보기'}
          </button>
        </div>

        <div className={cn('card_list')}>
          {showPastMeetings ? (
            crewMeetingPastList && crewMeetingPastList.length > 0 ? (
              crewMeetingPastList.map((meeting) => (
                <CrewMeetingCard
                  key={meeting.meetingId}
                  meetingId={String(meeting.meetingId)}
                  crewId={String(crewId)}
                  name={meeting.name}
                  date={meeting.date}
                  loc={meeting.loc}
                  max={meeting.max}
                  attend={meeting.attend}
                  url={meeting.url}
                  saveImg={meeting.saveImg}
                  onClick={() =>
                    handleMeetingCardClick(
                      String(meeting.meetingId),
                      meeting,
                      true,
                    )
                  }
                />
              ))
            ) : (
              <span className={cn('no_meeting')}>모임이 없습니다</span>
            )
          ) : crewMeetingUpcomingList && crewMeetingUpcomingList.length > 0 ? (
            crewMeetingUpcomingList.map((meeting) => (
              <CrewMeetingCard
                meetingId={String(meeting.meetingId)}
                crewId={String(crewId)}
                key={meeting.meetingId}
                name={meeting.name}
                date={meeting.date}
                loc={meeting.loc}
                max={meeting.max}
                attend={meeting.attend}
                url={meeting.url}
                saveImg={meeting.saveImg}
                onClick={() =>
                  handleMeetingCardClick(
                    String(meeting.meetingId),
                    meeting,
                    true,
                  )
                }
              />
            ))
          ) : (
            <span className={cn('no_meeting')}>모임이 없습니다</span>
          )}
        </div>
        {isAdmin ? (
          <span
            className={cn('create_meeting')}
            onClick={handleCreateMeetingClick}
          >
            정모 만들기
          </span>
        ) : null}
      </div>

      {/* 모임 멤버 */}
      <div className={styles.crew_member}>
        {/* 검색창 */}

        <div className={styles.member_header}>
          <span className={styles.header_title}>모임 멤버</span>

          {crewMemberRole === CrewMemberRole.LEADER ||
          crewMemberRole === CrewMemberRole.ADMIN ? (
            <span
              className={styles.manage_button}
              onClick={() =>
                navigate(`/crew/${crewId}/manage-member`, { state: { crewId } })
              }
            >
              <PersonIcon width={15} height={15} />
              관리
            </span>
          ) : null}
        </div>
        <input
          className={cn('search_container')}
          type="text"
          placeholder="회원 이름 검색"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div>
          {crewMemberData &&
            filterMembers(crewMemberData).map((member) => (
              <CrewMemberCard
                key={member.crewMemberId}
                memberData={member.member}
                crewId={crewId}
                role={member.role}
              />
            ))}
        </div>
      </div>

      {!crewMemberRole && (
        <button className={styles.register_button} onClick={handleSignUpCrew}>
          모임 가입하기
        </button>
      )}
    </div>
  );
};

export default CrewPage;
