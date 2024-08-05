import styles from './CrewLabel.module.scss';

interface CrewLabelProps {
  text: string;
}

const CrewLabel = (props: CrewLabelProps) => {
  return <span className={styles.label}>{props.text}</span>;
};

export default CrewLabel;
