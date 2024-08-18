import { Link, useNavigate } from 'react-router-dom';

import { useInterestBigQuery } from '@/apis/react-query/interest/useInterestQuery';
import CrewAddIcon from '@/assets/icons/CrewAddIcon.svg?react';
import HomeHeader from '@/components/header/HomeHeader';

import styles from './HomePage.module.scss';

export interface CrewData {
  image: string;
  id: number;
  name: string;
  intro: string;
  label: string;
  city: string;
  member: number;
}

const HomePage = () => {
  const navigate = useNavigate();

  const { data: interestData } = useInterestBigQuery();
  const crewData = [
    {
      image: 'https://via.placeholder.com/150',
      id: 49,
      name: '🎶💖우리동네 예체능💖🎶',
      intro: '우리모임은..이것저것 이모저모 등등asdasdasdsad등등asdasdasdsad',
      label: '운동/스포츠',
      city: '노원구',
      member: 300,
    },
  ];

  const repeatedCrewData = Array.from({ length: 1 }, () => ({
    ...crewData[0],
    // id: `${crewData[0].id}-${i}`, // 유니크한 key를 위해 id에 인덱스를 붙입니다.
    id: 56,
  }));

  const handleClickCrew = (crew: CrewData) => {
    navigate(`/crew/${crew.id}/home`, { state: { crewId: crew.id } });
  };

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
        {repeatedCrewData.map((crew) => (
          <div
            key={crew.id}
            className={styles.crew_item}
            onClick={() => handleClickCrew(crew)}
          >
            <div className={styles.crew_image}>
              <img src={crew.image} alt="crew" />
            </div>
            <div className={styles.crew_info}>
              <div className={styles.crew_name}>{crew.name}</div>
              <div className={styles.crew_intro}>{crew.intro}</div>

              <div className={styles.crew_data}>
                <div className={styles.crew_label}>{crew.label}</div>
                <div className={styles.crew_city}>{crew.city}</div>
                <span>·</span>
                <div className={styles.crew_member}>멤버 {crew.member}</div>
              </div>
            </div>
          </div>
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
