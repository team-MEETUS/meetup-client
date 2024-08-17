import styles from './CrewMemberButtonList.module.scss';

interface CrewMemberButtonListProps {
  items: {
    style: string;
    label: string;
    onClick: () => void;
  }[];
}

const CrewMemberButtonList = ({ items }: CrewMemberButtonListProps) => {
  const getButtonClass = (style: string) => {
    switch (style) {
      case 'LEADER':
        return styles.leader;
      case 'ADMIN':
        return styles.admin;
      case 'EXPELLED':
        return styles.expelled;
      case 'DEFAULT':
        return styles.default;
      default:
        return styles.default;
    }
  };

  return (
    <div className={styles.container}>
      {items.map((item, index) =>
        item.label ? (
          <button
            key={index}
            className={`${styles.button} ${getButtonClass(item.style)}`}
            onClick={item.onClick}
          >
            {item.label}
          </button>
        ) : null,
      )}
    </div>
  );
};

export default CrewMemberButtonList;
