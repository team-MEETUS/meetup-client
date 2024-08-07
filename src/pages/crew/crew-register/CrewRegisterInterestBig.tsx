import { useNavigate } from 'react-router-dom';

import { useInterestBigQuery } from '@/apis/react-query/interest/useInterestQuery';
import { GetInterestBigAPI } from '@/apis/server/interest/InterestAPI';
import CommonHeader from '@/components/header/CommonHeader';
import useCrewRegisterStore from '@/stores/crew/useCrewRegisterStore';

import styles from './CrewRegisterInterestBig.module.scss';

const CrewRegisterInterest = () => {
  const navigate = useNavigate();
  const { updateInterestBig, updateInterestSmall } = useCrewRegisterStore(
    (state) => ({
      updateInterestBig: state.updateInterestBig,
      updateInterestSmall: state.updateInterestSmall,
    }),
  );

  const { data: interestData, isLoading, error } = useInterestBigQuery();

  const handleInterestClick = (interest: GetInterestBigAPI) => {
    updateInterestBig(interest);
    updateInterestSmall({ interestSmallId: 0, name: '' });
    navigate('/crew/register/register');
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading interests</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <CommonHeader title="관심사 선택" />
      </div>

      <div className={styles.interest_list}>
        {interestData?.map((interest) => (
          <div
            key={interest.interestBigId}
            className={styles.interest_item}
            onClick={() => handleInterestClick(interest)}
          >
            <span className={styles.interest_icon}>{interest.icon}</span>
            <span className={styles.interest_name}>{interest.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CrewRegisterInterest;
