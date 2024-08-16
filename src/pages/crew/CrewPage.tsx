import { useState } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import {
  useCrewDetailQuery,
  useCrewMemberQuery,
} from '@/apis/react-query/crew/useCrewQuery';
import CrewBanner from '@/components/crew/crew-banner/CrewBanner';
import CrewHeader from '@/components/crew/crew-header/CrewHeader';
import CrewLabel from '@/components/crew/crew-label/CrewLabel';
import CrewMemberCard from '@/components/crew/crew-member/CrewMemberCard';
import CrewNavigation from '@/components/crew/crew-navigation/CrewNavigation';
import CrewTitle from '@/components/crew/crew-title/CrewTitle';

import styles from './CrewPage.module.scss';

interface CrewState {
  crewId?: string;
}

const CrewPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state as CrewState;

  const [crewId] = useState<string>(state.crewId || '');

  const { data: crewDetailData } = useCrewDetailQuery(crewId);
  const { data: crewMemberData } = useCrewMemberQuery(crewId);

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

      {/* 모임 멤버 */}
      <div className={styles.crew_member}>
        {crewMemberData &&
          crewMemberData.map((member) => (
            <CrewMemberCard key={member.crewMemberId} {...member.member} />
          ))}
      </div>

      {/* 정기모임 */}
      <div className={styles.crew_meeting}>
        <span></span>
      </div>
    </div>
  );
};

export default CrewPage;
