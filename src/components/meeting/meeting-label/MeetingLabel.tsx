import styles from './MeetingLabel.module.scss';

interface MeetingLabelProps {
  text: string;
}

const MeetingLabel = (props: MeetingLabelProps) => {
  return <span className={styles.label}>{props.text}</span>;
};

export default MeetingLabel;
