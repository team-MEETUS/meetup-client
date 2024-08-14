import { useState } from 'react';

import classNames from 'classnames/bind';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

import { useCrewBoardListQuery } from '@/apis/react-query/crew/useCrewBoardQuery';
import { useCrewDetailQuery } from '@/apis/react-query/crew/useCrewQuery';
import CrewAddIcon from '@/assets/icons/CrewAddIcon.svg?react';
import CrewBoardCard from '@/components/crew/crew-board/CrewBoardCard';
import CrewHeader from '@/components/crew/crew-header/CrewHeader';
import CrewNavigation from '@/components/crew/crew-navigation/CrewNavigation';

import styles from './CrewBoardPage.module.scss';

interface BoardState {
  crewId: string;
}

const CrewBoardPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const cn = classNames.bind(styles);

  const state = location.state as BoardState;

  const [crewId] = useState<string>(state.crewId || '');

  const { data: crewBoardData } = useCrewBoardListQuery(crewId);

  const { data: crewDetailData } = useCrewDetailQuery(crewId);

  const handleClickBoard = (boardId: string) => {
    navigate(`/crew/${crewId}/board/${boardId}`, {
      state: { crewId: crewId, boardId: boardId },
    });
  };

  return (
    <div className={styles.container}>
      {crewDetailData && (
        <div className={cn('crew_detail')}>
          <div className={cn('header')}>
            <CrewHeader
              title={crewDetailData.name}
              onClick={() => navigate('/')}
            />
            <CrewNavigation id={crewId} />
          </div>
        </div>
      )}

      {crewBoardData &&
        crewBoardData.map((board) => (
          <CrewBoardCard
            key={board.boardId}
            {...board}
            onClick={() => handleClickBoard(String(board.boardId))}
          />
        ))}
      <NavLink
        className={styles.button_container}
        to={`/crew/${crewId}/board/register`}
        state={{ crewId: crewId }}
      >
        <CrewAddIcon />
      </NavLink>
    </div>
  );
};

export default CrewBoardPage;
