import classNames from 'classnames/bind';

import { useCrewMutation } from '@/apis/react-query/crew/useCrewMutation';
import AdminIcon from '@/assets/icons/AdminIcon.svg?react';
import LeaderIcon from '@/assets/icons/LeaderIcon.svg?react';
import CrewMemberButtonList from '@/components/crew/crew-member/CrewMemberButtonList';
import { CrewMemberRole } from '@/types/crew/crewType';

import style from './CrewMemberCard.module.scss';

interface CrewMemberCardProps {
  crewId: string;
  myRole?: CrewMemberRole;

  memberData: {
    memberId: number;
    nickname: string;
    intro: string;
    saveImg: string;
  };

  state?: 'list' | 'manage';
  role: CrewMemberRole;
}

const CrewMemberCard = ({
  crewId,
  myRole,
  memberData,
  state,
  role,
}: CrewMemberCardProps) => {
  const cn = classNames.bind(style);
  const { putUpdateCrewMember } = useCrewMutation();

  // 역할에 따른 메뉴 아이템 설정
  const getMenuItems = () => {
    switch (myRole) {
      // 모임장의 경우
      case CrewMemberRole.LEADER:
        return [
          {
            style: 'LEADER',
            label:
              role !== CrewMemberRole.LEADER && role !== CrewMemberRole.PENDING
                ? '모임장 양도'
                : '',
            onClick: async () =>
              await putUpdateCrewMember.mutateAsync({
                crewId,
                body: {
                  memberId: memberData.memberId,
                  newRoleStatus: CrewMemberRole.MEMBER,
                },
              }),
          },
          {
            style: 'ADMIN',
            label:
              role === CrewMemberRole.LEADER || role === CrewMemberRole.PENDING
                ? ''
                : role === CrewMemberRole.ADMIN
                  ? '운영진 해제'
                  : '운영진 임명',
            onClick: async () =>
              await putUpdateCrewMember.mutateAsync({
                crewId,
                body: {
                  memberId: memberData.memberId,
                  newRoleStatus:
                    role === CrewMemberRole.ADMIN
                      ? CrewMemberRole.MEMBER
                      : CrewMemberRole.ADMIN,
                },
              }),
          },
          {
            style: 'EXPELLED',
            label:
              role === CrewMemberRole.LEADER ||
              role === CrewMemberRole.ADMIN ||
              role === CrewMemberRole.PENDING
                ? ''
                : '강퇴',
            onClick: async () =>
              await putUpdateCrewMember.mutateAsync({
                crewId,
                body: {
                  memberId: memberData.memberId,
                  newRoleStatus: CrewMemberRole.EXPELLED,
                },
              }),
          },
          {
            style: 'DEFAULT',
            label: role === CrewMemberRole.PENDING ? '가입 승인' : '',
            onClick: async () =>
              await putUpdateCrewMember.mutateAsync({
                crewId,
                body: {
                  memberId: memberData.memberId,
                  newRoleStatus: CrewMemberRole.MEMBER,
                },
              }),
          },
          {
            style: 'DEFAULT',
            label: role === CrewMemberRole.PENDING ? '가입 거절' : '',
            onClick: async () =>
              await putUpdateCrewMember.mutateAsync({
                crewId,
                body: {
                  memberId: memberData.memberId,
                  newRoleStatus: CrewMemberRole.EXPELLED,
                },
              }),
          },
        ];
      // 운영진의 경우
      case CrewMemberRole.ADMIN:
        return [
          {
            style: 'ADMIN',
            label:
              role === CrewMemberRole.ADMIN ? '운영진 해제' : '운영진 임명',
            onClick: async () =>
              await putUpdateCrewMember.mutateAsync({
                crewId,
                body: {
                  memberId: memberData.memberId,
                  newRoleStatus:
                    role === CrewMemberRole.ADMIN
                      ? CrewMemberRole.MEMBER
                      : CrewMemberRole.ADMIN,
                },
              }),
          },
          {
            style: 'EXPELLED',
            label:
              role === CrewMemberRole.LEADER ||
              role === CrewMemberRole.ADMIN ||
              role === CrewMemberRole.PENDING
                ? ''
                : '강퇴',
            onClick: async () =>
              await putUpdateCrewMember.mutateAsync({
                crewId,
                body: {
                  memberId: memberData.memberId,
                  newRoleStatus: CrewMemberRole.EXPELLED,
                },
              }),
          },
          {
            style: 'DEFAULT',
            label: role === CrewMemberRole.PENDING ? '가입 승인' : '',
            onClick: async () =>
              await putUpdateCrewMember.mutateAsync({
                crewId,
                body: {
                  memberId: memberData.memberId,
                  newRoleStatus: CrewMemberRole.MEMBER,
                },
              }),
          },
          {
            style: 'DEFAULT',
            label: role === CrewMemberRole.PENDING ? '가입 거절' : '',
            onClick: async () =>
              await putUpdateCrewMember.mutateAsync({
                crewId,
                body: {
                  memberId: memberData.memberId,
                  newRoleStatus: CrewMemberRole.EXPELLED,
                },
              }),
          },
        ];
    }
  };

  const menuItems = getMenuItems();

  const getRoleLabel = () => {
    switch (role) {
      case CrewMemberRole.LEADER:
        return <LeaderIcon className={cn('leader_icon')} />;
      case CrewMemberRole.ADMIN:
        return <AdminIcon className={cn('admin_icon')} />;
      default:
        return null;
    }
  };

  return (
    <div className={cn('container')} id={String(memberData.memberId)}>
      <div className={cn('member_container')}>
        {memberData.saveImg ? (
          <span className={cn('image_container')}>
            <img
              className={cn('profile_image')}
              src={memberData.saveImg}
              alt="profile"
            />
            {role && getRoleLabel()}
          </span>
        ) : (
          <span className={cn('image_container')}>
            <img
              className={cn('profile_image')}
              src="/images/profile-default.jpg"
              alt="profile"
            />
            {role && getRoleLabel()}
          </span>
        )}

        <div className={cn('introduction')}>
          <span className={cn('nickname')}>{memberData.nickname}</span>
          <span className={cn('intro')}>{memberData.intro}</span>
        </div>
      </div>
      <div className={cn('button_list')}>
        {state === 'manage' && menuItems && menuItems.length > 0 && (
          <CrewMemberButtonList items={menuItems} />
        )}
      </div>
    </div>
  );
};

export default CrewMemberCard;
