import { useMyCrewListQuery } from '@/apis/react-query/crew/useHomeQuery';
import CrewCard from '@/components/common/crew-card/CrewCard';
import HomeHeader from '@/components/header/HomeHeader';

const MyCrewPage = () => {
  const { data: myCrewList } = useMyCrewListQuery();

  return (
    <div>
      <HomeHeader />
      {myCrewList &&
        myCrewList.map((crew) => (
          <div key={crew.crewId}>
            <CrewCard crew={crew} />
          </div>
        ))}
    </div>
  );
};

export default MyCrewPage;
