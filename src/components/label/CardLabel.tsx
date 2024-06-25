import styles from './CardLabel.module.scss';

const CardLabel = ({ label }: { label: string }) => {
  return <span className={styles.label}>{label}</span>;
};

export default CardLabel;
