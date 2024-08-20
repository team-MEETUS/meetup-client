import classNames from 'classnames/bind';

import HomeHeader from '@/components/header/HomeHeader';
import useUserStore from '@/stores/user/useUserStore';

import styles from './ProfilePage.module.scss';

const ProfilePage = () => {
  const cn = classNames.bind(styles);

  const { memberId } = useUserStore();

  return (
    <div className={cn('container')}>
      <div className={styles.header}>
        <HomeHeader />
      </div>
      {memberId ? (
        <div>로그인이 필요합니다.</div>
      ) : (
        <div className={cn('profile_item')}>
          <div className={cn('profile_image')}>
            <img src="/images/profile-default.jpg" alt="프로필 이미지" />
          </div>
          <div className={cn('profile_info')}>
            <div className={cn('profile_nickname')}>피카츄</div>
            <div className={cn('profile_data')}>
              <div className={cn('profile_city')}>서울특별시</div>
              <span>·</span>
              <div className={cn('profile_birth')}>2001.08.09</div>
            </div>
            <div className={cn('profile_intro')}>
              피카츄님의 프로필 설명입니다. 귀여운 것이 특징!
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
