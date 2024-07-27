import styles from './MeetingBanner.module.scss';

interface MeetingBannerProps {
  imgSrc: string;
}

const MeetingBanner = (props: MeetingBannerProps) => {
  return (
    <div className={styles.meeting_banner}>
      <img
        className={styles.banner_image}
        src={props.imgSrc}
        alt="미팅 배너 이미지"
      />
    </div>
  );
};

export default MeetingBanner;
