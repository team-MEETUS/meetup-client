import { useState } from 'react';

import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';

import MoreMenuButton, {
  MenuItem,
} from '@/components/common/more-button/MoreButton';
import HomeHeader from '@/components/header/HomeHeader';
import useUserStore from '@/stores/user/useUserStore';

import styles from './ProfilePage.module.scss';

interface UserInfo {
  memberId: number;
  nickname: string;
  birth: string;
  geo: {
    city: string;
    district: string;
    county: string;
  };
  intro: string;
  saveImg: string;
}

interface StoredUser {
  state: UserInfo;
}

const ProfilePage = () => {
  const cn = classNames.bind(styles);
  const navigate = useNavigate();

  const [userInfo] = useState<UserInfo | null>(() => {
    const storedUserString = sessionStorage.getItem('USER_STORE');
    if (!storedUserString) return null;

    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const storedUser: StoredUser = JSON.parse(storedUserString);

      return storedUser.state && storedUser.state.memberId !== 0
        ? storedUser.state
        : null;
    } catch (error) {
      return null;
    }
  });
  const { resetUser } = useUserStore((state) => ({
    resetUser: state.resetUser,
  }));

  const menuItems: MenuItem[] = [
    {
      label: '로그아웃',
      onClick: () => {
        const isConfirmed = window.confirm('로그아웃 하시겠습니까 ?');
        if (isConfirmed) {
          sessionStorage.removeItem('ACCESS_TOKEN');
          sessionStorage.removeItem('USER_STORE');
          resetUser();

          window.location.href = '/';
        } else {
          return;
        }
      },
    },
  ];

  const handleLoginClick = () => {
    navigate('/user/login');
  };

  return (
    <div className={cn('container')}>
      <div className={styles.header}>
        <HomeHeader />
        {!userInfo ? null : (
          <div className={cn('menu_button')}>
            <MoreMenuButton items={menuItems} />
          </div>
        )}
      </div>
      {!userInfo ? (
        <>
          <div>로그인이 필요합니다.</div>
          <button className={cn('login_button')} onClick={handleLoginClick}>
            로그인하러가기
          </button>
        </>
      ) : (
        <div className={cn('profile_item')}>
          <div className={cn('profile_image')}>
            <img src={userInfo.saveImg} alt="프로필 이미지" />
          </div>
          <div className={cn('profile_info')}>
            <div className={cn('profile_nickname')}>{userInfo?.nickname}</div>
            <div className={cn('profile_data')}>
              <div className={cn('profile_city')}>
                {userInfo.geo.city} {userInfo.geo.district}{' '}
                {userInfo.geo.county}
              </div>
              <span>·</span>
              <div className={cn('profile_birth')}>{userInfo.birth}</div>
            </div>
            <div className={cn('profile_intro')}>{userInfo.intro}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
