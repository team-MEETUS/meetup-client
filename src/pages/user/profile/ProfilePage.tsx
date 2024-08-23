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
        crewId: 58,
        name: '모두의 마블 모두해',
        intro: '모두의 마블 랭커',
        max: 300,
        originalImg:
          'EWakP_GctO03UctEtUhpEoHCx0W8Jz2QzeXMocnVZh0qfYJB8l-5q7A3T6egufpAX_xHsvtSdEsjD5xDAPpKAw.jpg',
        saveImg:
          'https://meetup-server-bucket.s3.ap-northeast-2.amazonaws.com/4ccd9425-3EWakP_GctO03UctEtUhpEoHCx0W8Jz2QzeXMocnVZh0qfYJB8l-5q7A3T6egufpAX_xHsvtSdEsjD5xDAPpKAw.jpg',
        totalMember: 4,
        totalLike: 0,
        geo: {
          geoId: 11110108,
          city: '서울특별시',
          district: '종로구',
        },
        interestBig: {
          interestBigId: 8,
          name: '게임/오락',
        },
      },
      {
        crewId: 49,
        name: '등산가자',
        intro: '등산을 사랑하는 모임',
        max: 100,
        originalImg: 'default.png',
        saveImg: '/images/default.png',
        totalMember: 1,
        totalLike: 0,
        geo: {
          geoId: 11350106,
          city: '서울특별시',
          district: '노원구',
        },
        interestBig: {
          interestBigId: 1,
          name: '아웃도어/여행',
        },
      },
      {
        crewId: 33,
        name: '스펀지밥',
        intro: '뚱이',
        max: 10,
        originalImg: '695348_663606_3628.jpg',
        saveImg:
          'https://meetup-server-bucket.s3.ap-northeast-2.amazonaws.com/32a5891d-a695348_663606_3628.jpg',
        totalMember: 0,
        totalLike: 0,
        geo: {
          geoId: 11110156,
          city: '서울특별시',
          district: '종로구',
        },
        interestBig: {
          interestBigId: 1,
          name: '아웃도어/여행',
        },
      },
      {
        crewId: 46,
        name: 'ㅇㅇ1',
        intro: '1123123',
        max: 20,
        originalImg: 'after.jpg',
        saveImg:
          'https://meetup-server-bucket.s3.ap-northeast-2.amazonaws.com/f4acd647-cafter.jpg',
        totalMember: 0,
        totalLike: 0,
        geo: {
          geoId: 11440127,
          city: '서울특별시',
          district: '마포구',
        },
        interestBig: {
          interestBigId: 3,
          name: '인문학/책/글',
        },
      },
      {
        crewId: 42,
        name: 'ㅇㅇ1',
        intro: '1123123',
        max: 20,
        originalImg: 'after.jpg',
        saveImg:
          'https://meetup-server-bucket.s3.ap-northeast-2.amazonaws.com/ca303d13-bafter.jpg',
        totalMember: 0,
        totalLike: 0,
        geo: {
          geoId: 11440127,
          city: '서울특별시',
          district: '마포구',
        },
        interestBig: {
          interestBigId: 1,
          name: '아웃도어/여행',
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
          {/* 찜한 모임 하드코딩 */}
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
