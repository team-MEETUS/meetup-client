import { useEffect, useState } from 'react';

import { Link, useLocation, useNavigate } from 'react-router-dom';

import {
  useActiveCrewListQuery,
  useNewCrewListQuery,
} from '@/apis/react-query/crew/useHomeQuery';
import { useInterestBigQuery } from '@/apis/react-query/interest/useInterestQuery';
import { useUserInfoQuery } from '@/apis/react-query/user/useUserQuery';
import CrewAddIcon from '@/assets/icons/CrewAddIcon.svg?react';
import CrewCard from '@/components/common/crew-card/CrewCard';
import HomeHeader from '@/components/header/HomeHeader';
import useUserStore from '@/stores/user/useUserStore';
import { CrewSelectRespDto } from '@/types/home/homeAPIType';

import styles from './HomePage.module.scss';

const HomePage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const state = (location.state as { isLogin?: boolean }) || {};
  const isLogin = state.isLogin ? true : false;

  const [success] = useState(isLogin);

  const { data: interestData } = useInterestBigQuery();
  const { data: newCrewListData } = useNewCrewListQuery();
  const { data: activeCrewListData } = useActiveCrewListQuery();
  const { data: userInfo, isSuccess: userInfoSuccess } =
    useUserInfoQuery(success);

  const { updateUser } = useUserStore((state) => ({
    updateUser: state.updateUser,
    resetUser: state.resetUser,
  }));

  const getColumns = (data: CrewSelectRespDto[]): CrewSelectRespDto[][] => {
    const columns: CrewSelectRespDto[][] = [[], [], [], []];
    data.forEach((item, index) => {
      columns[index % 4].push(item);
    });
    return columns;
  };

  const newCrewColumns = newCrewListData ? getColumns(newCrewListData) : [];
  const activeCrewColumns = activeCrewListData
    ? getColumns(activeCrewListData)
    : [];

  useEffect(() => {
    if (isLogin && userInfoSuccess && userInfo) {
      updateUser(userInfo);
    }
  }, [isLogin, userInfoSuccess, userInfo, updateUser]);

  const handleInterestClick = (interestId: number, name: string) => {
    navigate(`/crew/interestBigId?interestId=${interestId}&name=${name}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <HomeHeader />
      </div>

      {/* 관심사 */}
      <div className={styles.interest_list}>
        {interestData?.map((interest) => (
          <div
            key={interest.interestBigId}
            className={styles.interest_item}
            onClick={() =>
              handleInterestClick(interest.interestBigId!, interest.name)
            }
          >
            <span className={styles.interest_icon}>{interest.icon}</span>
            <span className={styles.interest_name}>{interest.name}</span>
          </div>
        ))}
      </div>

      {/* 새로 생긴 모임 */}
      <div className={styles.crew_list}>
        <h2 className={styles.crew_title}>새로 생긴 모임</h2>
        <div className={styles.crew_section}>
          {newCrewColumns.map((column, columnIndex) => (
            <div key={columnIndex} className={styles.crew_column}>
              {column.map((crew) => (
                <div key={crew.crewId} className={styles.crew_item}>
                  <CrewCard crew={crew} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* 활동이 활발한 모임 */}
      <div className={styles.crew_list}>
        <h2 className={styles.crew_title}>활동이 활발한 모임</h2>
        <div className={styles.crew_section}>
          {activeCrewColumns.map((column, columnIndex) => (
            <div key={columnIndex} className={styles.crew_column}>
              {column.map((crew) => (
                <div key={crew.crewId} className={styles.crew_item}>
                  <CrewCard type="active" crew={crew} />
                </div>
              ))}
            </div>
          ))}
        </div>
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
