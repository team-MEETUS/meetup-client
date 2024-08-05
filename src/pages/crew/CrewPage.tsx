import CrewBanner from '@/components/crew/crew-banner/CrewBanner';
import CrewHeader from '@/components/crew/crew-header/CrewHeader';
import CrewLabel from '@/components/crew/crew-label/CrewLabel';
import CrewNavigation from '@/components/crew/crew-navigation/CrewNavigation';
import CrewTitle from '@/components/crew/crew-title/CrewTitle';

import styles from './CrewPage.module.scss';

const CrewPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <CrewHeader title="MEETUP - 지역기반 모임 플랫폼" />
        <CrewNavigation />
      </div>

      <CrewBanner imgSrc="/images/crew-banner.png" />
      <div className={styles.content}>
        <div className={styles.label_container}>
          <CrewLabel text="종로구" />
          <CrewLabel text="운동/스포츠" />
          <CrewLabel text="멤버 294" />
        </div>
        <CrewTitle title="MEETUP - 지역기반 모임 플랫폼" />
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

export default CrewPage;
