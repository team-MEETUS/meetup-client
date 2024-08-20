import classNames from 'classnames/bind';

import useUserStore from '@/stores/user/useUserStore';

import styles from './ProfilePage.module.scss';

const ProfilePage = () => {
  const cn = classNames.bind(styles);

  const { memberId } = useUserStore();

  return (
    <div className={cn('container')}>
      {!memberId ? (
        <div>로그인이 필요합니다.</div>
      ) : (
        <div>
          <h2>프로필 페이지</h2>
          <div>
            <img src="/images/profile-default.jpg" alt="프로필 이미지" />
            <p>닉네임: 지니</p>
            <p>회원 ID: 100</p>
            <span>중계동</span>
            <span>저는 짱이에요</span>
            <span>2001.08.09</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
