import styles from './MeetingTitle.module.scss';

interface MeetingTitleProps {
  title: string;
}

const MeetingTitle = (props: MeetingTitleProps) => {
  return <span className={styles.title}>{props.title}</span>;
};

export default MeetingTitle;
