import { useNavigate } from 'react-router-dom';

import { useInterestSmallQuery } from '@/apis/react-query/interest/useInterestQuery';
import { GetInterestSmallAPI } from '@/apis/server/interest/InterestAPI';
import CommonHeader from '@/components/header/CommonHeader';
import useCrewRegisterStore from '@/stores/crew/useCrewRegisterStore';

import styles from './CrewRegisterInterestSmall.module.scss';

const CrewRegisterInterestSmall = () => {
  const navigate = useNavigate();

  const { interestBig, updateInterestSmall } = useCrewRegisterStore(
    (state) => ({
      interestBig: state.interestBig,
      updateInterestSmall: state.updateInterestSmall,
    }),
  );

  const {
    data: interestData,
    isLoading,
    error,
  } = useInterestSmallQuery(interestBig.interestBigId || 0);

  const handleInterestSmallClick = (interest: GetInterestSmallAPI) => {
    updateInterestSmall(interest);
    navigate('/crew/register/register');
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading interests</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <CommonHeader title="상세관심사 선택" />
      </div>

      <div className={styles.interest_list}>
        {interestData?.map((interest) => (
          <div
            key={interest.interestSmallId}
            className={styles.interest_item}
            onClick={() => handleInterestSmallClick(interest)}
          >
            <span className={styles.interest_name}>{interest.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CrewRegisterInterestSmall;
