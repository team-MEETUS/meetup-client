import styles from './CrewTitle.module.scss';

interface CrewTitleProps {
  title: string;
}

const CrewTitle = (props: CrewTitleProps) => {
  return <span className={styles.title}>{props.title}</span>;
};

export default CrewTitle;
