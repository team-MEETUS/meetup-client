import CardLabel from '@/components/label/CardLabel';
import styles from './MeetingCard.module.scss';

interface MeetingCardProps {
  imageSrc: string;
  label: string;
  title: string;
  description: string;
  location: string;
  attendees: number;
}

const MeetingCard = ({
  imageSrc,
  label,
  title,
  description,
  location,
  attendees,
}: MeetingCardProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.image_wrapper}>
        <img src={imageSrc} alt={title} className={styles.image} />
      </div>
      <div className={styles.content}>
        <CardLabel label={label} />
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
        <div className={styles.details}>
          <span className={styles.location}>{location}</span>
          <span className={styles.attendees}>
            멤버 {attendees} {attendees !== 0 ? '명' : ''}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MeetingCard;
