import { useState, useRef, useEffect } from 'react';

import classNames from 'classnames/bind';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useCrewAlbumMutation } from '@/apis/react-query/crew/useCrewAlbumMutation';
import {
  useCrewAlbumLikeQuery,
  useCrewAlbumListQuery,
} from '@/apis/react-query/crew/useCrewAlbumQuery';
import CrewAddIcon from '@/assets/icons/CrewAddIcon.svg?react';
import EmptyHeartIcon from '@/assets/icons/EmptyHeartIcon.svg?react';
import FilledHeartIcon from '@/assets/icons/FilledHeartIcon.svg?react';
import MoreMenuButton, {
  MenuItem,
} from '@/components/common/more-button/MoreButton';
import CrewHeader from '@/components/crew/crew-header/CrewHeader';
import CrewNavigation from '@/components/crew/crew-navigation/CrewNavigation';
import { DateType, formatDate } from '@/utils/date';

import styles from './CrewAlbumListPage.module.scss';

interface AlbumState {
  crewId: string;
}

const CrewAlbumListPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as AlbumState;
  const crewId = state.crewId;

  const cn = classNames.bind(styles);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentAlbumId, setCurrentAlbumId] = useState<string>('');
  const [isGalleryOpen, setIsGalleryOpen] = useState<boolean>(false);
  const [isFilled, setIsFilled] = useState<boolean>(false);

  const { data: crewAlbumList } = useCrewAlbumListQuery(crewId);
  const { postCreateAlbum, postAlbumLike, deleteAlbum } =
    useCrewAlbumMutation();
  const { data: isLiked } = useCrewAlbumLikeQuery(crewId, currentAlbumId);

  useEffect(() => {
    if (isLiked !== undefined) {
      setIsFilled(isLiked);
    }
  }, [isLiked]);

  const handleAddIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const formData = new FormData();

    if (files) {
      Array.from(files).forEach((file) => {
        formData.append('images', file);
      });
    }

    postCreateAlbum.mutate({ crewId, body: formData });
  };

  const handleLikeClick = async (albumId: string) => {
    await postAlbumLike.mutateAsync({ crewId, albumId });
    setIsFilled((prev) => !prev);
  };

  const handleOpenGallery = (index: number) => {
    setCurrentIndex(index);
    if (crewAlbumList) {
      setCurrentAlbumId(String(crewAlbumList[index].albumId) || '');
    }
    setIsGalleryOpen(true);
  };

  const handleCloseGallery = () => {
    setIsGalleryOpen(false);
  };

  const menuItems: MenuItem[] = [
    {
      label: '사진 삭제',
      onClick: async () => {
        const isConfirmed = window.confirm(
          '정말로 이 사진을 삭제하시겠습니까?',
        );
        if (isConfirmed) {
          await deleteAlbum.mutateAsync({ crewId, albumId: currentAlbumId });
          handleCloseGallery();
        } else {
          return;
        }
      },
    },
    {
      label: '공유하기',
      onClick: () => toast.info('해당 기능은 준비중입니다.'),
    },
  ];

  useEffect(() => {
    if (isLiked !== undefined) {
      setIsFilled(isLiked);
    }
  }, [isLiked]);

  return (
    <div className={cn('container')}>
      <div className={cn('header')}>
        <CrewHeader
          title="사진첩"
          crewId={crewId}
          onClick={() => navigate('/')}
        />
        <CrewNavigation id={crewId} />
      </div>

      <span className={cn('button_container')} onClick={handleAddIconClick}>
        <CrewAddIcon />
      </span>

      <input
        type="file"
        ref={fileInputRef}
        multiple
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleImageUpload}
      />

      <div className={cn('image_grid')}>
        {crewAlbumList &&
          crewAlbumList.map((item, index) => (
            <div key={item.albumId} className={cn('image_container')}>
              <img
                src={item.saveImg}
                alt={item.originalImg}
                onClick={() => handleOpenGallery(index)}
              />
            </div>
          ))}
      </div>

      {isGalleryOpen && (
        <div className={cn('scroll_container')}>
          <button className={cn('close_button')} onClick={handleCloseGallery}>
            닫기
          </button>

          <div className={cn('inner_container')}>
            <div className={cn('image_container')}>
              <img
                className={cn('scroll_image')}
                src={crewAlbumList?.[currentIndex].saveImg}
                alt={`Slide ${currentIndex}`}
              />
            </div>
          </div>

          {crewAlbumList && (
            <>
              <div className={cn('menu_button')}>
                <MoreMenuButton items={menuItems} fillColor="var(--white)" />
              </div>
              <div className={cn('profile')}>
                <img
                  className={cn('profile_image')}
                  src={crewAlbumList[currentIndex].crewMember.member.saveImg}
                  alt="profile"
                />
                <div className={cn('profile_info')}>
                  <span className={cn('name')}>
                    {crewAlbumList[currentIndex].crewMember.member.nickname}
                  </span>
                  <span className={cn('date')}>
                    {formatDate(
                      DateType.DATE_TIME,
                      crewAlbumList[currentIndex].createDate,
                    )}
                  </span>
                </div>
              </div>
              <div className={cn('like_button')}>
                {isFilled ? (
                  <FilledHeartIcon
                    onClick={() =>
                      handleLikeClick(
                        String(crewAlbumList[currentIndex].albumId),
                      )
                    }
                  />
                ) : (
                  <EmptyHeartIcon
                    onClick={() =>
                      handleLikeClick(
                        String(crewAlbumList[currentIndex].albumId),
                      )
                    }
                    fill="white"
                  />
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default CrewAlbumListPage;
