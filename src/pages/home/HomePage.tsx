import styles from './HomePage.module.scss';
import MeetingCard from '@/components/card/MeetingCard';

const HomePage = () => {
  const imageSrc = '/images/github.png';
  const label = 'Sample Label';
  const title = 'Sample Title';
  const description = 'Sample description for the card component.';
  const location = 'Sample Location';
  const attendees = 20;

  return (
    <div className={styles.container}>
      <MeetingCard
        imageSrc={imageSrc}
        label={label}
        title={title}
        description={description}
        location={location}
        attendees={attendees}
      />
      <MeetingCard
        imageSrc={imageSrc}
        label={'sample'}
        title={title}
        description={description}
        location={location}
        attendees={attendees}
      />
    </div>
  );
};

export default HomePage;
