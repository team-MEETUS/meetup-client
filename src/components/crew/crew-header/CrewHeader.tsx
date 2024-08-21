import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useCrewMutation } from '@/apis/react-query/crew/useCrewMutation';
import {
  useCrewLikeQuery,
  useCrewMemberRoleQuery,
} from '@/apis/react-query/crew/useCrewQuery';
import BackArrowIcon from '@/assets/icons/BackArrowIcon.svg?react';
import EmptyHeartIcon from '@/assets/icons/EmptyHeartIcon.svg?react';
import FilledHeartIcon from '@/assets/icons/FilledHeartIcon.svg?react';
import ShareIcon from '@/assets/icons/ShareIcon.svg?react';
import MoreMenuButton from '@/components/common/more-button/MoreButton';
import { CrewMemberRole } from '@/types/crew/crewType';

import styles from './CrewHeader.module.scss';

interface CrewHeaderProps {
  crewId: string;
  title: string;
  onClick?: () => void;
}

interface MenuItem {
  label: string;
  onClick: () => void;
}

const CrewHeader = ({ crewId, title, onClick }: CrewHeaderProps) => {
  const navigate = useNavigate();
  const handleClick = onClick || (() => navigate(-1));

  const { data: isLiked } = useCrewLikeQuery(crewId);
  const { data: crewMemberRole } = useCrewMemberRoleQuery(crewId);
  const { postCrewLike, putUpdateCrewMember } = useCrewMutation();
  const memberId = localStorage.getItem('MEMBER_ID');

  const [isFilled, setIsFilled] = useState<boolean>(false);

  const toggleHeart = async () => {
    await postCrewLike.mutateAsync(crewId);
  };

  const menuItems: MenuItem[] = [
    {
      label: crewMemberRole === CrewMemberRole.LEADER ? '모임 삭제' : '',
      onClick: () => {
        const isConfirmed = window.confirm(
          '정말로 이 모임을 삭제하시겠습니까?',
        );
        if (isConfirmed) {
          toast.info('해당 기능은 준비중입니다.');
        } else {
          return;
        }
      },
    },
    {
      label:
        crewMemberRole === CrewMemberRole.LEADER ||
        crewMemberRole === CrewMemberRole.ADMIN
          ? '모임 수정'
          : '',
      onClick: () => {
        navigate(`/crew/register/update`, {
          state: { isEditing: true, crewId },
        });
      },
    },
    {
      label:
        crewMemberRole && crewMemberRole !== CrewMemberRole.LEADER
          ? '모임 탈퇴'
          : '',
      onClick: async () => {
        if (confirm('정말 모임을 탈퇴하시겠습니까?')) {
          await putUpdateCrewMember.mutateAsync({
            crewId,
            body: {
              memberId: Number(memberId) ?? null,
              newRoleStatus: CrewMemberRole.DEPARTED,
            },
          });
        } else {
          return false;
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
    <header className={styles.crew_header}>
      <div className={styles.header_right}>
        <BackArrowIcon onClick={handleClick} />
        <span className={styles.header_title}>{title}</span>
      </div>
      <div className={styles.header_left}>
        {isFilled ? (
          <FilledHeartIcon onClick={toggleHeart} />
        ) : (
          <EmptyHeartIcon onClick={toggleHeart} />
        )}
        <ShareIcon />
        <MoreMenuButton items={menuItems} />
      </div>
    </header>
  );
};

export default CrewHeader;
