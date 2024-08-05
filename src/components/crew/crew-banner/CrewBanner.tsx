import styles from './CrewBanner.module.scss';

interface CrewBannerProps {
  imgSrc: string;
}

const CrewBanner = (props: CrewBannerProps) => {
  return (
    <div className={styles.crew_banner}>
      <img
        className={styles.banner_image}
        src={props.imgSrc}
        alt="미팅 배너 이미지"
      />
    </div>
  );
};

export default CrewBanner;
