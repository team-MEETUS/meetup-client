import { useState } from 'react';

import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';

import CrewCard from '@/components/common/crew-card/CrewCard';
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

  const newCrewColumns = [
    [
      {
        crewId: 34,
        name: '✈️투.게.더 Together',
        intro: '✈️투.게.더 Together 신입모집중 ❤️',
        max: 50,
        originalImg: 'KakaoTalk_20240823_030814194.jpg',
        saveImg:
          'https://meetup-server-bucket.s3.ap-northeast-2.amazonaws.com/88eeb095-dKakaoTalk_20240823_030814194.jpg',
        totalMember: 2,
        totalLike: 0,
        geo: {
          geoId: 11590101,
          city: '서울특별시',
          district: '동작구',
        },
        interestBig: {
          interestBigId: 1,
          name: '아웃도어/여행',
        },
      },
      {
        crewId: 30,
        name: '💣 TEAM 핵폭탄 💣',
        intro: '내맘대로 백패킹 🎒',
        max: 50,
        originalImg: 'KakaoTalk_20240823_023557552.jpg',
        saveImg:
          'https://meetup-server-bucket.s3.ap-northeast-2.amazonaws.com/babde1c5-aKakaoTalk_20240823_023557552.jpg',
        totalMember: 1,
        totalLike: 0,
        geo: {
          geoId: 11110102,
          city: '서울특별시',
          district: '종로구',
        },
        interestBig: {
          interestBigId: 1,
          name: '아웃도어/여행',
        },
      },
      {
        crewId: 26,
        name: '(미라클모닝)굿모닝 유스 💙',
        intro: '자기계발에 미치고픈 2030 오전 스터디',
        max: 10,
        originalImg: 'KakaoTalk_20240822_154952624_04.jpg',
        saveImg:
          'https://meetup-server-bucket.s3.ap-northeast-2.amazonaws.com/ec677312-fKakaoTalk_20240822_154952624_04.jpg',
        totalMember: 1,
        totalLike: 0,
        geo: {
          geoId: 11350106,
          city: '서울특별시',
          district: '노원구',
        },
        interestBig: {
          interestBigId: 10,
          name: '자기계발',
        },
      },
      {
        crewId: 22,
        name: '[토링] 한중 언어교류 보드게임🎲',
        intro: '안녕하세요😁',
        max: 50,
        originalImg: 'KakaoTalk_20240822_154739693_10.jpg',
        saveImg:
          'https://meetup-server-bucket.s3.ap-northeast-2.amazonaws.com/02857d0c-fKakaoTalk_20240822_154739693_10.jpg',
        totalMember: 1,
        totalLike: 0,
        geo: {
          geoId: 11680108,
          city: '서울특별시',
          district: '강남구',
        },
        interestBig: {
          interestBigId: 5,
          name: '외국/언어',
        },
      },
      {
        crewId: 18,
        name: '🔥 Kali 영어 모임 오픈!',
        intro: '🌏 "Express yourself, Be involved!"',
        max: 50,
        originalImg: 'KakaoTalk_20240822_154739693_16.jpg',
        saveImg:
          'https://meetup-server-bucket.s3.ap-northeast-2.amazonaws.com/fae5731c-2KakaoTalk_20240822_154739693_16.jpg',
        totalMember: 2,
        totalLike: 0,
        geo: {
          geoId: 11440120,
          city: '서울특별시',
          district: '마포구',
        },
        interestBig: {
          interestBigId: 5,
          name: '외국/언어',
        },
      },
    ],
  ];

  const formatDate = (dateString: string) => {
    const year = dateString.substring(0, 4);
    const month = dateString.substring(5, 7);
    const day = dateString.substring(8, 10);

    return `${year}. ${parseInt(month, 10)}. ${parseInt(day, 10)}`;
  };

  return (
    <div className={cn('container')}>
      <div className={styles.header}>
        <HomeHeader type="profile" />
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
        <div className={cn('container_body')}>
          <div className={cn('profile_item')}>
            <div className={cn('profile_image')}>
              <img src={userInfo.saveImg} alt="프로필 이미지" />
            </div>
            <div className={cn('profile_info')}>
              <div className={cn('profile_nickname')}>{userInfo?.nickname}</div>
              <div className={cn('profile_data')}>
                <div className={cn('profile_city')}>
                  {userInfo.geo.city} {userInfo.geo.district}{' '}
                </div>
                <span>·</span>
                <div className={cn('profile_birth')}>
                  {formatDate(userInfo.birth)}
                </div>
              </div>
              <div className={cn('profile_intro')}>{userInfo.intro}</div>
            </div>
          </div>
          {/* 찜한 모임 하드 */}
          <div className={styles.crew_list}>
            <h2 className={styles.crew_title}>찜한 모임</h2>
            <div className={styles.crew_section}>
              {newCrewColumns.map((column, columnIndex) => (
                <div key={columnIndex} className={styles.crew_column}>
                  {column.map((crew) => (
                    <div key={crew.crewId} className={styles.crew_item}>
                      <CrewCard crew={crew} />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          {/* // */}
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
