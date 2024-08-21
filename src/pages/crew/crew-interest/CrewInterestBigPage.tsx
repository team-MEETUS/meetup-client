import classNames from 'classnames/bind';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import { useCrewListQuery } from '@/apis/react-query/crew/useCrewQuery';
import CrewAddIcon from '@/assets/icons/CrewAddIcon.svg?react';
import CrewCard from '@/components/common/crew-card/CrewCard';
import CommonHeader from '@/components/header/CommonHeader';

import styles from './CrewInterestBigPage.module.scss';

const HomePage = () => {
  const cn = classNames.bind(styles);
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const interestId = queryParams.get('interestId');
  const name = queryParams.get('name');

  const { data: interestData } = useCrewListQuery({
    interestBigId: Number(interestId),
    page: 1,
  });

  const handleClickBack = () => {
    navigate(-1);
  };

  return (
    <div className={cn('container')}>
      <div className={cn('header')}>
        <CommonHeader title={name} onBackClick={handleClickBack} />
      </div>

      {/* 관심사 별 모임 */}
      <div className={cn('crew_list')}>
        {interestData &&
          interestData.map((crew) => (
            <div key={crew.crewId}>
              <CrewCard crew={crew} />
            </div>
          ))}
      </div>

      {/* 모임 등록 버튼 */}
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
