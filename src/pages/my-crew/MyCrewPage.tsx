import classNames from 'classnames/bind';

import { useMyCrewListQuery } from '@/apis/react-query/crew/useHomeQuery';
import CrewCard from '@/components/common/crew-card/CrewCard';
import HomeHeader from '@/components/header/HomeHeader';

import styles from './MyCrewPage.module.scss';

const MyCrewPage = () => {
  const cn = classNames.bind(styles);
  const { data: myCrewList } = useMyCrewListQuery();

  return (
    <div className={cn('container')}>
      <div className={cn('header')}>
        <HomeHeader />
      </div>

      {/* 내 모임 */}
      <div className={cn('crew_list')}>
        <h2 className={cn('crew_title')}>가입한 모임</h2>
        {myCrewList &&
          myCrewList.map((crew) => (
            <div key={crew.crewId}>
              <CrewCard crew={crew} />
              <hr className={cn('crew_hr')} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default MyCrewPage;
