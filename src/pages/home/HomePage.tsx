import { Link } from 'react-router-dom';

import {
  useActiveCrewListQuery,
  useNewCrewListQuery,
} from '@/apis/react-query/crew/useHomeQuery';
import { useInterestBigQuery } from '@/apis/react-query/interest/useInterestQuery';
import CrewAddIcon from '@/assets/icons/CrewAddIcon.svg?react';
import CrewCard from '@/components/common/crew-card/CrewCard';
import HomeHeader from '@/components/header/HomeHeader';

import styles from './HomePage.module.scss';

const HomePage = () => {
  const { data: interestData } = useInterestBigQuery();

  const { data: newCrewListData } = useNewCrewListQuery();
  const { data: activeCrewListData } = useActiveCrewListQuery();
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <HomeHeader />
      </div>
      <div className={styles.interest_list}>
        {interestData?.map((interest) => (
          <div key={interest.interestBigId} className={styles.interest_item}>
            <span className={styles.interest_icon}>{interest.icon}</span>
            <span className={styles.interest_name}>{interest.name}</span>
          </div>
        ))}
      </div>

      <div className={styles.crew_list}>
        <h2 className={styles.crew_title}>새로 생긴 모임</h2>
        {newCrewListData &&
          newCrewListData.map((crew) => <CrewCard crew={crew} />)}
      </div>

      <div className={styles.crew_list}>
        <h2 className={styles.crew_title}>활동이 활발한 모임</h2>
        {activeCrewListData &&
          activeCrewListData.map((crew) => (
            <CrewCard type="active" crew={crew} />
          ))}
      </div>
      <Link
        className={styles.button_container}
        to="/crew/register/interest-big"
      >
        <CrewAddIcon />
      </Link>
    </div>
  );
};

export default HomePage;
