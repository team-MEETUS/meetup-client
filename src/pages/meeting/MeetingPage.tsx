import MeetingBanner from '@/components/meeting/meeting-banner/MeetingBanner';
import MeetingHeader from '@/components/meeting/meeting-header/MeetingHeader';
import MeetingLabel from '@/components/meeting/meeting-label/MeetingLabel';
import MeetingNavigation from '@/components/meeting/meeting-navigation/MeetingNavigation';
import MeetingTitle from '@/components/meeting/meeting-title/MeetingTitle';

import styles from './MeetingPage.module.scss';

const MeetingPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <MeetingHeader title="MEETUP - 지역기반 모임 플랫폼" />
        <MeetingNavigation />
      </div>

      <MeetingBanner imgSrc="/images/crew-banner.png" />
      <div className={styles.content}>
        <div className={styles.label_container}>
          <MeetingLabel text="종로구" />
          <MeetingLabel text="운동/스포츠" />
          <MeetingLabel text="멤버 294" />
        </div>
        <MeetingTitle title="MEETUP - 지역기반 모임 플랫폼" />
        🌸 봄 여름 가을 겨울!! MEETUP 팀원들과 함께 달려요! 🌸
        <br />
        <br />
        🔷 프로젝트 기반으로 성장하실분 ! <br />
        🔷 백엔드/프론트엔드와 협업하여 성장하실분 !<br />
        🔷 개발경험이 적지만 열심히 달리실 분 모두 환영합니다~! <br />
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fuga labore
        debitis molestiae quibusdam tempore recusandae sunt soluta adipisci.
        Accusamus nemo reprehenderit asperiores distinctio id alias dolorem
        possimus temporibus ducimus atque. Lorem ipsum dolor sit amet
        <br />
        consectetur, adipisicing elit. Fuga labore debitis molestiae quibusdam
        tempore recusandae sunt soluta adipisci. Accusamus nemo reprehenderit
        asperiores distinctio id alias dolorem possimus temporibus ducimus
        atque.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fuga
        labore debitis molestiae quibusdam tempore recusandae sunt soluta
        <br />
        adipisci. Accusamus nemo reprehenderit asperiores distinctio id alias
        dolorem possimus temporibus ducimus atque.
        <br />
        consectetur, adipisicing elit. Fuga labore debitis molestiae quibusdam
        tempore recusandae sunt soluta adipisci. Accusamus nemo reprehenderit
        asperiores distinctio id alias dolorem possimus temporibus ducimus
        atque.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fuga
        labore debitis molestiae quibusdam tempore recusandae sunt soluta
        <br /> <br />
        consectetur, adipisicing elit. Fuga labore debitis molestiae quibusdam
        tempore recusandae sunt soluta adipisci. Accusamus nemo reprehenderit
        asperiores distinctio id alias dolorem possimus temporibus ducimus
        atque.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fuga
        labore debitis molestiae quibusdam tempore recusandae sunt soluta
        <br /> <br />
        consectetur, adipisicing elit. Fuga labore debitis molestiae quibusdam
        tempore recusandae sunt soluta adipisci. Accusamus nemo reprehenderit
        asperiores distinctio id alias dolorem possimus temporibus ducimus
        atque.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fuga
        labore debitis molestiae quibusdam tempore recusandae sunt soluta
        <br />
      </div>
    </div>
  );
};

export default MeetingPage;
