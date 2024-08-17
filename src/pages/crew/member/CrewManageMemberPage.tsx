import { useState } from 'react';

import classNames from 'classnames/bind';
import { useLocation } from 'react-router-dom';

import {
  useCrewMemberQuery,
  useCrewMemberRoleQuery,
  useCrewSignUpQuery,
} from '@/apis/react-query/crew/useCrewQuery';
import CrewMemberCard from '@/components/crew/crew-member/CrewMemberCard';
import CommonHeader from '@/components/header/CommonHeader';
import { GetCrewMemberAPIResponseBody } from '@/types/crew/crewAPIType';
import { CrewState } from '@/types/crew/crewType';

import styles from './CrewManageMemberPage.module.scss';

const CrewManageMemberPage = () => {
  const cn = classNames.bind(styles);
  const location = useLocation();

  const state = location.state as CrewState;

  const [crewId] = useState<string>(state.crewId || '');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const { data: crewMemberData } = useCrewMemberQuery(crewId);
  const { data: crewMemberRole } = useCrewMemberRoleQuery(crewId);
  const { data: crewSignUpMemberData } = useCrewSignUpQuery(crewId);

  const filterMembers = (members: GetCrewMemberAPIResponseBody[]) => {
    return members.filter((member) =>
      member.member.nickname.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  };
  return (
    <div className={cn('container')}>
      <div className={styles.header}>
        <CommonHeader title="모임 멤버" />
      </div>

      <div className={cn('inner_container')}>
        {/* 검색창 */}
        <input
          className={cn('search_container')}
          type="text"
          placeholder="회원 이름 검색"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {crewSignUpMemberData && crewSignUpMemberData.length > 0 && (
          <div className={cn('member_list')}>
            <span className={cn('list_title')}>모임 가입신청 멤버</span>
            {filterMembers(crewSignUpMemberData).map((member) => (
              <CrewMemberCard
                key={`sign-up-${member.crewMemberId}`}
                memberData={member.member}
                crewId={crewId}
                state="manage"
                role={member.role}
                myRole={crewMemberRole}
              />
            ))}
          </div>
        )}

        {crewMemberData && crewMemberData.length > 0 && (
          <div className={cn('member_list')}>
            <span className={cn('list_title')}>모임 멤버</span>
            {filterMembers(crewMemberData).map((member) => (
              <CrewMemberCard
                key={`member-${member.crewMemberId}`}
                memberData={member.member}
                crewId={crewId}
                state="manage"
                role={member.role}
                myRole={crewMemberRole}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CrewManageMemberPage;
