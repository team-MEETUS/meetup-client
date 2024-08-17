import { useState } from 'react';

import classNames from 'classnames/bind';
import { useLocation, useNavigate } from 'react-router-dom';

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
import CrewMemberCard from '@/components/crew/crew-member/CrewMemberCard';
import CrewNavigation from '@/components/crew/crew-navigation/CrewNavigation';
import CrewTitle from '@/components/crew/crew-title/CrewTitle';
import { GetCrewMemberAPIResponseBody } from '@/types/crew/crewAPIType';
import { CrewMemberRole } from '@/types/crew/crewType';

import styles from './CrewPage.module.scss';

interface CrewState {
  crewId?: string;
}

const CrewPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const cn = classNames.bind(styles);
  const state = location.state as CrewState;
  const [crewId] = useState<string>(state.crewId || '');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const { data: crewDetailData } = useCrewDetailQuery(crewId);
  const { data: crewMemberData } = useCrewMemberQuery(crewId);
  const { data: crewMemberRole } = useCrewMemberRoleQuery(crewId);
  const { postCrewMemberSignUp } = useCrewMutation();

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
        <span></span>
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
                navigate('/crew/manage-member', { state: { crewId } })
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
